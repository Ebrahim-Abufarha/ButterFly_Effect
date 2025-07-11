import React, { useState, useEffect } from 'react';
import { Users, School, MessageCircle, FileText, TrendingUp, Clock, User, Building, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const DashboardInstitution = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCounselees: 0,
    totalSessions: 0,
    totalRecommendations: 0,
    totalInstitutions: 0,
    usersByRole: {},
    recentUsers: [],
    recentSessions: [],
    recentRecommendations: []
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Base API URL - change to your API URL
  const API_BASE_URL = 'http://localhost:8000/api';

  // API fetch helper with error handling
  const fetchAPI = async (endpoint) => {
    try {
      const token = localStorage.getItem('auth_token'); // Or your token storage method
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  };

  // Fetch dashboard data from APIs
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Parallel API calls
        const [usersData, counseleesData, sessionsData, recommendationsData, institutionsData] = await Promise.all([
          fetchAPI('/users'),
          fetchAPI('/counselee'),
          fetchAPI('/sessions'),
          fetchAPI('/recommendations'),
          fetchAPI('/institutions')
        ]);

        // Count users by role
        const usersByRole = usersData.reduce((acc, user) => {
          acc[user.role] = (acc[user.role] || 0) + 1;
          return acc;
        }, {});

        // Get recent 5 users
        const recentUsers = usersData
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5);

        // Get recent 5 sessions
        const recentSessions = sessionsData
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5);

        // Get recent 5 recommendations
        const recentRecommendations = recommendationsData
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5);

        setStats({
          totalUsers: usersData.length,
          totalCounselees: counseleesData.length,
          totalSessions: sessionsData.length,
          totalRecommendations: recommendationsData.length,
          totalInstitutions: institutionsData.length,
          usersByRole,
          recentUsers,
          recentSessions,
          recentRecommendations
        });

      } catch (error) {
        setError('Error fetching data. Please check the server and your token.');
        console.error('Dashboard data fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Format date helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Translate user roles
  const translateRole = (role) => {
    const roles = {
      'counselee': 'Counselee',
      'counselor': 'Counselor',
      'parent': 'Parent',
      'institution': 'Institution',
      'super_admin': 'Super Admin'
    };
    return roles[role] || role;
  };

 
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="ltr">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Counseling System Dashboard</h1>
            <p className="mt-2 text-gray-600">Overview of system statistics</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <User className="h-6 w-6 text-green-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">Counselees</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCounselees}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MessageCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSessions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">Recommendations</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalRecommendations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Building className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">Institutions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalInstitutions}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Users by Role Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Users by Role</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(stats.usersByRole).map(([role, count]) => (
              <div key={role} className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{count}</p>
                <p className="text-sm text-gray-600">{translateRole(role)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Users */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Users</h2>
            <div className="space-y-3">
              {stats.recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{translateRole(user.role)}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-500">{formatDate(user.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

         
       
        </div>
      </div>
    </div>
  );
};

export default DashboardInstitution;
