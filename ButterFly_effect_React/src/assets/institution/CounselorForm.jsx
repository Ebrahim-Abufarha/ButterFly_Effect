import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

const CounselorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode) {
      axios.get(`/api/usersinstitutoin/${id}`).then((res) => {
        const user = res.data;
        setFormData({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          password: '',
          password_confirmation: '',
        });
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

const handleSubmit = async (e) => {
    console.log('user', JSON.parse(localStorage.getItem('user')));

  e.preventDefault();
  setErrors({});

  try {
    await axios.get('/sanctum/csrf-cookie');
    console.log('csrf', getCookie('XSRF-TOKEN'));

    const csrfToken = getCookie('XSRF-TOKEN');
    if (csrfToken) {
      axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
    }

    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const institutionId = loggedInUser?.id; 

    const data = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password ? formData.password : undefined,
      password_confirmation: formData.password ? formData.password_confirmation : undefined,
      role: 'counselor',
      institution_id: institutionId,
    };

    if (!data.password) {
      delete data.password;
      delete data.password_confirmation;
    }

    if (isEditMode) {
      await axios.put(`/api/usersinstitutoin/${id}`, data);
    } else {
      await axios.post('/api/usersinstitutoin', data);
    }

    navigate('/institution/Counselor');
  } catch (err) {
    if (err.response?.data?.errors) {
      setErrors(err.response.data.errors);
    }
    console.error('Submit error:', err);
  }
};


  if (loading) return <p className="p-4">Loading counselor data...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        {isEditMode ? 'Edit Counselor' : 'Create Counselor'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name *</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name[0]}</p>}
        </div>

        <div>
          <label className="block font-medium">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
        </div>

        <div>
          <label className="block font-medium">Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">{isEditMode ? 'New Password' : 'Password *'}</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            minLength="6"
            required={!isEditMode}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password[0]}</p>}
        </div>

        <div>
          <label className="block font-medium">{isEditMode ? 'Confirm New Password' : 'Confirm Password *'}</label>
          <input
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            minLength="6"
            required={!isEditMode}
          />
          {errors.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation[0]}</p>}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/institution/counselors')}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {isEditMode ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CounselorForm;