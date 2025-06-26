import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    role: 'institution', // ثابت لأن هذه صفحة مؤسسات فقط
    institution_name: '',
    institution_address: '',
    institution_contact_info: '',
    // institution_status: true,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode) {
      axios.get(`/api/users/${id}`).then((res) => {
        const user = res.data;
        setFormData({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          role: 'institution',
          institution_name: user.institution?.name || '',
          institution_address: user.institution?.address || '',
          institution_contact_info: user.institution?.contact_info || '',
        //   institution_status: user.institution?.status ?? true,
          password: '',
          password_confirmation: '',
        });
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await axios.get('/sanctum/csrf-cookie');
      const csrfToken = getCookie('XSRF-TOKEN');
      if (csrfToken) {
        axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
      }

      // جهز البيانات للإرسال
      const data = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: 'institution',
        password: formData.password ? formData.password : undefined,
        password_confirmation: formData.password ? formData.password_confirmation : undefined,
        institution_name: formData.institution_name,
        institution_address: formData.institution_address,
        institution_contact_info: formData.institution_contact_info,
        // institution_status: formData.institution_status,
      };

      // امسح كلمات المرور لو مش معبية (حتى لا تسبب مشاكل في التحديث)
      if (!data.password) {
        delete data.password;
        delete data.password_confirmation;
      }

      if (isEditMode) {
        await axios.put(`/api/users/${id}`, data);
      } else {
        await axios.post('/api/users', data);
      }

      navigate('/admin/users');
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
      console.error('Submit error:', err);
    }
  };

  if (loading) return <p className="p-4">Loading institution data...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        {isEditMode ? 'Edit Institution' : 'Create Institution'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* User Name */}
        <div>
          <label className="block font-medium">User Name *</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name[0]}</p>}
        </div>

        {/* Email */}
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

        {/* Phone */}
        <div>
          <label className="block font-medium">Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Password */}
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

        {/* Password Confirmation */}
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
          {errors.password_confirmation && (
            <p className="text-red-500 text-sm">{errors.password_confirmation[0]}</p>
          )}
        </div>

        {/* Institution Name */}
        <div>
          <label className="block font-medium">Institution Name *</label>
          <input
            name="institution_name"
            value={formData.institution_name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          {errors.institution_name && (
            <p className="text-red-500 text-sm">{errors.institution_name[0]}</p>
          )}
        </div>

        {/* Institution Address */}
        <div>
          <label className="block font-medium">Address</label>
          <input
            name="institution_address"
            value={formData.institution_address}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Institution Contact Info */}
        <div>
          <label className="block font-medium">Contact Info</label>
          <input
            name="institution_contact_info"
            value={formData.institution_contact_info}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Institution Status */}
        {/* <div>
          <label className="block font-medium">Status</label>
          <select
            name="institution_status"
            value={formData.institution_status ? 'true' : 'false'}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                institution_status: e.target.value === 'true',
              }))
            }
            className="w-full border px-3 py-2 rounded"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div> */}

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/admin/users')}
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

export default UserForm;
