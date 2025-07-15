import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

const InstitutionForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const token = localStorage.getItem('auth_token');

  const [formData, setFormData] = useState({
    name: '',
    sector: '',
    mental_health_policy: '',
    user: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      nationality: '',
      user_type: 'institution_admin',
    }
  });

  useEffect(() => {
    if (isEditMode) {
      fetchInstitution();
    }
  }, [id]);

  const fetchInstitution = async () => {
    try {
     const response = await axios.get(`/api/institutions/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
});
const institution = response.data;

      if (institution) {
        setFormData({
          name: institution.name,
          sector: institution.sector,
          mental_health_policy: institution.mental_health_policy || '',
          user: {
            name: institution.user.name,
            email: institution.user.email,
            password: '',
            password_confirmation: '',
            nationality: institution.user.nationality || '',
            user_type: 'institution_admin',
          }
        });
      }
    } catch (error) {
      console.error('Failed to fetch institution:', error);
    }
  };

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return decodeURIComponent(match[2]);
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const csrfToken = getCookie('XSRF-TOKEN');
      if (csrfToken) {
        axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
      }

      if (isEditMode) {
        await axios.put(`/api/institutions/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('/api/institutions', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      navigate('/admin/institution');
    } catch (error) {
      if (error.response) {
        console.error('Server error:', error.response.data);
        alert('Error: ' + JSON.stringify(error.response.data.errors || error.response.data.message));
      } else {
        console.error('Unexpected error:', error);
        alert('Unexpected error occurred.');
      }
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">{isEditMode ? 'Edit Institution' : 'Add Institution'}</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Institution Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="p-2 border border-gray-300 rounded"
        />
        <select
          value={formData.sector}
          onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
          required
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Select Sector</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="school">School</option>
          <option value="non_profit">Non-Profit</option>
        </select>
        <textarea
          placeholder="Mental Health Policy"
          value={formData.mental_health_policy}
          onChange={(e) => setFormData({ ...formData, mental_health_policy: e.target.value })}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="User Name"
          value={formData.user.name}
          onChange={(e) => setFormData({ ...formData, user: { ...formData.user, name: e.target.value } })}
          required
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="User Email"
          value={formData.user.email}
          onChange={(e) => setFormData({ ...formData, user: { ...formData.user, email: e.target.value } })}
          required
          disabled={isEditMode}
          className="p-2 border border-gray-300 rounded"
        />
        {!isEditMode && (
          <>
            <input
              type="password"
              placeholder="Password"
              value={formData.user.password}
              onChange={(e) => setFormData({ ...formData, user: { ...formData.user, password: e.target.value } })}
              required
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.user.password_confirmation}
              onChange={(e) => setFormData({ ...formData, user: { ...formData.user, password_confirmation: e.target.value } })}
              required
              className="p-2 border border-gray-300 rounded"
            />
          </>
        )}
        <input
          type="text"
          placeholder="Location"
          value={formData.user.nationality}
          onChange={(e) => setFormData({ ...formData, user: { ...formData.user, nationality: e.target.value } })}
          className="p-2 border border-gray-300 rounded"
        />
        <div className="flex justify-between mt-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {isEditMode ? 'Update' : 'Add'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/institution')}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default InstitutionForm;
