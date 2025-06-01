const CreateSalary = ({ token, fetchSalaries }) => {
  const [employeeName, setEmployeeName] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const [department, setDepartment] = useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://nilemixx.duckdns.org/api/users/codes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(response.data);
        if (response.data.length === 0) {
          setError('لا يوجد موظفون مسجلون. أضف موظفًا عبر صفحة "إنشاء مستخدم".');
        }
      } catch (err) {
        console.error('خطأ في جلب أكواد الموظفين:', err.response?.data || err.message);
        setError('فشل جلب بيانات الموظفين: ' + (err.response?.data?.message || err.message));
      }
    };
    fetchEmployees();
  }, [token]);

  const handleEmployeeCodeChange = (e) => {
    const selectedCode = e.target.value;
    setEmployeeCode(selectedCode);
    const selectedEmployee = employees.find(emp => emp.employeeCode === selectedCode);
    setEmployeeName(selectedEmployee && selectedEmployee.employeeName ? selectedEmployee.employeeName : 'غير محدد');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('https://nilemixx.duckdns.org/api/salaries', {
        employeeName: employeeName || 'غير محدد',
        employeeCode,
        department,
        basicSalary: Number(basicSalary),
        transportationAllowance: 0,
        housingAllowance: 0,
        mealAllowance: 0,
        incentives: 0,
        deductions: 0,
        notes: '',
        createdAt: new Date().toISOString(),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('تم إنشاء المرتب:', response.data);
      alert('تم تسجيل المرتب بنجاح');
      if (fetchSalaries) fetchSalaries();
      setEmployeeName('');
      setEmployeeCode('');
      setDepartment('');
      setBasicSalary('');
    } catch (err) {
      console.error('خطأ في إنشاء المرتب:', err.response?.data || err.message);
      const errorMessage = err.response?.data?.message || err.message;
      setError('فشل تسجيل المرتب: ' + errorMessage);
    }
  };

  return (
    <div className="create-salary-container">
      <h1 className="create-salary-title">تسجيل مرتب جديد</h1>
      {error && <p className="error-message">{error}</p>}
      {employees.length === 0 && !error ? (
        <p className="loading-message">جاري جلب بيانات الموظفين...</p>
      ) : (
        <form className="create-salary-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="employeeCode">كود الموظف</label>
            <select
              id="employeeCode"
              value={employeeCode}
              onChange={handleEmployeeCodeChange}
              required
            >
              <option value="">اختر كود الموظف</option>
              {employees.map(emp => (
                <option key={emp.employeeCode} value={emp.employeeCode}>
                  {emp.employeeCode} {emp.employeeName ? `- ${emp.employeeName}` : ''}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="employeeName">اسم الموظف</label>
            <input
              type="text"
              id="employeeName"
              value={employeeName}
              readOnly
              placeholder="سيتم ملؤه تلقائيًا"
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
          <button type="submit" className="submit-btn">تسجيل</button>
        </form>
      )}
    </div>
  );
};
