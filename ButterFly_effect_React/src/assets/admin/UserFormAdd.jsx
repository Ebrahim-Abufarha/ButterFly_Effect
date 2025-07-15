import React, { useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
function UserFormAdd({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    user_type: 'seeker',
    age: '',
    // حقول إضافية لو حابب تضيف
  });
  const [error, setError] = useState('');

  const token = localStorage.getItem('auth_token');

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
axios.get('http://localhost:8000/sanctum/csrf-cookie');
    axios.post('http://localhost:8000/api/superadmin/users', formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      onSuccess(res.data);
      setFormData({
        name: '',
        email: '',
        password: '',
        user_type: 'seeker',
        age: '',
      });
    })
    .catch(err => {
      if (err.response?.data?.message) setError(err.response.data.message);
      else setError('Error submitting form');
      console.error(err);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add User</h3>
      {error && <p style={{color:'red'}}>{error}</p>}
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <select name="user_type" value={formData.user_type} onChange={handleChange} required>
        <option value="seeker">Seeker</option>
        <option value="counselor">Counselor</option>
        <option value="institution_admin">Institution Admin</option>
        <option value="super_admin">Super Admin</option>
        <option value="finance_manager">Finance Manager</option>
        <option value="parent">Parent</option>
      </select>
      <input name="age" type="number" placeholder="Age" value={formData.age} onChange={handleChange} required />

      <button type="submit">Add User</button>
    </form>
  );
}

export default UserFormAdd;
