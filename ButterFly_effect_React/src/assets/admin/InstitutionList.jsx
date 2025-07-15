import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

const InstitutionList = () => {
  const [institutions, setInstitutions] = useState([]);
  const [filters, setFilters] = useState({ name: '', sector: '', nationality: '' });
  const token = localStorage.getItem('auth_token');
  const navigate = useNavigate();

  const fetchInstitutions = async () => {
    try {
      const response = await axios.get('/api/institutions', {
        headers: { Authorization: `Bearer ${token}` },
        params: filters,
      });
      setInstitutions(response.data);
    } catch (error) {
      console.error('Failed to fetch institutions:', error);
    }
  };

  useEffect(() => {
    fetchInstitutions();
  }, [filters]);

  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will delete the institution and its user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirmed.isConfirmed) {
      try {
        await axios.delete(`/api/institutions/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchInstitutions();
        Swal.fire('Deleted!', 'Institution has been deleted.', 'success');
      } catch (error) {
        console.error('Failed to delete institution:', error);
        Swal.fire('Error', 'Failed to delete institution.', 'error');
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Institutions</h2>

      {/* Filters */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by name"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          className="p-2 border border-gray-300 rounded"
        />
        <select
          value={filters.sector}
          onChange={(e) => setFilters({ ...filters, sector: e.target.value })}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Sectors</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="school">School</option>
          <option value="non_profit">Non-Profit</option>
        </select>
        <input
          type="text"
          placeholder="Search by location"
          value={filters.nationality}
          onChange={(e) => setFilters({ ...filters, nationality: e.target.value })}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={() => navigate('/admin/institutions/create')}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Institution
        </button>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Sector</th>
            <th className="p-2 border">Policy</th>
            <th className="p-2 border">User Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {institutions.map((inst) => (
            <tr key={inst.id}>
              <td className="p-2 border">{inst.name}</td>
              <td className="p-2 border">{inst.sector}</td>
              <td className="p-2 border">{inst.mental_health_policy}</td>
              <td className="p-2 border">{inst.user?.name}</td>
              <td className="p-2 border">{inst.user?.email}</td>
              <td className="p-2 border">{inst.user?.nationality}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => navigate(`/admin/institutions/edit/${inst.id}`)}
                  className="bg-yellow-400 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(inst.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstitutionList;
