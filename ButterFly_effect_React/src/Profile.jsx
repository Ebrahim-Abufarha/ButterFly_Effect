import React, { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}
function Profile() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

useEffect(() => {
  async function fetchProfile() {
    try {
      await axios.get('/sanctum/csrf-cookie');
      
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      const csrfToken = getCookie('XSRF-TOKEN');
      if (csrfToken) {
        axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
      }

      const response = await axios.get('/api/profile');
      setForm({
        name: response.data.name || '',
        email: response.data.email || '',
        phone: response.data.phone || '',
        password: '',
        password_confirmation: '',
      });
    } catch (err) {
      console.error('Profile error:', err);
      setError('Failed to load profile. Please login again.');

    } finally {
      setLoading(false);
    }
  }
  fetchProfile();
}, []);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await axios.put('/api/profile', form);
      setMessage('Profile updated successfully!');
      setForm({...form, password: '', password_confirmation: ''});
    } catch {
      setError('Failed to update profile.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem' }}>
      <h2>Edit Profile</h2>

      {message && <p style={{color: 'green'}}>{message}</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div>
          <label>Email:</label><br />
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>

        <div>
          <label>Phone:</label><br />
          <input type="text" name="phone" value={form.phone} onChange={handleChange} />
        </div>

        <div>
          <label>Password:</label><br />
          <input type="password" name="password" value={form.password} onChange={handleChange} />
        </div>

        <div>
          <label>Confirm Password:</label><br />
          <input type="password" name="password_confirmation" value={form.password_confirmation} onChange={handleChange} />
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>Save</button>
      </form>
    </div>
  );
}

export default Profile;
