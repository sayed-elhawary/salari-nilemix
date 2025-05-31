import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// ProtectedRoute component with enhanced security
const ProtectedRoute = ({ children, token, role }) => {
  const isAuthenticated = token && role;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// CreateSalary component
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
  const [createdAt, setCreatedAt] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://nilemixx.duckdns.org/api/salaries', {
        employeeName,
        employeeCode,
        department,
        basicSalary: Number(basicSalary),
        transportationAllowance: Number(transportationAllowance) || 0,
        housingAllowance: Number(housingAllowance) || 0,
        mealAllowance: Number(mealAllowance) || 0,
        incentives: Number(incentives) || 0,
        deductions: Number(deductions) || 0,
        notes,
        createdAt: new Date(createdAt).toISOString(),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Salary created:', response.data);
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
      setCreatedAt(new Date().toISOString().split('T')[0]);
    } catch (err) {
      console.error('Error creating salary:', err.response?.data || err.message);
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
          <div className="form-group">
            <label htmlFor="createdAt">تاريخ التسجيل</label>
            <input
              type="date"
              id="createdAt"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
              required
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

// CreateIncentiveSalary component
const CreateIncentiveSalary = ({ token, fetchSalaries }) => {
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
  const [createdAt, setCreatedAt] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://nilemixx.duckdns.org/api/salaries', {
        employeeName,
        employeeCode,
        department,
        basicSalary: Number(basicSalary),
        transportationAllowance: Number(transportationAllowance) || 0,
        housingAllowance: Number(housingAllowance) || 0,
        mealAllowance: Number(mealAllowance) || 0,
        incentives: Number(incentives) || 0,
        deductions: Number(deductions) || 0,
        notes,
        createdAt: new Date(createdAt).toISOString(),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Incentive salary created:', response.data);
      alert('تم تسجيل مرتب الحافز بنجاح');
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
      setCreatedAt(new Date().toISOString().split('T')[0]);
    } catch (err) {
      console.error('Error creating incentive salary:', err.response?.data || err.message);
      alert('فشل تسجيل مرتب الحافز: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="create-salary-container">
      <h1 className="create-salary-title">تسجيل مرتب حافز جديد</h1>
      <form className="create-salary-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="incentiveEmployeeName">اسم الموظف</label>
            <input
              type="text"
              id="incentiveEmployeeName"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              placeholder="أدخل اسم الموظف"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="incentiveEmployeeCode">كود الموظف</label>
            <input
              type="text"
              id="incentiveEmployeeCode"
              value={employeeCode}
              onChange={(e) => setEmployeeCode(e.target.value)}
              placeholder="أدخل كود الموظف"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="incentiveDepartment">القسم</label>
            <input
              type="text"
              id="incentiveDepartment"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="أدخل القسم"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="incentiveBasicSalary">الراتب الأساسي</label>
            <input
              type="number"
              id="incentiveBasicSalary"
              value={basicSalary}
              onChange={(e) => setBasicSalary(e.target.value)}
              placeholder="أدخل الراتب الأساسي"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="incentiveTransportationAllowance">بدل انتقال</label>
            <input
              type="number"
              id="incentiveTransportationAllowance"
              value={transportationAllowance}
              onChange={(e) => setTransportationAllowance(e.target.value)}
              placeholder="أدخل بدل الانتقال"
            />
          </div>
          <div className="form-group">
            <label htmlFor="incentiveHousingAllowance">بدل سكن</label>
            <input
              type="number"
              id="incentiveHousingAllowance"
              value={housingAllowance}
              onChange={(e) => setHousingAllowance(e.target.value)}
              placeholder="أدخل بدل السكن"
            />
          </div>
          <div className="form-group">
            <label htmlFor="incentiveMealAllowance">بدل وجبات</label>
            <input
              type="number"
              id="incentiveMealAllowance"
              value={mealAllowance}
              onChange={(e) => setMealAllowance(e.target.value)}
              placeholder="أدخل بدل الوجبات"
            />
          </div>
          <div className="form-group">
            <label htmlFor="incentiveIncentives">حوافز</label>
            <input
              type="number"
              id="incentiveIncentives"
              value={incentives}
              onChange={(e) => setIncentives(e.target.value)}
              placeholder="أدخل الحوافز"
            />
          </div>
          <div className="form-group">
            <label htmlFor="incentiveDeductions">خصومات</label>
            <input
              type="number"
              id="incentiveDeductions"
              value={deductions}
              onChange={(e) => setDeductions(e.target.value)}
              placeholder="أدخل الخصومات"
            />
          </div>
          <div className="form-group">
            <label htmlFor="incentiveCreatedAt">تاريخ التسجيل</label>
            <input
              type="date"
              id="incentiveCreatedAt"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
              required
            />
          </div>
          <div className="form-group form-group-full">
            <label htmlFor="incentiveNotes">ملاحظات</label>
            <input
              type="text"
              id="incentiveNotes"
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

// CreateUser component
const CreateUser = ({ token }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [employeeCode, setEmployeeCode] = useState('');
  const [employeeName, setEmployeeName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://nilemixx.duckdns.org/api/users', {
        username,
        password,
        role,
        employeeCode,
        employeeName,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('User created:', response.data);
      alert('تم إنشاء المستخدم بنجاح');
      setUsername('');
      setPassword('');
      setRole('user');
      setEmployeeCode('');
      setEmployeeName('');
    } catch (err) {
      console.error('Error creating user:', err.response?.data || err.message);
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
          <label htmlFor="employeeName">اسم الموظف</label>
          <input
            type="text"
            id="employeeName"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            placeholder="أدخل اسم الموظف"
          />
        </div>
        <button type="submit" className="submit-btn">إنشاء</button>
      </form>
    </div>
  );
};

// ErrorBoundary component
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>حدث خطأ: {this.state.error?.message || 'غير معروف'}</h1>;
    }
    return this.props.children;
  }
}

