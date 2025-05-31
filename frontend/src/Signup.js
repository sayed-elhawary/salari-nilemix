import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const [newUser, setNewUser] = useState({
    employeeCode: '',
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [cachedEmployees, setCachedEmployees] = useState(
    JSON.parse(localStorage.getItem('cachedEmployees')) || []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' });
  };

  const handleEmployeeSelect = (e) => {
    const selectedCode = e.target.value;
    if (selectedCode === '') {
      setNewUser({
        ...newUser,
        employeeCode: '',
        username: '',
      });
      return;
    }
    const selectedEmployee = cachedEmployees.find(
      (emp) => emp.employeeCode === selectedCode
    );
    if (selectedEmployee) {
      setNewUser({
        ...newUser,
        employeeCode: selectedEmployee.employeeCode,
        username: selectedEmployee.username || '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newUser.employeeCode) newErrors.employeeCode = 'كود الموظف مطلوب';
    if (!newUser.username) newErrors.username = 'اسم المستخدم مطلوب';
    if (!newUser.password) newErrors.password = 'كلمة المرور مطلوبة';
    return newErrors;
  };

  const createUser = async () => {
    try {
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      await axios.post('https://nilemixx.duckdns.org/api/users', newUser);
      // Save employee to cache if not already cached
      const employeeExists = cachedEmployees.some(
        (emp) => emp.employeeCode === newUser.employeeCode
      );
      if (!employeeExists) {
        const updatedEmployees = [
          ...cachedEmployees,
          {
            employeeCode: newUser.employeeCode,
            username: newUser.username,
          },
        ];
        setCachedEmployees(updatedEmployees);
        localStorage.setItem('cachedEmployees', JSON.stringify(updatedEmployees));
      }
      alert('تم تسجيل الحساب بنجاح');
      setNewUser({
        employeeCode: '',
        username: '',
        password: '',
      });
      setErrors({});
    } catch (err) {
      console.error('خطأ في تسجيل الحساب:', err);
      alert('خطأ في تسجيل الحساب: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="signup">
      <h2>تسجيل حساب جديد</h2>
      <form className="signup-form" onSubmit={(e) => { e.preventDefault(); createUser(); }}>
        <div className="form-group">
          <label htmlFor="employeeSelect">اختيار موظف</label>
          <select
            id="employeeSelect"
            onChange={handleEmployeeSelect}
            value={newUser.employeeCode || ''}
          >
            <option value="">-- اختر موظف أو أدخل بيانات جديدة --</option>
            {cachedEmployees.map((emp) => (
              <option key={emp.employeeCode} value={emp.employeeCode}>
                {emp.username} - {emp.employeeCode}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="employeeCode">كود الموظف</label>
          <input
            type="text"
            id="employeeCode"
            name="employeeCode"
            value={newUser.employeeCode}
            onChange={handleChange}
            placeholder="أدخل كود الموظف"
            className={errors.employeeCode ? 'error' : ''}
          />
          {errors.employeeCode && <span className="error-message">{errors.employeeCode}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="username">اسم المستخدم</label>
          <input
            type="text"
            id="username"
            name="username"
            value={newUser.username}
            onChange={handleChange}
            placeholder="أدخل اسم المستخدم"
            className={errors.username ? 'error' : ''}
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">كلمة المرور</label>
          <input
            type="password"
            id="password"
            name="password"
            value={newUser.password}
            onChange={handleChange}
            placeholder="أدخل كلمة المرور"
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        <button type="submit">تسجيل الحساب</button>
      </form>
    </div>
  );
};

export default Signup;
