import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserFormEdit({ token, userId, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    user_type: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/api/superadmin/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setFormData({
        name: res.data.name,
        email: res.data.email,
        password: '', // لا نملأ كلمة السر
        user_type: res.data.user_type,
      });
      setLoading(false);
    })
    .catch(err => {
      setError('خطأ في تحميل بيانات المستخدم');
      setLoading(false);
    });
  }, [userId, token]);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSaving(true);
    setError('');

    // نرسل فقط الحقول التي يريد تعديلها
    const updateData = {
      name: formData.name,
      email: formData.email,
      user_type: formData.user_type,
    };
    if (formData.password.trim() !== '') {
      updateData.password = formData.password;
    }

    axios.put(`http://localhost:8000/api/superadmin/users/${userId}`, updateData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        onSuccess(res.data);
        setSaving(false);
      })
      .catch(err => {
        setError('خطأ في التعديل، تحقق من البيانات');
        setSaving(false);
      });
  };

  if (loading) return <p>جارٍ تحميل بيانات المستخدم...</p>;

  return (
    <div style={{ marginTop: 20 }}>
      <h3>تعديل مستخدم</h3>
      {error && <p style={{color:'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>الاسم: </label>
          <input name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>البريد الإلكتروني: </label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>كلمة المرور (اتركها فارغة إذا لم تريد التغيير): </label>
          <input name="password" type="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <label>نوع المستخدم: </label>
          <select name="user_type" value={formData.user_type} onChange={handleChange} required>
            <option value="seeker">مستفيد</option>
            <option value="counselor">مرشد</option>
            <option value="institution_admin">إدارة مؤسسة</option>
            <option value="super_admin">مشرف عام</option>
            <option value="finance_manager">مدير مالي</option>
            <option value="parent">ولي أمر</option>
          </select>
        </div>
        <button type="submit" disabled={saving}>{saving ? 'جارٍ الحفظ...' : 'حفظ التعديلات'}</button>{' '}
        <button type="button" onClick={onCancel}>إلغاء</button>
      </form>
    </div>
  );
}

export default UserFormEdit;
