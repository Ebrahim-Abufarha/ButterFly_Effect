import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardAdmin = () => {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    axios.get('http://localhost:8000/api/dashboard/stats', {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true
    })
      .then(res => setStats(res.data))
      .catch(err => console.error('Error loading stats:', err));
  }, []);

  if (!stats) return <p>Loading data...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Dashboard</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
      }}>
        <StatCard label="Total Users" value={stats.total_users} />
        <StatCard label="Total Counselees" value={stats.total_seekers} />
        <StatCard label="Total Counselors" value={stats.total_counselors} />
        <StatCard label="Total Parents" value={stats.total_parents} />
        <StatCard label="Total Institutions" value={stats.total_institutions} />
        <StatCard label="Total Sessions" value={stats.total_sessions} />
        <StatCard label="Completed Sessions" value={stats.completed_sessions} />
        <StatCard label="Upcoming Sessions" value={stats.upcoming_sessions} />
        <StatCard label="Total Transactions" value={stats.total_financial_transactions} />
        <StatCard label="Total Income" value={`${stats.total_income} $`} />
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div style={{
    backgroundColor: '#f4f4f4',
    padding: '1rem',
    borderRadius: '8px',
    textAlign: 'center'
  }}>
    <h4>{label}</h4>
    <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{value}</p>
  </div>
);

export default DashboardAdmin;
