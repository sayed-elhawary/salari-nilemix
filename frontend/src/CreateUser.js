import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const CreateUser = ({ token }) => {
  const [newUser, setNewUser] = useState({ username: '', password: '', employeeCode: '', employeeName: '' });

  const createUser = async () => {
    try {
      await axios.post('https://nilemixx.duckdns.org/api/users', newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('تم إنشاء المستخدم بنجاح');
      setNewUser({ username: '', password: '', employeeCode: '', employeeName: '' });
    } catch (err) {
      console.error('خطأ في إنشاء المستخدم:', err);
      alert('خطأ في إنشاء المستخدم: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="dashboard" dir="rtl">
      <div className="header">
        <h1>إنشاء مستخدم</h1>
        <a href="/" className="back-btn">العودة إلى لوحة التحكم</a>
      </div>
      <div className="section">
        <div className="form-stack">
          <label>اسم المستخدم</label>
          <input
            type="text"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            placeholder="اسم المستخدم"
          />
          <label>كلمة المرور</label>
          <input
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            placeholder="كلمة المرور"
          />
          <label>كود الموظف</label>
          <input
            type="text"
            value={newUser.employeeCode}
            onChange={(e) => setNewUser({ ...newUser, employeeCode: e.target.value })}
            placeholder="كود الموظف"
          />
          <label>اسم الموظف (اختياري)</label>
          <input
            type="text"
            value={newUser.employeeName}
            onChange={(e) => setNewUser({ ...newUser, employeeName: e.target.value })}
            placeholder="اسم الموظف"
          />
        </div>
        <button onClick={createUser}>إنشاء مستخدم</button>
      </div>
    </div>
  );
};

export default CreateUser;
