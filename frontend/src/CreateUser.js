import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const CreateUser = ({ token }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [employeeCode, setEmployeeCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://nilemixx.duckdns.org/api/users', {
        username,
        password,
        role,
        employeeCode,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('تم إنشاء المستخدم بنجاح');
      setUsername('');
      setPassword('');
      setRole('user');
      setEmployeeCode('');
    } catch (err) {
      console.error('خطأ في إنشاء المستخدم:', err);
      alert('فشل إنشاء المستخدم: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="create-user-container">
      <h1 className="create-user-title">إنشاء مستخدم جديد</h1>
      <form className="create-user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">اسم المستخدم</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="أدخل اسم المستخدم"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">كلمة المرور</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="أدخل كلمة المرور"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="employeeCode">كود الموظف</label>
          <input
            type="text"
            id="employeeCode"
            value={employeeCode}
            onChange={(e) => setEmployeeCode(e.target.value)}
            placeholder="أدخل كود الموظف (اختياري)"
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">الدور</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">مستخدم</option>
            <option value="admin">مدير</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">إنشاء</button>
      </form>
    </div>
  );
};

export default CreateUser;