// Main App component
const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const [startDate, setStartDate] = useState('2025-05-01');
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterMessage, setFilterMessage] = useState('');
  const navigate = useNavigate();

  // Periodic token check
  useEffect(() => {
    const interval = setInterval(() => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken || storedToken !== token) {
        setToken('');
        setRole('');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login', { replace: true });
      }
    }, 10000); // Every 10 seconds
    return () => clearInterval(interval);
  }, [token, navigate]);

  // Check localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (storedToken && storedRole && (!token || !role)) {
      setToken(storedToken);
      setRole(storedRole);
    }
  }, [token, role]);

  const login = async () => {
    try {
      const res = await axios.post('https://nilemixx.duckdns.org/api/login', { username, password });
      setToken(res.data.token);
      setRole(res.data.role);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert('فشل تسجيل الدخول: ' + (err.response?.data?.message || err.message));
    }
  };

  const logout = () => {
    setToken('');
    setRole('');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login', { replace: true });
  };

  const fetchSalaries = async () => {
    try {
      const url = role === 'admin' ? 'https://nilemixx.duckdns.org/api/salaries' : '/api/salaries/user';
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Fetched salaries:', res.data);
      setSalaries(res.data);
      filterSalaries(res.data, startDate, endDate);
    } catch (err) {
      console.error('Error fetching salaries:', err.response?.data || err.message);
      alert('خطأ في جلب المرتبات: ' + (err.response?.data?.message || err.message));
    }
  };

  const deleteSalary = async (id) => {
    try {
      const response = await axios.delete(`https://nilemixx.duckdns.org/api/salaries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Salary deleted:', response.data);
      alert('تم حذف المرتب بنجاح');
      fetchSalaries();
    } catch (err) {
      console.error('Error deleting salary:', err.response?.data || err.message);
      alert('خطأ في حذف المرتب: ' + (err.response?.data?.message || err.message));
    }
  };

  const deleteAllSalaries = async () => {
    if (!window.confirm('هل أنت متأكد من حذف جميع المرتبات؟ هذا الإجراء لا يمكن التراجع عنه!')) {
      return;
    }
    try {
      const response = await axios.delete('https://nilemixx.duckdns.org/api/salaries', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('All salaries deleted:', response.data);
      alert(`تم حذف ${response.data.deletedCount} مرتب بنجاح`);
      setSalaries([]);
      setFilteredSalaries([]);
      setFilterMessage('');
    } catch (err) {
      console.error('Error deleting all salaries:', err.response?.data || err.message);
      alert('خطأ في حذف جميع المرتبات: ' + (err.response?.data?.message || err.message));
    }
  };

  const filterSalaries = (data, start, end) => {
    console.log('Filtering salaries:', { data, start, end });
    if (!start || !end) {
      setFilteredSalaries(data);
      setFilterMessage(data.length === 0 ? 'لا توجد مرتبات مسجلة.' : '');
      return;
    }
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    endDateObj.setHours(23, 59, 59, 999);
    console.log('Filter dates:', { startDateObj, endDateObj });

    const filtered = data.filter(salary => {
      if (!salary.createdAt) {
        console.warn('Salary missing createdAt:', salary);
        return false;
      }
      const salaryDate = new Date(salary.createdAt);
      if (isNaN(salaryDate.getTime())) {
        console.warn('Invalid createdAt:', salary.createdAt);
        return false;
      }
      return salaryDate >= startDateObj && salaryDate <= endDateObj;
    });

    console.log('Filtered salaries:', filtered);
    setFilteredSalaries(filtered);
    setFilterMessage(filtered.length === 0 ? 'لا توجد مرتبات في هذا النطاق الزمني.' : '');
  };

  const showAllSalaries = () => {
    setFilteredSalaries(salaries);
    setFilterMessage(salaries.length === 0 ? 'لا توجد مرتبات مسجلة.' : '');
  };

  const handleDateFilter = () => {
    if (!startDate || !endDate) {
      alert('يرجى اختيار تاريخ البداية والنهاية.');
      return;
    }
    filterSalaries(salaries, startDate, endDate);
  };

  const calculateTotals = () => {
    return filteredSalaries.reduce(
      (totals, salary) => ({
        basicSalary: totals.basicSalary + (Number(salary.basicSalary) || 0),
        transportationAllowance: totals.transportationAllowance + (Number(salary.transportationAllowance) || 0),
        housingAllowance: totals.housingAllowance + (Number(salary.housingAllowance) || 0),
        mealAllowance: totals.mealAllowance + (Number(salary.mealAllowance) || 0),
        incentives: totals.incentives + (Number(salary.incentives) || 0),
        deductions: totals.deductions + (Number(salary.deductions) || 0),
        netSalary: totals.netSalary + (Number(salary.netSalary) || 0),
      }),
      {
        basicSalary: 0,
        transportationAllowance: 0,
        housingAllowance: 0,
        mealAllowance: 0,
        incentives: 0,
        deductions: 0,
        netSalary: 0,
      }
    );
  };

  const exportToExcel = () => {
    if (!window.XLSX) {
      alert('مكتبة XLSX غير متوفرة. تأكد من تحميلها.');
      return;
    }
    const data = filteredSalaries.map(salary => ({
      "اسم الموظف": salary.employeeName,
      "كود الموظف": salary.employeeCode,
      "القسم": salary.department,
      "الراتب الأساسي": salary.basicSalary,
      "بدل انتقال": salary.transportationAllowance,
      "بدل سكن": salary.housingAllowance,
      "بدل وجبات": salary.mealAllowance,
      "حوافز": salary.incentives,
      "خصومات": salary.deductions,
      "صافي المرتب": salary.netSalary,
      "ملاحظات": salary.notes,
      "تاريخ التسجيل": salary.createdAt ? new Date(salary.createdAt).toLocaleDateString('ar-EG') : '-',
    }));

    const totals = calculateTotals();
    data.push({
      "اسم الموظف": "الإجمالي",
      "كود الموظف": "",
      "القسم": "",
      "الراتب الأساسي": totals.basicSalary,
      "بدل انتقال": totals.transportationAllowance,
      "بدل سكن": totals.housingAllowance,
      "بدل وجبات": totals.mealAllowance,
      "حوافز": totals.incentives,
      "خصومات": totals.deductions,
      "صافي المرتب": totals.netSalary,
      "ملاحظات": "",
      "تاريخ التسجيل": "",
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Salaries");
    XLSX.writeFile(wb, "salaries.xlsx");
  };

  const exportToWord = () => {
    if (!window.docx) {
      alert('مكتبة docx غير متوفرة. تأكد من تحميلها.');
      return;
    }
    const { Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType } = window.docx;
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: "بيان مرتبات شركة النيل للخرسانة الجاهزة",
            heading: "Heading1",
            alignment: "center",
          }),
          new Paragraph({
            text: `من ${startDate} إلى ${endDate}`,
            alignment: "center",
          }),
          new Paragraph({}),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("اسم الموظف")] }),
                  new TableCell({ children: [new Paragraph("كود الموظف")] }),
                  new TableCell({ children: [new Paragraph("القسم")] }),
                  new TableCell({ children: [new Paragraph("الراتب الأساسي")] }),
                  new TableCell({ children: [new Paragraph("بدل انتقال")] }),
                  new TableCell({ children: [new Paragraph("بدل سكن")] }),
                  new TableCell({ children: [new Paragraph("بدل وجبات")] }),
                  new TableCell({ children: [new Paragraph("حوافز")] }),
                  new TableCell({ children: [new Paragraph("خصومات")] }),
                  new TableCell({ children: [new Paragraph("صافي المرتب")] }),
                  new TableCell({ children: [new Paragraph("ملاحظات")] }),
                  new TableCell({ children: [new Paragraph("تاريخ التسجيل")] }),
                ],
              }),
              ...filteredSalaries.map(salary => new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph(salary.employeeName)] }),
                  new TableCell({ children: [new Paragraph(salary.employeeCode)] }),
                  new TableCell({ children: [new Paragraph(salary.department)] }),
                  new TableCell({ children: [new Paragraph(String(salary.basicSalary))] }),
                  new TableCell({ children: [new Paragraph(String(salary.transportationAllowance))] }),
                  new TableCell({ children: [new Paragraph(String(salary.housingAllowance))] }),
                  new TableCell({ children: [new Paragraph(String(salary.mealAllowance))] }),
                  new TableCell({ children: [new Paragraph(String(salary.incentives))] }),
                  new TableCell({ children: [new Paragraph(String(salary.deductions))] }),
                  new TableCell({ children: [new Paragraph(String(salary.netSalary))] }),
                  new TableCell({ children: [new Paragraph(salary.notes || '')] }),
                  new TableCell({ children: [new Paragraph(salary.createdAt ? new Date(salary.createdAt).toLocaleDateString('ar-EG') : '-')] }),
                ],
              })),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("الإجمالي")] }),
                  new TableCell({ children: [new Paragraph("")] }),
                  new TableCell({ children: [new Paragraph("")] }),
                  new TableCell({ children: [new Paragraph(String(calculateTotals().basicSalary))] }),
                  new TableCell({ children: [new Paragraph(String(calculateTotals().transportationAllowance))] }),
                  new TableCell({ children: [new Paragraph(String(calculateTotals().housingAllowance))] }),
                  new TableCell({ children: [new Paragraph(String(calculateTotals().mealAllowance))] }),
                  new TableCell({ children: [new Paragraph(String(calculateTotals().incentives))] }),
                  new TableCell({ children: [new Paragraph(String(calculateTotals().deductions))] }),
                  new TableCell({ children: [new Paragraph(String(calculateTotals().netSalary))] }),
                  new TableCell({ children: [new Paragraph("")] }),
                  new TableCell({ children: [new Paragraph("")] }),
                ],
              }),
            ],
          }),
        ],
      }],
    });

    Packer.toBlob(doc).then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'salaries.docx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }).catch(err => {
      console.error('Error exporting Word:', err);
      alert('فشل تصدير المستند: ' + err.message);
    });
  };

  useEffect(() => {
    if (token && role) fetchSalaries();
  }, [token, role]);

  return (
    <ErrorBoundary>
      <div className="app-container">
        <Routes>
          <Route
            path="/login"
            element={
              !token || !role ? (
                <div className="login-container">
                  <div className="login-box">
                    <h1>بيان مرتبات شركة النيل للخرسانة الجاهزة</h1>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="اسم المستخدم"
                    />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="كلمة المرور"
                    />
                    <button onClick={login}>تسجيل الدخول</button>
                  </div>
                </div>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute token={token} role={role}>
                <div className="dashboard" dir="rtl">
                  <div className="header">
                    <h1>نظام إدارة المرتبات</h1>
                    <button className="logout-btn" onClick={logout}>تسجيل الخروج</button>
                  </div>
                  <div className="section">
                    <h2>المرتبات</h2>
                    <div className="date-filter" style={{ marginBottom: '20px' }}>
                      <label>من: </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        style={{ margin: '0 10px' }}
                      />
                      <label>إلى: </label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        style={{ margin: '0 10px' }}
                      />
                      <button onClick={handleDateFilter}>فلتر</button>
                      <button onClick={showAllSalaries} style={{ margin: '0 10px' }}>عرض الكل</button>
                    </div>
                    {role === 'admin' && (
                      <div className="nav-links">
                        <a href="/create-user">إنشاء مستخدم</a>
                        <a href="/create-salary">تسجيل مرتب</a>
                        <a href="/create-incentive-salary">تسجيل مرتب حافز</a>
                      </div>
                    )}
                    <div className="export-buttons" style={{ marginBottom: '20px' }}>
                      <button onClick={exportToExcel} style={{ margin: '0 10px' }}>
                        تحميل كـ Excel
                      </button>
                      <button onClick={exportToWord}>
                        تحميل كـ Word
                      </button>
                    </div>
                    {role === 'admin' && (
                      <div className="clear-all-container">
                        <button className="clear-all-btn" onClick={deleteAllSalaries}>
                          مسح الكل
                        </button>
                      </div>
                    )}
                    {filterMessage && (
                      <p className="filter-message">{filterMessage}</p>
                    )}
                    <div className="table-container">
                      <table>
                        <thead>
                          <tr>
                            <th>اسم الموظف</th>
                            <th>كود الموظف</th>
                            <th>القسم</th>
                            <th>الراتب الأساسي</th>
                            <th>بدل انتقال</th>
                            <th>بدل سكن</th>
                            <th>بدل وجبات</th>
                            <th>حوافز</th>
                            <th>خصومات</th>
                            <th>صافي المرتب</th>
                            <th>ملاحظات</th>
                            <th>تاريخ التسجيل</th>
                            {role === 'admin' && <th>إجراء</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {filteredSalaries.map((salary) => (
                            <tr key={salary._id}>
                              <td>{salary.employeeName}</td>
                              <td>{salary.employeeCode}</td>
                              <td>{salary.department}</td>
                              <td>{salary.basicSalary}</td>
                              <td>{salary.transportationAllowance}</td>
                              <td>{salary.housingAllowance}</td>
                              <td>{salary.mealAllowance}</td>
                              <td>{salary.incentives}</td>
                              <td>{salary.deductions}</td>
                              <td>{salary.netSalary}</td>
                              <td>{salary.notes}</td>
                              <td>{salary.createdAt ? new Date(salary.createdAt).toLocaleDateString('ar-EG') : '-'}</td>
                              {role === 'admin' && (
                                <td>
                                  <button className="delete-btn" onClick={() => deleteSalary(salary._id)}>حذف</button>
                                </td>
                              )}
                            </tr>
                          ))}
                          <tr style={{ fontWeight: 'bold' }}>
                            <td>الإجمالي</td>
                            <td></td>
                            <td></td>
                            <td>{calculateTotals().basicSalary}</td>
                            <td>{calculateTotals().transportationAllowance}</td>
                            <td>{calculateTotals().housingAllowance}</td>
                            <td>{calculateTotals().mealAllowance}</td>
                            <td>{calculateTotals().incentives}</td>
                            <td>{calculateTotals().deductions}</td>
                            <td>{calculateTotals().netSalary}</td>
                            <td></td>
                            <td></td>
                            {role === 'admin' && <td></td>}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-user"
            element={
              <ProtectedRoute token={token} role={role}>
                {role === 'admin' ? <CreateUser token={token} /> : <Navigate to="/" replace />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-salary"
            element={
              <ProtectedRoute token={token} role={role}>
                {role === 'admin' ? <CreateSalary token={token} fetchSalaries={fetchSalaries} /> : <Navigate to="/" replace />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-incentive-salary"
            element={
              <ProtectedRoute token={token} role={role}>
                {role === 'admin' ? <CreateIncentiveSalary token={token} fetchSalaries={fetchSalaries} /> : <Navigate to="/" replace />}
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

// Wrap App with Router
const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
