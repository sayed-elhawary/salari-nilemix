import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // استيراد App.css للتصميم

const CreateSalary = ({ token, fetchSalaries }) => {
  const [employeeName, setEmployeeName] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const [department, setDepartment] = useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const [transportationAllowance, setTransportationAllowance] = useState('');
  const [housingAllowance, setHousingAllowance] = useState('');
  const [mealAllowance, setMealAllowance] = useState('');
  const [incentives, setIncentives] = useState('');
  const [deductions, setDeductions] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://nilemixx.duckdns.org/api/salaries', {
        employeeName,
        employeeCode,
        department,
        basicSalary: Number(basicSalary),
        transportationAllowance: Number(transportationAllowance),
        housingAllowance: Number(housingAllowance),
        mealAllowance: Number(mealAllowance),
        incentives: Number(incentives),
        deductions: Number(deductions),
        notes,
        createdAt: new Date().toISOString(), // إضافة createdAt يدويًا
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('تم تسجيل المرتب بنجاح');
      if (fetchSalaries) fetchSalaries();
      setEmployeeName('');
      setEmployeeCode('');
      setDepartment('');
      setBasicSalary('');
      setTransportationAllowance('');
      setHousingAllowance('');
      setMealAllowance('');
      setIncentives('');
      setDeductions('');
      setNotes('');
    } catch (err) {
      console.error('خطأ في تسجيل المرتب:', err);
      alert('فشل تسجيل المرتب: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="create-salary-container">
      <h1 className="create-salary-title">تسجيل مرتب جديد</h1>
      <form className="create-salary-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="employeeName">اسم الموظف</label>
            <input
              type="text"
              id="employeeName"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              placeholder="أدخل اسم الموظف"
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
              placeholder="أدخل كود الموظف"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">القسم</label>
            <input
              type="text"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="أدخل القسم"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="basicSalary">الراتب الأساسي</label>
            <input
              type="number"
              id="basicSalary"
              value={basicSalary}
              onChange={(e) => setBasicSalary(e.target.value)}
              placeholder="أدخل الراتب الأساسي"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="transportationAllowance">بدل انتقال</label>
            <input
              type="number"
              id="transportationAllowance"
              value={transportationAllowance}
              onChange={(e) => setTransportationAllowance(e.target.value)}
              placeholder="أدخل بدل الانتقال"
            />
          </div>
          <div className="form-group">
            <label htmlFor="housingAllowance">بدل سكن</label>
            <input
              type="number"
              id="housingAllowance"
              value={housingAllowance}
              onChange={(e) => setHousingAllowance(e.target.value)}
              placeholder="أدخل بدل السكن"
            />
          </div>
          <div className="form-group">
            <label htmlFor="mealAllowance">بدل وجبات</label>
            <input
              type="number"
              id="mealAllowance"
              value={mealAllowance}
              onChange={(e) => setMealAllowance(e.target.value)}
              placeholder="أدخل بدل الوجبات"
            />
          </div>
          <div className="form-group">
            <label htmlFor="incentives">حوافز</label>
            <input
              type="number"
              id="incentives"
              value={incentives}
              onChange={(e) => setIncentives(e.target.value)}
              placeholder="أدخل الحوافز"
            />
          </div>
          <div className="form-group">
            <label htmlFor="deductions">خصومات</label>
            <input
              type="number"
              id="deductions"
              value={deductions}
              onChange={(e) => setDeductions(e.target.value)}
              placeholder="أدخل الخصومات"
            />
          </div>
          <div className="form-group form-group-full">
            <label htmlFor="notes">ملاحظات</label>
            <input
              type="text"
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="أدخل الملاحظات"
            />
          </div>
        </div>
        <button type="submit" className="submit-btn">تسجيل</button>
      </form>
    </div>
  );
};

export default CreateSalary;
