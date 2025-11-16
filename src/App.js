import React, { useState } from 'react';
import { User, FileText, Calendar, DollarSign, Users, Activity, ClipboardList, Printer, LogOut, Lock, Search } from 'lucide-react';

const userAccounts = {
  doctor: [
    { username: 'doctor1', password: '1234', name: 'นพ.สมศักดิ์ แพทย์ดี', role: 'doctor' },
    { username: 'doctor2', password: '1234', name: 'พญ.สมหญิง ใจดี', role: 'doctor' },
  ],
  staff: [
    { username: 'staff1', password: '1234', name: 'สมศรี พนักงานดี', role: 'staff' },
    { username: 'staff2', password: '1234', name: 'วิไล ช่วยเหลือ', role: 'staff' },
  ],
  owner: [
    { username: 'owner', password: '1234', name: 'คุณวิทยา เจ้าของคลินิก', role: 'owner' },
  ],
};

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showAccounts, setShowAccounts] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const allUsers = [...userAccounts.doctor, ...userAccounts.staff, ...userAccounts.owner];
    const user = allUsers.find(u => u.username === username && u.password === password);

    if (user) {
      onLogin(user);
    } else {
      setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">ระบบบริหารคลินิก</h1>
          <p className="text-gray-600">เข้าสู่ระบบ</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อผู้ใช้</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="กรอกชื่อผู้ใช้"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">รหัสผ่าน</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-gray-400" size={20} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="กรอกรหัสผ่าน"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold shadow-lg">
            เข้าสู่ระบบ
          </button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => setShowAccounts(!showAccounts)} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
            {showAccounts ? 'ซ่อนบัญชีทดสอบ' : 'ดูบัญชีทดสอบ'}
          </button>
        </div>

        {showAccounts && (
          <div className="mt-4 bg-gray-50 rounded-lg p-4 text-sm">
            <p className="font-bold text-gray-700 mb-2">บัญชีทดสอบ (รหัสผ่านทั้งหมด: 1234)</p>
            <div className="space-y-2">
              <div className="bg-blue-50 p-2 rounded">
                <p className="font-semibold text-blue-700">แพทย์:</p>
                <p className="text-gray-700">doctor1, doctor2</p>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <p className="font-semibold text-green-700">พนักงาน:</p>
                <p className="text-gray-700">staff1, staff2</p>
              </div>
              <div className="bg-purple-50 p-2 rounded">
                <p className="font-semibold text-purple-700">เจ้าของ:</p>
                <p className="text-gray-700">owner</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DoctorDashboard = ({ onLogout, userData }) => {
  const [activeTab, setActiveTab] = useState('records');
  const [searchTerm, setSearchTerm] = useState('');
  const [patientDetails, setPatientDetails] = useState(null);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [referralDetails, setReferralDetails] = useState(null);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [showTreatmentHistoryModal, setShowTreatmentHistoryModal] = useState(false);
  
  const [patients, setPatients] = useState([
    { id: 1, name: 'สมชาย ใจดี', age: 35, hn: 'HN001', tel: '081-234-5678', lastVisit: '2025-10-15' },
    { id: 2, name: 'สมหญิง รักสุข', age: 28, hn: 'HN002', tel: '082-345-6789', lastVisit: '2025-10-16' },
    { id: 3, name: 'วิชัย มีสุข', age: 45, hn: 'HN003', tel: '083-456-7890', lastVisit: '2025-10-17' },
  ]);

  // ข้อมูลผู้ป่วยแบบ hardcoded สำหรับแสดงใน popup
  const patientDetailsData = {
    1: {
      id: 1,
      first_name: 'สมชาย',
      last_name: 'ใจดี',
      birth_date: '1990-05-15',
      id_card: '1234567890123',
      gender: 'ชาย',
      address: '123 ถนนสุขุมวิท แขวงคลองตัน เขตคลองตัน กรุงเทพมหานคร 10110',
      phone: '081-234-5678',
      emergency_phone: '082-111-2222',
      blood_group: 'A',
      chronic_diseases: 'เบาหวาน, ความดันโลหิตสูง'
    },
    2: {
      id: 2,
      first_name: 'สมหญิง',
      last_name: 'รักสุข',
      birth_date: '1997-08-20',
      id_card: '2345678901234',
      gender: 'หญิง',
      address: '456 ถนนพหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพมหานคร 10900',
      phone: '082-345-6789',
      emergency_phone: '083-222-3333',
      blood_group: 'B',
      chronic_diseases: 'ไม่มี'
    },
    3: {
      id: 3,
      first_name: 'วิชัย',
      last_name: 'มีสุข',
      birth_date: '1980-03-10',
      id_card: '3456789012345',
      gender: 'ชาย',
      address: '789 ถนนรัชดาภิเษก แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพมหานคร 10310',
      phone: '083-456-7890',
      emergency_phone: '084-333-4444',
      blood_group: 'O',
      chronic_diseases: 'โรคหัวใจ'
    }
  };

  const [medicalRecords, setMedicalRecords] = useState([
    { id: 1, patientId: 1, patientName: 'สมชาย ใจดี', date: '2025-10-15', diagnosis: 'ไข้หวัด', treatment: 'พาราเซตามอล 500mg x 3 ครั้ง/วัน', doctor: userData.name },
    { id: 2, patientId: 2, patientName: 'สมหญิง รักสุข', date: '2025-10-16', diagnosis: 'ปวดหัว', treatment: 'พักผ่อนเพิ่ม, ยาแก้ปวด', doctor: userData.name },
  ]);

  const [labResults, setLabResults] = useState([
    { id: 1, patientId: 1, patientName: 'สมชาย ใจดี', date: '2025-10-15', testType: 'ตรวจเลือด', result: 'ปกติ', wbc: 7200, rbc: 4.8, hb: 13.5, platelet: 250000 },
    { id: 2, patientId: 2, patientName: 'สมหญิง รักสุข', date: '2025-10-16', testType: 'ปัสสาวะ', result: 'รอผล', wbc: '-', rbc: '-', hb: '-', platelet: '-' },
  ]);

  // ข้อมูลโรงพยาบาล/สถานที่ส่งตัว (hardcoded - จำลองจาก database)
  const hospitals = [
    { id: 1, name: 'โรงพยาบาลกลาง', address: '123 ถนนราชวิถี แขวงทุ่งพญาไท เขตราชเทวี กรุงเทพมหานคร 10400', phone: '02-123-4567' },
    { id: 2, name: 'โรงพยาบาลจุฬาลงกรณ์', address: '1873 ถนนพระราม 4 แขวงปทุมวัน เขตปทุมวัน กรุงเทพมหานคร 10330', phone: '02-256-4000' },
    { id: 3, name: 'โรงพยาบาลศิริราช', address: '2 ถนนวังหลัง แขวงศิริราช เขตบางกอกน้อย กรุงเทพมหานคร 10700', phone: '02-419-7000' },
    { id: 4, name: 'โรงพยาบาลรามาธิบดี', address: '270 ถนนพระราม 6 แขวงทุ่งพญาไท เขตราชเทวี กรุงเทพมหานคร 10400', phone: '02-201-1000' },
    { id: 5, name: 'โรงพยาบาลบำรุงราษฎร์', address: '33 สุขุมวิท 3 แขวงคลองตัน เขตคลองตัน กรุงเทพมหานคร 10110', phone: '02-011-2222' }
  ];

  const [referrals, setReferrals] = useState([
    { 
      id: 1, 
      patientId: 1, 
      patientName: 'สมชาย ใจดี', 
      date: '2025-10-10', 
      hospital: 'โรงพยาบาลกลาง', 
      hospitalId: 1,
      reason: 'สงสัยโรคหัวใจ', 
      status: 'รอติดตาม', 
      doctor: userData.name,
      note: 'ผู้ป่วยมีอาการเจ็บหน้าอกและหายใจลำบาก ควรตรวจเพิ่มเติม',
      urgency: 'ปกติ',
      department: 'อายุรกรรม'
    },
  ]);

  // ข้อมูลอาการของผู้ป่วยแต่ละคน (hardcoded)
  const patientSymptoms = {
    1: 'มีไข้, ไอ, น้ำมูกไหล, ปวดหัว',
    2: 'ปวดหัว, เวียนหัว, คลื่นไส้',
    3: 'เจ็บหน้าอก, หายใจลำบาก, เหนื่อยง่าย'
  };

  // ข้อมูลยา/การรักษาที่มีในระบบ (hardcoded - จำลองจาก database)
  const medications = [
    { id: 1, name: 'พาราเซตามอล 500mg', price: 50, unit: 'เม็ด' },
    { id: 2, name: 'ยาลดไข้', price: 30, unit: 'เม็ด' },
    { id: 3, name: 'ยาแก้ไอ', price: 80, unit: 'ขวด' },
    { id: 4, name: 'ยาแก้ปวด', price: 60, unit: 'เม็ด' },
    { id: 5, name: 'ยาลดน้ำมูก', price: 70, unit: 'เม็ด' },
    { id: 6, name: 'ยาลดกรด', price: 40, unit: 'เม็ด' },
    { id: 7, name: 'ยาคลายกล้ามเนื้อ', price: 90, unit: 'เม็ด' },
    { id: 8, name: 'ยาปฏิชีวนะ', price: 150, unit: 'เม็ด' },
    { id: 9, name: 'วิตามินซี', price: 100, unit: 'เม็ด' },
    { id: 10, name: 'ยาลดความดัน', price: 120, unit: 'เม็ด' }
  ];

  // ข้อมูลประเภทการตรวจ (hardcoded - จำลองจาก database)
  const labTestTypes = [
    { id: 1, name: 'ตรวจเลือด', code: 'BLOOD' },
    { id: 2, name: 'ตรวจปัสสาวะ', code: 'URINE' },
    { id: 3, name: 'X-Ray', code: 'XRAY' },
    { id: 4, name: 'อัลตราซาวด์', code: 'US' },
    { id: 5, name: 'CT Scan', code: 'CT' },
    { id: 6, name: 'MRI', code: 'MRI' },
    { id: 7, name: 'ตรวจคลื่นไฟฟ้าหัวใจ', code: 'ECG' },
    { id: 8, name: 'ตรวจความหนาแน่นกระดูก', code: 'BMD' }
  ];

  const [formData, setFormData] = useState({
    treatmentPatient: '',
    treatmentSymptoms: '',
    treatmentDiagnosis: '',
    treatmentMedication: '',
    treatmentQuantity: '',
    treatmentPlan: '',
    certPatient: '',
    certType: 'ใบรับรองแพทย์ทั่วไป',
    certDetails: '',
    certStartDate: '',
    certEndDate: '',
    labRequestPatient: '',
    labRequestTestType: 'ตรวจเลือด',
    labRequestNote: '',
    labPatient: '',
    labTestType: 'ตรวจเลือด',
    labResult: '',
    referralPatient: '',
    referralHospital: '',
    referralReason: '',
    referralNote: '',
    referralUrgency: 'ปกติ',
    referralDepartment: 'อายุรกรรม',
  });

  const handleFormChange = (field, value) => {
    // เมื่อเลือกผู้ป่วย ให้แสดงอาการอัตโนมัติ
    if (field === 'treatmentPatient' && value) {
      const symptoms = patientSymptoms[parseInt(value)] || '';
      setFormData(prev => ({ ...prev, [field]: value, treatmentSymptoms: symptoms }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  // คำนวณราคารวม
  const calculateTotalPrice = () => {
    if (!formData.treatmentMedication || !formData.treatmentQuantity) {
      return 0;
    }
    const medication = medications.find(m => m.id === parseInt(formData.treatmentMedication));
    if (!medication) return 0;
    return medication.price * parseInt(formData.treatmentQuantity || 0);
  };

  const handleViewPatientDetails = (patientId) => {
    // ใช้ข้อมูลจาก state แทนการเรียก API
    const details = patientDetailsData[patientId];
    if (details) {
      setPatientDetails(details);
      setShowPatientModal(true);
    } else {
      alert('ไม่พบข้อมูลผู้ป่วย');
    }
  };

  const handleClosePatientModal = () => {
    setShowPatientModal(false);
    setPatientDetails(null);
  };

  const handleViewTreatmentHistory = () => {
    setShowPatientModal(false); // ปิด modal ข้อมูลผู้ป่วยก่อน
    setShowTreatmentHistoryModal(true);
  };

  const handleCloseTreatmentHistoryModal = () => {
    setShowTreatmentHistoryModal(false);
    // กลับไปแสดง modal ข้อมูลผู้ป่วย
    setShowPatientModal(true);
  };

  const handleGoToTreatment = () => {
    setShowPatientModal(false);
    setPatientDetails(null);
    setActiveTab('treatment');
    // ตั้งค่า patient ในฟอร์มบันทึกการรักษา
    if (patientDetails) {
      setFormData(prev => ({ ...prev, treatmentPatient: patientDetails.id.toString() }));
    }
  };

  const handleViewReferralDetails = (referral) => {
    setReferralDetails(referral);
    setShowReferralModal(true);
  };

  const handleCloseReferralModal = () => {
    setShowReferralModal(false);
    setReferralDetails(null);
  };

  const handleAddReferral = (e) => {
    e.preventDefault();
    if (!formData.referralPatient || !formData.referralHospital || !formData.referralReason) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน (ผู้ป่วย, โรงพยาบาล, เหตุผล)');
      return;
    }
    
    const patient = patients.find(p => p.id === parseInt(formData.referralPatient));
    const hospital = hospitals.find(h => h.name === formData.referralHospital);
    
    const newReferral = {
      id: referrals.length + 1,
      patientId: patient.id,
      patientName: patient.name,
      date: new Date().toISOString().split('T')[0],
      hospital: formData.referralHospital,
      hospitalId: hospital?.id || null,
      reason: formData.referralReason,
      status: 'รอติดตาม',
      doctor: userData.name,
      note: formData.referralNote || '',
      urgency: formData.referralUrgency,
      department: formData.referralDepartment
    };
    
    setReferrals([...referrals, newReferral]);
    setFormData({ 
      ...formData, 
      referralPatient: '', 
      referralHospital: '',
      referralReason: '',
      referralNote: '',
      referralUrgency: 'ปกติ',
      referralDepartment: 'อายุรกรรม'
    });
    alert('บันทึกการส่งตัวสำเร็จ');
  };

  const handleAddTreatment = (e) => {
    e.preventDefault();
    if (!formData.treatmentPatient || !formData.treatmentDiagnosis || !formData.treatmentMedication || !formData.treatmentQuantity) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน (ผู้ป่วย, การวินิจฉัย, ยา, จำนวน)');
      return;
    }
    
    const patient = patients.find(p => p.id === parseInt(formData.treatmentPatient));
    const medication = medications.find(m => m.id === parseInt(formData.treatmentMedication));
    const totalPrice = calculateTotalPrice();
    
    const treatmentText = medication 
      ? `${medication.name} x ${formData.treatmentQuantity} ${medication.unit} (ราคา ${totalPrice.toLocaleString()} บาท)`
      : formData.treatmentPlan;
    
    const newRecord = {
      id: medicalRecords.length + 1,
      patientId: patient.id,
      patientName: patient.name,
      date: new Date().toISOString().split('T')[0],
      diagnosis: formData.treatmentDiagnosis,
      treatment: formData.treatmentPlan ? `${treatmentText}\nคำแนะนำ: ${formData.treatmentPlan}` : treatmentText,
      doctor: userData.name,
      medication: medication?.name,
      quantity: formData.treatmentQuantity,
      price: totalPrice
    };
    
    setMedicalRecords([...medicalRecords, newRecord]);
    setFormData({ 
      ...formData, 
      treatmentPatient: '', 
      treatmentSymptoms: '', 
      treatmentDiagnosis: '', 
      treatmentMedication: '',
      treatmentQuantity: '',
      treatmentPlan: '' 
    });
    alert(`บันทึกการรักษาสำเร็จ\nราคารวม: ${totalPrice.toLocaleString()} บาท`);
  };

  const handleCreateCertificate = (e) => {
    e.preventDefault();
    if (!formData.certPatient || !formData.certDetails) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    alert('ออกใบรับรองแพทย์สำเร็จ\n\nพิมพ์หน้าต่างนี้เพื่อบันทึกเอกสาร');
  };

  const handleSubmitLabRequest = (e) => {
    e.preventDefault();
    if (!formData.labRequestPatient || !formData.labRequestTestType) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน (ผู้ป่วย, ประเภทการตรวจ)');
      return;
    }
    
    const patient = patients.find(p => p.id === parseInt(formData.labRequestPatient));
    const testType = labTestTypes.find(t => t.name === formData.labRequestTestType);
    
    // สร้าง lab result ที่มี status "รอผล"
    const newLabRequest = {
      id: labResults.length + 1,
      patientId: patient.id,
      patientName: patient.name,
      date: new Date().toISOString().split('T')[0],
      testType: formData.labRequestTestType,
      result: 'รอผล',
      wbc: '-',
      rbc: '-',
      hb: '-',
      platelet: '-',
      note: formData.labRequestNote || '',
      status: 'pending'
    };
    
    setLabResults([...labResults, newLabRequest]);
    setFormData({ 
      ...formData, 
      labRequestPatient: '', 
      labRequestTestType: 'ตรวจเลือด',
      labRequestNote: '' 
    });
    alert('บันทึกการส่งตรวจสำเร็จ\nสถานะ: รอผล');
  };

  const handleAddLabResult = (e) => {
    e.preventDefault();
    if (!formData.labPatient || !formData.labResult) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    
    const patient = patients.find(p => p.id === parseInt(formData.labPatient));
    const newLab = {
      id: labResults.length + 1,
      patientId: patient.id,
      patientName: patient.name,
      date: new Date().toISOString().split('T')[0],
      testType: formData.labTestType,
      result: formData.labResult,
      wbc: 7500, rbc: 4.9, hb: 14.0, platelet: 260000,
      status: 'completed'
    };
    
    setLabResults([...labResults, newLab]);
    setFormData({ ...formData, labPatient: '', labResult: '' });
    alert('บันทึกผลการตรวจสำเร็จ');
  };

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.hn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tel.includes(searchTerm)
  );

  const filteredRecords = medicalRecords.filter(r =>
    r.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLabs = labResults.filter(l =>
    l.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.testType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'records', name: 'เวชระเบียน', icon: FileText },
    { id: 'treatment', name: 'บันทึกการรักษา', icon: ClipboardList },
    { id: 'certificate', name: 'ใบรับรอง', icon: FileText },
    { id: 'lab', name: 'ผลแล็บ', icon: Activity },
    { id: 'referral', name: 'ส่งตัว', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <User size={28} />
            <div>
              <h1 className="text-xl font-bold">ระบบแพทย์</h1>
              <p className="text-sm text-blue-100">{userData.name}</p>
            </div>
          </div>
          <button onClick={onLogout} className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg flex items-center space-x-2">
            <LogOut size={20} />
            <span>ออกจากระบบ</span>
          </button>
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSearchTerm(''); }}
                  className={`px-4 py-3 flex items-center space-x-2 whitespace-nowrap ${
                    activeTab === tab.id ? 'bg-white text-blue-600 rounded-t-lg' : 'text-blue-100 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {activeTab === 'records' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ค้นหาเวชระเบียน
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ค้นหา (ชื่อ, HN, เบอร์โทร, การวินิจฉัย)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {activeTab === 'records' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">เวชระเบียนผู้ป่วย</h2>
            <div className="grid gap-4">
              {filteredPatients.map((patient) => (
                <div key={patient.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{patient.name}</h3>
                      <p className="text-gray-600">HN: {patient.hn} | อายุ: {patient.age} ปี</p>
                      <p className="text-gray-600">โทร: {patient.tel}</p>
                      <p className="text-sm text-gray-500 mt-2">มาล่าสุด: {patient.lastVisit}</p>
                    </div>
                    <button
                      onClick={() => handleViewPatientDetails(patient.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      ดูเวชระเบียน
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'treatment' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">บันทึกการรักษา</h2>
            <form onSubmit={handleAddTreatment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">เลือกผู้ป่วย *</label>
                <select
                  value={formData.treatmentPatient}
                  onChange={(e) => handleFormChange('treatmentPatient', e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                  required
                >
                  <option value="">เลือกผู้ป่วย...</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} ({p.hn})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">อาการสำคัญ</label>
                <textarea
                  value={formData.treatmentSymptoms}
                  onChange={(e) => handleFormChange('treatmentSymptoms', e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                  rows="3"
                  placeholder="ระบุอาการสำคัญ (จะแสดงอัตโนมัติเมื่อเลือกผู้ป่วย)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">การวินิจฉัย *</label>
                <textarea
                  value={formData.treatmentDiagnosis}
                  onChange={(e) => handleFormChange('treatmentDiagnosis', e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                  rows="3"
                  placeholder="ระบุการวินิจฉัย"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ยา/การรักษา *</label>
                <select
                  value={formData.treatmentMedication}
                  onChange={(e) => handleFormChange('treatmentMedication', e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 mb-2"
                  required
                >
                  <option value="">เลือกยา/การรักษา...</option>
                  {medications.map((med) => (
                    <option key={med.id} value={med.id}>
                      {med.name} - {med.price.toLocaleString()} บาท/{med.unit}
                    </option>
                  ))}
                </select>
                {formData.treatmentMedication && (
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <label className="block text-sm font-medium mb-2">จำนวน *</label>
                      <input
                        type="number"
                        min="1"
                        value={formData.treatmentQuantity}
                        onChange={(e) => handleFormChange('treatmentQuantity', e.target.value)}
                        className="w-full border rounded-lg px-4 py-2"
                        placeholder="จำนวน"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">ราคารวม</label>
                      <div className="w-full border rounded-lg px-4 py-2 bg-gray-50">
                        <span className="text-lg font-bold text-blue-600">
                          {calculateTotalPrice().toLocaleString()} บาท
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {formData.treatmentMedication && formData.treatmentQuantity && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p>
                      {medications.find(m => m.id === parseInt(formData.treatmentMedication))?.name} 
                      {' '}x {formData.treatmentQuantity} {medications.find(m => m.id === parseInt(formData.treatmentMedication))?.unit}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">คำแนะนำเพิ่มเติม</label>
                <textarea
                  value={formData.treatmentPlan}
                  onChange={(e) => handleFormChange('treatmentPlan', e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                  rows="3"
                  placeholder="ระบุคำแนะนำเพิ่มเติม (ถ้ามี)"
                />
              </div>
              <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium">
                บันทึกการรักษา
              </button>
            </form>
          </div>
        )}

        {activeTab === 'certificate' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">ออกใบรับรองแพทย์</h2>
            <form onSubmit={handleCreateCertificate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">ผู้ป่วย *</label>
                <select
                  value={formData.certPatient}
                  onChange={(e) => handleFormChange('certPatient', e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                  required
                >
                  <option value="">เลือกผู้ป่วย...</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} ({p.hn})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ประเภทใบรับรอง</label>
                <select
                  value={formData.certType}
                  onChange={(e) => handleFormChange('certType', e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option>ใบรับรองแพทย์ทั่วไป</option>
                  <option>ใบรับรองการลาป่วย</option>
                  <option>ใบรับรองสุขภาพ</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">รายละเอียด *</label>
                <textarea
                  value={formData.certDetails}
                  onChange={(e) => handleFormChange('certDetails', e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                  rows="5"
                  placeholder="ระบุรายละเอียด"
                  required
                />
              </div>
              {formData.certType === 'ใบรับรองการลาป่วย' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">ลาป่วยตั้งแต่</label>
                    <input
                      type="date"
                      value={formData.certStartDate}
                      onChange={(e) => handleFormChange('certStartDate', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">ถึงวันที่</label>
                    <input
                      type="date"
                      value={formData.certEndDate}
                      onChange={(e) => handleFormChange('certEndDate', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                </div>
              )}
              <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium">
                ออกใบรับรอง
              </button>
            </form>
          </div>
        )}

        {activeTab === 'lab' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">การส่งตรวจ</h2>
              <form onSubmit={handleSubmitLabRequest} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">เลือกผู้ป่วย *</label>
                    <select
                      value={formData.labRequestPatient}
                      onChange={(e) => handleFormChange('labRequestPatient', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2"
                      required
                    >
                      <option value="">เลือกผู้ป่วย...</option>
                      {patients.map((p) => (
                        <option key={p.id} value={p.id}>{p.name} ({p.hn})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">ประเภทการตรวจ *</label>
                    <select
                      value={formData.labRequestTestType}
                      onChange={(e) => handleFormChange('labRequestTestType', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2"
                      required
                    >
                      {labTestTypes.map((test) => (
                        <option key={test.id} value={test.name}>{test.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">หมายเหตุ (ถ้ามี)</label>
                  <textarea
                    value={formData.labRequestNote}
                    onChange={(e) => handleFormChange('labRequestNote', e.target.value)}
                    className="w-full border rounded-lg px-4 py-2"
                    rows="3"
                    placeholder="ระบุหมายเหตุเพิ่มเติม (ถ้ามี)"
                  />
                </div>
                <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium">
                  ส่งตรวจ
                </button>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">เพิ่มผลการตรวจ</h2>
              <form onSubmit={handleAddLabResult} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">เลือกผู้ป่วย *</label>
                    <select
                      value={formData.labPatient}
                      onChange={(e) => handleFormChange('labPatient', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2"
                      required
                    >
                      <option value="">เลือกผู้ป่วย...</option>
                      {patients.map((p) => (
                        <option key={p.id} value={p.id}>{p.name} ({p.hn})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">ประเภทการตรวจ</label>
                    <select
                      value={formData.labTestType}
                      onChange={(e) => handleFormChange('labTestType', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2"
                    >
                      {labTestTypes.map((test) => (
                        <option key={test.id} value={test.name}>{test.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">ผลการตรวจ *</label>
                  <textarea
                    value={formData.labResult}
                    onChange={(e) => handleFormChange('labResult', e.target.value)}
                    className="w-full border rounded-lg px-4 py-2"
                    rows="4"
                    placeholder="ระบุผลการตรวจ"
                    required
                  />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium">
                  บันทึกผลการตรวจ
                </button>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">ผลการตรวจเลือดและสารคัดหลั่ง</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ค้นหาผลแล็บ
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="ค้นหา (ชื่อ, HN, เบอร์โทร, ประเภทการตรวจ)"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid gap-4">
                {filteredLabs.map((lab) => {
                  const patient = patients.find(p => p.id === lab.patientId);
                  return (
                  <div key={lab.id} className="border rounded-lg p-4">
                    <h3 className="font-bold text-lg mb-3">{lab.patientName} ({patient?.hn || ''})</h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-medium mb-2">{lab.testType} - {lab.date}</p>
                      <p className="text-sm mb-3">สถานะ: <span className={lab.result === 'ปกติ' ? 'text-green-600 font-semibold' : 'text-yellow-600 font-semibold'}>{lab.result}</span></p>
                      {lab.note && (
                        <p className="text-sm text-gray-600 mb-3">หมายเหตุ: {lab.note}</p>
                      )}
                      {lab.result === 'ปกติ' && (
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div><span className="text-gray-600">WBC:</span> <span className="font-medium">{lab.wbc} cells/μL</span></div>
                          <div><span className="text-gray-600">RBC:</span> <span className="font-medium">{lab.rbc} M/μL</span></div>
                          <div><span className="text-gray-600">Hb:</span> <span className="font-medium">{lab.hb} g/dL</span></div>
                          <div><span className="text-gray-600">Platelet:</span> <span className="font-medium">{lab.platelet} /μL</span></div>
                        </div>
                      )}
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'referral' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">ส่งตัวผู้ป่วย</h2>
              <form onSubmit={handleAddReferral} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">เลือกผู้ป่วย *</label>
                    <select
                      value={formData.referralPatient}
                      onChange={(e) => handleFormChange('referralPatient', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2"
                      required
                    >
                      <option value="">เลือกผู้ป่วย...</option>
                      {patients.map((p) => (
                        <option key={p.id} value={p.id}>{p.name} ({p.hn})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">โรงพยาบาล/สถานที่ *</label>
                    <select
                      value={formData.referralHospital}
                      onChange={(e) => handleFormChange('referralHospital', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2"
                      required
                    >
                      <option value="">เลือกโรงพยาบาล...</option>
                      {hospitals.map((h) => (
                        <option key={h.id} value={h.name}>{h.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">ความเร่งด่วน</label>
                    <select
                      value={formData.referralUrgency}
                      onChange={(e) => handleFormChange('referralUrgency', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2"
                    >
                      <option value="ปกติ">ปกติ</option>
                      <option value="ด่วน">ด่วน</option>
                      <option value="ด่วนมาก">ด่วนมาก</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">แผนก</label>
                    <select
                      value={formData.referralDepartment}
                      onChange={(e) => handleFormChange('referralDepartment', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2"
                    >
                      <option value="อายุรกรรม">อายุรกรรม</option>
                      <option value="ศัลยกรรม">ศัลยกรรม</option>
                      <option value="กุมารเวชกรรม">กุมารเวชกรรม</option>
                      <option value="สูติ-นรีเวชกรรม">สูติ-นรีเวชกรรม</option>
                      <option value="จักษุวิทยา">จักษุวิทยา</option>
                      <option value="หูคอจมูก">หูคอจมูก</option>
                      <option value="ออร์โธปิดิกส์">ออร์โธปิดิกส์</option>
                      <option value="อื่นๆ">อื่นๆ</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">เหตุผลการส่งตัว *</label>
                  <textarea
                    value={formData.referralReason}
                    onChange={(e) => handleFormChange('referralReason', e.target.value)}
                    className="w-full border rounded-lg px-4 py-2"
                    rows="3"
                    placeholder="ระบุเหตุผลการส่งตัว"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">หมายเหตุเพิ่มเติม</label>
                  <textarea
                    value={formData.referralNote}
                    onChange={(e) => handleFormChange('referralNote', e.target.value)}
                    className="w-full border rounded-lg px-4 py-2"
                    rows="3"
                    placeholder="ระบุหมายเหตุเพิ่มเติม (ถ้ามี)"
                  />
                </div>
                <button type="submit" className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 font-medium">
                  บันทึกการส่งตัว
                </button>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">ประวัติการส่งตัวผู้ป่วย</h2>
              <div className="space-y-4">
                {referrals.map((ref) => {
                  const patient = patients.find(p => p.id === ref.patientId);
                  return (
                    <div 
                      key={ref.id} 
                      className="border rounded-lg p-4 bg-orange-50 hover:bg-orange-100 cursor-pointer transition-colors"
                      onClick={() => handleViewReferralDetails(ref)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{ref.patientName} ({patient?.hn || ''})</h3>
                          <p className="text-gray-600">ส่งตัวไปยัง: {ref.hospital}</p>
                          <p className="text-sm text-gray-500 mt-2">วันที่: {ref.date}</p>
                          <p className="text-sm">เหตุผล: {ref.reason}</p>
                          <p className="text-sm text-gray-600">โดย: {ref.doctor}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          ref.status === 'รอติดตาม' ? 'bg-orange-200 text-orange-800' : 'bg-green-200 text-green-800'
                        }`}>
                          {ref.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Referral Details Modal */}
        {showReferralModal && referralDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleCloseReferralModal}>
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">รายละเอียดการส่งตัว</h2>
                <button 
                  onClick={handleCloseReferralModal}
                  className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
                >
                  ×
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อผู้ป่วย</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{referralDetails.patientName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">HN</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">
                      {patients.find(p => p.id === referralDetails.patientId)?.hn || '-'}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">วันส่งตัว</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{referralDetails.date}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">โรงพยาบาล/สถานที่</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{referralDetails.hospital}</p>
                  {referralDetails.hospitalId && (() => {
                    const hospital = hospitals.find(h => h.id === referralDetails.hospitalId);
                    return hospital ? (
                      <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        <p>ที่อยู่: {hospital.address}</p>
                        <p>โทร: {hospital.phone}</p>
                      </div>
                    ) : null;
                  })()}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">แผนก</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{referralDetails.department || '-'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ความเร่งด่วน</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{referralDetails.urgency || '-'}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">เหตุผลการส่งตัว</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded whitespace-pre-wrap">{referralDetails.reason}</p>
                </div>

                {referralDetails.note && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">หมายเหตุ</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded whitespace-pre-wrap">{referralDetails.note}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">สถานะ</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{referralDetails.status}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">แพทย์ผู้ส่งตัว</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{referralDetails.doctor}</p>
                  </div>
                </div>
              </div>
              
              <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex justify-end">
                <button
                  onClick={handleCloseReferralModal}
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium"
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Treatment History Modal */}
        {showTreatmentHistoryModal && patientDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]" onClick={handleCloseTreatmentHistoryModal}>
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  ประวัติการรักษา - {patientDetails.first_name} {patientDetails.last_name}
                </h2>
                <button 
                  onClick={handleCloseTreatmentHistoryModal}
                  className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
                >
                  ×
                </button>
              </div>
              
              <div className="p-6">
                {(() => {
                  const patientRecords = medicalRecords.filter(r => r.patientId === patientDetails.id);
                  if (patientRecords.length === 0) {
                    return (
                      <div className="text-center py-8 text-gray-500">
                        <p>ยังไม่มีประวัติการรักษา</p>
                      </div>
                    );
                  }
                  return (
                    <div className="space-y-4">
                      {patientRecords.map((record) => (
                        <div key={record.id} className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-bold text-lg text-gray-800">วันที่: {record.date}</h3>
                              <p className="text-sm text-gray-600">โดย: {record.doctor}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">การวินิจฉัย</label>
                              <p className="text-gray-900 bg-white p-2 rounded">{record.diagnosis}</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">การรักษา/ยา</label>
                              <p className="text-gray-900 bg-white p-2 rounded whitespace-pre-wrap">{record.treatment}</p>
                            </div>
                            {record.medication && (
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">ยา</label>
                                  <p className="text-gray-900 bg-white p-2 rounded">{record.medication}</p>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">จำนวน</label>
                                  <p className="text-gray-900 bg-white p-2 rounded">{record.quantity}</p>
                                </div>
                              </div>
                            )}
                            {record.price && (
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ราคารวม</label>
                                <p className="text-gray-900 bg-white p-2 rounded font-semibold text-blue-600">
                                  {record.price.toLocaleString()} บาท
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
              
              <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex justify-end">
                <button
                  onClick={handleCloseTreatmentHistoryModal}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Patient Details Modal */}
      {showPatientModal && patientDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleClosePatientModal}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">ข้อมูลผู้ป่วย</h2>
              <button 
                onClick={handleClosePatientModal}
                className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{patientDetails.first_name || '-'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">นามสกุล</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{patientDetails.last_name || '-'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">วันเกิด</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{patientDetails.birth_date || '-'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">เลขบัตรประชาชน</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{patientDetails.id_card || '-'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">เพศ</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{patientDetails.gender || '-'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">กรุปเลือด</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{patientDetails.blood_group || '-'}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ที่อยู่</label>
                <p className="text-gray-900 bg-gray-50 p-2 rounded whitespace-pre-wrap">{patientDetails.address || '-'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทร</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{patientDetails.phone || '-'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรฉุกเฉิน</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{patientDetails.emergency_phone || '-'}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">โรคประจำตัว</label>
                <p className="text-gray-900 bg-gray-50 p-2 rounded whitespace-pre-wrap">{patientDetails.chronic_diseases || '-'}</p>
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex justify-between">
              <div className="flex space-x-3">
                <button
                  onClick={handleViewTreatmentHistory}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                >
                  ประวัติการรักษา
                </button>
                <button
                  onClick={handleGoToTreatment}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  บันทึกการรักษา
                </button>
              </div>
              <button
                onClick={handleClosePatientModal}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-medium"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StaffDashboard = ({ onLogout, userData }) => {
  const [activeTab, setActiveTab] = useState('patients');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [patients, setPatients] = useState([
    { id: 1, name: 'สมชาย ใจดี', age: 35, hn: 'HN001', tel: '081-234-5678', lastVisit: '2025-10-15' },
    { id: 2, name: 'สมหญิง รักสุข', age: 28, hn: 'HN002', tel: '082-345-6789', lastVisit: '2025-10-16' },
    { id: 3, name: 'วิชัย มีสุข', age: 45, hn: 'HN003', tel: '083-456-7890', lastVisit: '2025-10-17' },
  ]);

  const [appointments, setAppointments] = useState([
    { id: 1, patientName: 'สมชาย ใจดี', date: '2025-10-20', time: '09:00', type: 'ตรวจรักษาทั่วไป', status: 'รอพบแพทย์' },
    { id: 2, patientName: 'สมหญิง รักสุข', date: '2025-10-20', time: '10:30', type: 'ตรวจสุขภาพประจำปี', status: 'รอพบแพทย์' },
    { id: 3, patientName: 'วิชัย มีสุข', date: '2025-10-21', time: '14:00', type: 'ตรวจติดตามผล', status: 'ยืนยันแล้ว' },
  ]);

  const [payments, setPayments] = useState([
    { id: 1, patientName: 'สมชาย ใจดี', date: '2025-10-15', service: 'ตรวจรักษาทั่วไป', amount: 500, method: 'เงินสด' },
    { id: 2, patientName: 'สมหญิง รักสุข', date: '2025-10-16', service: 'ตรวจเลือด', amount: 800, method: 'โอนเงิน' },
  ]);

  const [showAddPatient, setShowAddPatient] = useState(false);
  const [showAddAppointment, setShowAddAppointment] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    firstName: '', lastName: '', birthDate: '', gender: '', idCard: '', tel: '', email: '', address: ''
  });
  const [formData, setFormData] = useState({
    patientFirstName: '', patientLastName: '', patientBirthDate: '', patientGender: '', patientIdCard: '', 
    patientTel: '', patientEmail: '', patientAddress: '',
    appointPatient: '', appointDate: '', appointTime: '', appointType: 'ตรวจรักษาทั่วไป',
    paymentPatient: '', paymentAmount: '', paymentMethod: 'เงินสด', paymentService: 'ตรวจรักษาทั่วไป'
  });

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    const nameParts = patient.name.split(' ');
    setEditFormData({
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      birthDate: patient.birthDate || '',
      gender: patient.gender || '',
      idCard: patient.idCard || '',
      tel: patient.tel || '',
      email: patient.email || '',
      address: patient.address || ''
    });
    setIsEditing(false);
    setShowPatientModal(true);
  };

  const handleCloseModal = () => {
    setShowPatientModal(false);
    setSelectedPatient(null);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditFormChange = (field, value) => {
    setEditFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = () => {
    if (!editFormData.firstName || !editFormData.lastName || !editFormData.birthDate || !editFormData.tel) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน (ชื่อ, นามสกุล, วันเกิด, เบอร์โทร)');
      return;
    }

    // คำนวณอายุจากวันเกิด
    const birthDate = new Date(editFormData.birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    const updatedPatient = {
      ...selectedPatient,
      name: `${editFormData.firstName} ${editFormData.lastName}`,
      age: age,
      birthDate: editFormData.birthDate,
      gender: editFormData.gender || '',
      idCard: editFormData.idCard || '',
      tel: editFormData.tel,
      email: editFormData.email || '',
      address: editFormData.address || ''
    };

    const updatedPatientsList = patients.map(p => 
      p.id === selectedPatient.id ? updatedPatient : p
    );
    
    setPatients(updatedPatientsList);
    setSelectedPatient(updatedPatient);
    setIsEditing(false);
    alert('บันทึกการแก้ไขสำเร็จ');
  };

  const handleCancelEdit = () => {
    const nameParts = selectedPatient.name.split(' ');
    setEditFormData({
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      birthDate: selectedPatient.birthDate || '',
      gender: selectedPatient.gender || '',
      idCard: selectedPatient.idCard || '',
      tel: selectedPatient.tel || '',
      email: selectedPatient.email || '',
      address: selectedPatient.address || ''
    });
    setIsEditing(false);
  };

  const handleAddPatient = (e) => {
    e.preventDefault();
    if (!formData.patientFirstName || !formData.patientLastName || !formData.patientBirthDate || !formData.patientTel) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน (ชื่อ, นามสกุล, วันเกิด, เบอร์โทร)');
      return;
    }
    
    // คำนวณอายุจากวันเกิด
    const birthDate = new Date(formData.patientBirthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    const newPatient = {
      id: patients.length + 1,
      name: `${formData.patientFirstName} ${formData.patientLastName}`,
      age: age,
      birthDate: formData.patientBirthDate,
      gender: formData.patientGender || '',
      idCard: formData.patientIdCard || '',
      tel: formData.patientTel,
      email: formData.patientEmail || '',
      address: formData.patientAddress || '',
      hn: `HN${String(patients.length + 1).padStart(3, '0')}`,
      lastVisit: new Date().toISOString().split('T')[0]
    };
    
    setPatients([...patients, newPatient]);
    setFormData({ 
      ...formData, 
      patientFirstName: '', 
      patientLastName: '', 
      patientBirthDate: '', 
      patientGender: '', 
      patientIdCard: '', 
      patientTel: '', 
      patientEmail: '', 
      patientAddress: '' 
    });
    setShowAddPatient(false);
    alert('เพิ่มผู้ป่วยสำเร็จ');
  };

  const handleAddAppointment = (e) => {
    e.preventDefault();
    if (!formData.appointPatient || !formData.appointDate || !formData.appointTime) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    
    const newAppointment = {
      id: appointments.length + 1,
      patientName: formData.appointPatient,
      date: formData.appointDate,
      time: formData.appointTime,
      type: formData.appointType,
      status: 'รอพบแพทย์'
    };
    
    setAppointments([...appointments, newAppointment]);
    setFormData({ ...formData, appointPatient: '', appointDate: '', appointTime: '' });
    setShowAddAppointment(false);
    alert('สร้างนัดหมายสำเร็จ');
  };

  const handleAddPayment = (e) => {
    e.preventDefault();
    if (!formData.paymentPatient) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    
    const newPayment = {
      id: payments.length + 1,
      patientName: formData.paymentPatient,
      date: new Date().toISOString().split('T')[0],
      service: formData.paymentService,
      amount: 0,
      method: formData.paymentMethod
    };
    
    setPayments([...payments, newPayment]);
    setFormData({ ...formData, paymentPatient: '' });
    alert('บันทึกการชำระเงินสำเร็จ');
  };

  const handlePrintAppointment = (apt) => {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>ใบนัดหมาย</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            h1 { color: #10b981; }
            .info { margin: 20px 0; line-height: 2; }
          </style>
        </head>
        <body>
          <h1>🏥 ใบนัดหมาย</h1>
          <div class="info">
            <p><strong>ชื่อผู้ป่วย:</strong> ${apt.patientName}</p>
            <p><strong>วันที่นัด:</strong> ${apt.date}</p>
            <p><strong>เวลา:</strong> ${apt.time} น.</p>
            <p><strong>ประเภท:</strong> ${apt.type}</p>
            <p><strong>สถานะ:</strong> ${apt.status}</p>
          </div>
          <p style="margin-top: 40px;">กรุณามาตรงเวลา</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.hn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tel.includes(searchTerm)
  );

  const filteredAppointments = appointments.filter(a =>
    a.status !== 'ยืนยันแล้ว' && (
      a.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.type.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredPayments = payments.filter(p =>
    p.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'patients', name: 'ทะเบียนผู้ป่วย', icon: Users },
    { id: 'appointments', name: 'การนัดหมาย', icon: Calendar },
    { id: 'payment', name: 'ชำระเงิน', icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <ClipboardList size={28} />
            <div>
              <h1 className="text-xl font-bold">ระบบพนักงาน</h1>
              <p className="text-sm text-green-100">{userData.name}</p>
            </div>
          </div>
          <button onClick={onLogout} className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded-lg flex items-center space-x-2">
            <LogOut size={20} />
            <span>ออกจากระบบ</span>
          </button>
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSearchTerm(''); }}
                  className={`px-4 py-3 flex items-center space-x-2 ${
                    activeTab === tab.id ? 'bg-white text-green-600 rounded-t-lg' : 'text-green-100 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {activeTab === 'patients' ? 'ค้นหาผู้ป่วย' : activeTab === 'appointments' ? 'ค้นหาการนัดหมาย' : 'ค้นหาการชำระเงิน'}
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ค้นหา (ชื่อ, HN, เบอร์โทร)"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {activeTab === 'patients' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">จัดการทะเบียนผู้ป่วย</h2>
              <button
                onClick={() => setShowAddPatient(!showAddPatient)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
              >
                <span>{showAddPatient ? 'ยกเลิก' : '+ เพิ่มผู้ป่วยใหม่'}</span>
              </button>
            </div>
            
            {showAddPatient && (
              <div className="mb-6 p-4 bg-green-50 rounded-lg">
                <h3 className="font-bold mb-4 text-left">เพิ่มผู้ป่วยใหม่</h3>
                <form onSubmit={handleAddPatient} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อ *</label>
                      <input
                        type="text"
                        value={formData.patientFirstName}
                        onChange={(e) => handleFormChange('patientFirstName', e.target.value)}
                        className="w-full border rounded-lg px-4 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">นามสกุล *</label>
                      <input
                        type="text"
                        value={formData.patientLastName}
                        onChange={(e) => handleFormChange('patientLastName', e.target.value)}
                        className="w-full border rounded-lg px-4 py-2"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">วันเกิด *</label>
                      <input
                        type="date"
                        value={formData.patientBirthDate}
                        onChange={(e) => handleFormChange('patientBirthDate', e.target.value)}
                        className="w-full border rounded-lg px-4 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">เพศ</label>
                      <select
                        value={formData.patientGender}
                        onChange={(e) => handleFormChange('patientGender', e.target.value)}
                        className="w-full border rounded-lg px-4 py-2"
                      >
                        <option value="">เลือกเพศ</option>
                        <option value="ชาย">ชาย</option>
                        <option value="หญิง">หญิง</option>
                        <option value="อื่นๆ">อื่นๆ</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">เลขบัตรประชาชน</label>
                      <input
                        type="text"
                        value={formData.patientIdCard}
                        onChange={(e) => handleFormChange('patientIdCard', e.target.value)}
                        className="w-full border rounded-lg px-4 py-2"
                        maxLength="13"
                        placeholder="13 หลัก"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">เบอร์โทร *</label>
                      <input
                        type="text"
                        value={formData.patientTel}
                        onChange={(e) => handleFormChange('patientTel', e.target.value)}
                        className="w-full border rounded-lg px-4 py-2"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">อีเมล</label>
                    <input
                      type="email"
                      value={formData.patientEmail}
                      onChange={(e) => handleFormChange('patientEmail', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ที่อยู่</label>
                    <textarea
                      value={formData.patientAddress}
                      onChange={(e) => handleFormChange('patientAddress', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2"
                      rows="3"
                      placeholder="กรอกที่อยู่"
                    />
                  </div>
                  <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    บันทึกผู้ป่วย
                  </button>
                </form>
              </div>
            )}

            <div className="grid gap-4">
              {filteredPatients.map((patient) => (
                <div 
                  key={patient.id} 
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handlePatientClick(patient)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center">
                        <User size={32} className="text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-800">{patient.name}</h3>
                        <p className="text-gray-600">HN: {patient.hn} | อายุ: {patient.age} ปี</p>
                        <p className="text-gray-600">โทร: {patient.tel}</p>
                        {patient.email && <p className="text-gray-600">อีเมล: {patient.email}</p>}
                        <p className="text-sm text-gray-500 mt-2">มาล่าสุด: {patient.lastVisit}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {showPatientModal && selectedPatient && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleCloseModal}>
                <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">รายละเอียดผู้ป่วย</h2>
                    <button 
                      onClick={handleCloseModal}
                      className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ *</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editFormData.firstName}
                          onChange={(e) => handleEditFormChange('firstName', e.target.value)}
                          className="w-full border rounded-lg px-4 py-2"
                          required
                        />
                      ) : (
                        <p className="text-gray-900">{selectedPatient.name?.split(' ')[0] || '-'}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">นามสกุล *</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editFormData.lastName}
                          onChange={(e) => handleEditFormChange('lastName', e.target.value)}
                          className="w-full border rounded-lg px-4 py-2"
                          required
                        />
                      ) : (
                        <p className="text-gray-900">{selectedPatient.name?.split(' ').slice(1).join(' ') || '-'}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">วันเกิด *</label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={editFormData.birthDate}
                          onChange={(e) => handleEditFormChange('birthDate', e.target.value)}
                          className="w-full border rounded-lg px-4 py-2"
                          required
                        />
                      ) : (
                        <p className="text-gray-900">{selectedPatient.birthDate || '-'}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">อายุ</label>
                      <p className="text-gray-900">{selectedPatient.age ? `${selectedPatient.age} ปี` : '-'}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">เพศ</label>
                      {isEditing ? (
                        <select
                          value={editFormData.gender}
                          onChange={(e) => handleEditFormChange('gender', e.target.value)}
                          className="w-full border rounded-lg px-4 py-2"
                        >
                          <option value="">เลือกเพศ</option>
                          <option value="ชาย">ชาย</option>
                          <option value="หญิง">หญิง</option>
                          <option value="อื่นๆ">อื่นๆ</option>
                        </select>
                      ) : (
                        <p className="text-gray-900">{selectedPatient.gender || '-'}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">เลขบัตรประชาชน</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editFormData.idCard}
                          onChange={(e) => handleEditFormChange('idCard', e.target.value)}
                          className="w-full border rounded-lg px-4 py-2"
                          maxLength="13"
                        />
                      ) : (
                        <p className="text-gray-900">{selectedPatient.idCard || '-'}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">HN</label>
                      <p className="text-gray-900">{selectedPatient.hn || '-'}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทร *</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editFormData.tel}
                          onChange={(e) => handleEditFormChange('tel', e.target.value)}
                          className="w-full border rounded-lg px-4 py-2"
                          required
                        />
                      ) : (
                        <p className="text-gray-900">{selectedPatient.tel || '-'}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">อีเมล</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editFormData.email}
                          onChange={(e) => handleEditFormChange('email', e.target.value)}
                          className="w-full border rounded-lg px-4 py-2"
                        />
                      ) : (
                        <p className="text-gray-900">{selectedPatient.email || '-'}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ที่อยู่</label>
                      {isEditing ? (
                        <textarea
                          value={editFormData.address}
                          onChange={(e) => handleEditFormChange('address', e.target.value)}
                          className="w-full border rounded-lg px-4 py-2"
                          rows="3"
                        />
                      ) : (
                        <p className="text-gray-900 whitespace-pre-wrap">{selectedPatient.address || '-'}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">มาล่าสุด</label>
                      <p className="text-gray-900">{selectedPatient.lastVisit || '-'}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-3">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleCancelEdit}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                        >
                          ยกเลิก
                        </button>
                        <button
                          onClick={handleSaveEdit}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                        >
                          บันทึก
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleEditClick}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                        >
                          แก้ไข
                        </button>
                        <button
                          onClick={handleCloseModal}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                        >
                          ปิด
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">จัดการการนัดหมาย</h2>
              <button
                onClick={() => setShowAddAppointment(!showAddAppointment)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
              >
                <span>{showAddAppointment ? 'ยกเลิก' : '+ นัดหมายใหม่'}</span>
              </button>
            </div>

            {showAddAppointment && (
              <div className="mb-6 p-4 bg-green-50 rounded-lg">
                <h3 className="font-bold mb-4">สร้างนัดหมายใหม่</h3>
                <form onSubmit={handleAddAppointment} className="grid grid-cols-2 gap-4">
                  <select
                    value={formData.appointPatient}
                    onChange={(e) => handleFormChange('appointPatient', e.target.value)}
                    className="border rounded-lg px-4 py-2"
                    required
                  >
                    <option value="">เลือกผู้ป่วย *</option>
                    {patients.map(p => <option key={p.id} value={p.name}>{p.name} ({p.hn})</option>)}
                  </select>
                  <select
                    value={formData.appointType}
                    onChange={(e) => handleFormChange('appointType', e.target.value)}
                    className="border rounded-lg px-4 py-2"
                  >
                    <option>ตรวจรักษาทั่วไป</option>
                    <option>ตรวจสุขภาพประจำปี</option>
                    <option>ตรวจติดตามผล</option>
                  </select>
                  <input
                    type="date"
                    value={formData.appointDate}
                    onChange={(e) => handleFormChange('appointDate', e.target.value)}
                    className="border rounded-lg px-4 py-2"
                    required
                  />
                  <input
                    type="time"
                    value={formData.appointTime}
                    onChange={(e) => handleFormChange('appointTime', e.target.value)}
                    className="border rounded-lg px-4 py-2"
                    required
                  />
                  <button type="submit" className="col-span-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    สร้างนัดหมาย
                  </button>
                </form>
              </div>
            )}

            <div className="space-y-4">
              {filteredAppointments.map((apt) => (
                <div key={apt.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{apt.patientName}</h3>
                      <p className="text-gray-600">วันที่: {apt.date} เวลา: {apt.time}</p>
                      <p className="text-gray-600">ประเภท: {apt.type}</p>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                        apt.status === 'รอพบแพทย์' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {apt.status}
                      </span>
                    </div>
                    <button
                      onClick={() => handlePrintAppointment(apt)}
                      className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-1"
                    >
                      <Printer size={16} />
                      <span>พิมพ์</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">รับชำระค่าบริการ</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-lg mb-4">บันทึกการชำระเงิน</h3>
                <form onSubmit={handleAddPayment} className="space-y-4">
                  <select
                    value={formData.paymentPatient}
                    onChange={(e) => handleFormChange('paymentPatient', e.target.value)}
                    className="w-full border rounded-lg px-4 py-2"
                    required
                  >
                    <option value="">เลือกผู้ป่วย *</option>
                    {patients.map(p => <option key={p.id} value={p.name}>{p.name} ({p.hn})</option>)}
                  </select>
                  <select
                    value={formData.paymentService}
                    onChange={(e) => handleFormChange('paymentService', e.target.value)}
                    className="w-full border rounded-lg px-4 py-2"
                  >
                    <option>ตรวจรักษาทั่วไป</option>
                    <option>ตรวจเลือด</option>
                    <option>ตรวจสารคัดหลั่ง</option>
                    <option>ใบรับรองแพทย์</option>
                  </select>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => handleFormChange('paymentMethod', e.target.value)}
                    className="w-full border rounded-lg px-4 py-2"
                  >
                    <option>เงินสด</option>
                    <option>บัตรเครดิต</option>
                    <option>โอนเงิน</option>
                    <option>QR Code</option>
                  </select>
                  <button type="submit" className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 font-medium">
                    บันทึกการชำระเงิน
                  </button>
                </form>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-lg mb-4">ประวัติการชำระเงิน</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredPayments.map((pay) => (
                    <div key={pay.id} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between">
                        <span className="font-medium">{pay.patientName}</span>
                        <span className="text-green-600 font-bold">{pay.amount.toLocaleString()} บาท</span>
                      </div>
                      <p className="text-sm text-gray-600">{pay.service} | {pay.method}</p>
                      <p className="text-xs text-gray-500">{pay.date}</p>
                    </div>
                  ))}
                  <div className="pt-3 border-t mt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>รวม</span>
                      <span className="text-green-600">
                        {payments.reduce((a, b) => a + b.amount, 0).toLocaleString()} บาท
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const OwnerDashboard = ({ onLogout, userData }) => {
  const [activeTab, setActiveTab] = useState('staff');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [staff, setStaff] = useState([
    { id: 1, firstName: 'สมศรี', lastName: 'พนักงานดี', name: 'สมศรี พนักงานดี', position: 'พนักงานคลินิก', tel: '081-111-2222', email: 'somsri@clinic.com', startDate: '2023-01-15', salary: 15000, username: 'somsri001', password: 'p@ssw0rd1', status: 'active' },
    { id: 2, firstName: 'วิไล', lastName: 'ช่วยเหลือ', name: 'วิไล ช่วยเหลือ', position: 'พนักงานคลินิก', tel: '082-222-3333', email: 'wilai@clinic.com', startDate: '2023-03-20', salary: 18000, username: 'wilai002', password: 'p@ssw0rd2', status: 'active' },
  ]);

  const [revenue, setRevenue] = useState([
    { date: '2025-10-15', amount: 15000, services: 8, type: 'ตรวจรักษา' },
    { date: '2025-10-16', amount: 22000, services: 12, type: 'ตรวจรักษา' },
    { date: '2025-10-17', amount: 18000, services: 10, type: 'ตรวจรักษา' },
  ]);

  const [showAddStaff, setShowAddStaff] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    firstName: '', lastName: '', email: '', position: '', tel: ''
  });
  const [formData, setFormData] = useState({
    staffFirstName: '', staffLastName: '', staffEmail: '', staffPosition: '', staffTel: ''
  });

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateUsername = (firstName, lastName) => {
    const firstPart = firstName.toLowerCase().replace(/\s/g, '').substring(0, 4);
    const lastPart = lastName.toLowerCase().replace(/\s/g, '').substring(0, 3);
    const randomNum = Math.floor(Math.random() * 999) + 1;
    return `${firstPart}${lastPart}${randomNum.toString().padStart(3, '0')}`;
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleAddStaff = (e) => {
    e.preventDefault();
    if (!formData.staffFirstName || !formData.staffLastName || !formData.staffEmail || !formData.staffPosition || !formData.staffTel) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    
    const username = generateUsername(formData.staffFirstName, formData.staffLastName);
    const password = generatePassword();
    
    const newStaff = {
      id: staff.length + 1,
      firstName: formData.staffFirstName,
      lastName: formData.staffLastName,
      name: `${formData.staffFirstName} ${formData.staffLastName}`,
      position: formData.staffPosition,
      tel: formData.staffTel,
      email: formData.staffEmail,
      username: username,
      password: password,
      status: 'active',
      salary: 0,
      startDate: new Date().toISOString().split('T')[0]
    };
    
    setStaff([...staff, newStaff]);
    setFormData({ staffFirstName: '', staffLastName: '', staffEmail: '', staffPosition: '', staffTel: '' });
    setShowAddStaff(false);
    alert('เพิ่มพนักงานสำเร็จ');
  };

  const handleStaffClick = (staffMember) => {
    setSelectedStaff(staffMember);
    setEditFormData({
      firstName: staffMember.firstName || staffMember.name?.split(' ')[0] || '',
      lastName: staffMember.lastName || staffMember.name?.split(' ').slice(1).join(' ') || '',
      email: staffMember.email || '',
      position: staffMember.position || '',
      tel: staffMember.tel || ''
    });
    setIsEditing(false);
    setShowStaffModal(true);
  };

  const handleCloseModal = () => {
    setShowStaffModal(false);
    setSelectedStaff(null);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditFormChange = (field, value) => {
    setEditFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = () => {
    if (!editFormData.firstName || !editFormData.lastName || !editFormData.email || !editFormData.position || !editFormData.tel) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    const updatedStaff = {
      ...selectedStaff,
      firstName: editFormData.firstName,
      lastName: editFormData.lastName,
      name: `${editFormData.firstName} ${editFormData.lastName}`,
      email: editFormData.email,
      position: editFormData.position,
      tel: editFormData.tel
    };

    const updatedStaffList = staff.map(s => 
      s.id === selectedStaff.id ? updatedStaff : s
    );
    
    setStaff(updatedStaffList);
    setSelectedStaff(updatedStaff);
    setIsEditing(false);
    alert('บันทึกการแก้ไขสำเร็จ');
  };

  const handleCancelEdit = () => {
    setEditFormData({
      firstName: selectedStaff.firstName || selectedStaff.name?.split(' ')[0] || '',
      lastName: selectedStaff.lastName || selectedStaff.name?.split(' ').slice(1).join(' ') || '',
      email: selectedStaff.email || '',
      position: selectedStaff.position || '',
      tel: selectedStaff.tel || ''
    });
    setIsEditing(false);
  };

  const handleStatusChange = (status) => {
    if (selectedStaff) {
      const updatedStaff = staff.map(s => 
        s.id === selectedStaff.id ? { ...s, status: status } : s
      );
      setStaff(updatedStaff);
      setSelectedStaff({ ...selectedStaff, status: status });
    }
  };

  const totalRevenue = revenue.reduce((a, b) => a + b.amount, 0);
  const totalServices = revenue.reduce((a, b) => a + b.services, 0);

  const filteredStaff = staff.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRevenue = revenue.filter(r =>
    r.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'staff', name: 'ทะเบียนพนักงาน', icon: Users },
    { id: 'revenue', name: 'รายได้', icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Users size={28} />
            <div>
              <h1 className="text-xl font-bold">ระบบเจ้าของคลินิก</h1>
              <p className="text-sm text-purple-100">{userData.name}</p>
            </div>
          </div>
          <button onClick={onLogout} className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded-lg flex items-center space-x-2">
            <LogOut size={20} />
            <span>ออกจากระบบ</span>
          </button>
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSearchTerm(''); }}
                  className={`px-4 py-3 flex items-center space-x-2 ${
                    activeTab === tab.id ? 'bg-white text-purple-600 rounded-t-lg' : 'text-purple-100 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {activeTab === 'staff' ? 'ค้นหาพนักงาน' : 'ค้นหารายได้'}
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ค้นหา"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {activeTab === 'staff' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">จัดการทะเบียนพนักงาน</h2>
              <button
                onClick={() => setShowAddStaff(!showAddStaff)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2"
              >
                <span>{showAddStaff ? 'ยกเลิก' : '+ เพิ่มพนักงาน'}</span>
              </button>
            </div>

            {showAddStaff && (
              <div className="mb-6 p-4 bg-purple-50 rounded-lg">
                <h3 className="font-bold mb-4">เพิ่มพนักงานใหม่</h3>
                <form onSubmit={handleAddStaff} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อ *</label>
                      <input
                        type="text"
                        value={formData.staffFirstName}
                        onChange={(e) => handleFormChange('staffFirstName', e.target.value)}
                        placeholder="กรอกชื่อ"
                        className="w-full border rounded-lg px-4 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">นามสกุล *</label>
                      <input
                        type="text"
                        value={formData.staffLastName}
                        onChange={(e) => handleFormChange('staffLastName', e.target.value)}
                        placeholder="กรอกนามสกุล"
                        className="w-full border rounded-lg px-4 py-2"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">อีเมล *</label>
                    <input
                      type="email"
                      value={formData.staffEmail}
                      onChange={(e) => handleFormChange('staffEmail', e.target.value)}
                      placeholder="กรอกอีเมล"
                      className="w-full border rounded-lg px-4 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ตำแหน่ง *</label>
                    <select
                      value={formData.staffPosition}
                      onChange={(e) => handleFormChange('staffPosition', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2"
                      required
                    >
                      <option value="">เลือกตำแหน่ง</option>
                      <option value="แพทย์">แพทย์</option>
                      <option value="พนักงานคลินิก">พนักงานคลินิก</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">เบอร์โทร *</label>
                    <input
                      type="text"
                      value={formData.staffTel}
                      onChange={(e) => handleFormChange('staffTel', e.target.value)}
                      placeholder="กรอกเบอร์โทร"
                      className="w-full border rounded-lg px-4 py-2"
                      required
                    />
                  </div>
                  <button type="submit" className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                    บันทึกพนักงาน
                  </button>
                </form>
              </div>
            )}

            <div className="grid gap-4">
              {filteredStaff.map((s) => (
                <div 
                  key={s.id} 
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleStaffClick(s)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center">
                        <User size={32} className="text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-lg">{s.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            s.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {s.status === 'active' ? 'Active' : 'Offline'}
                          </span>
                        </div>
                        <p className="text-gray-600">ตำแหน่ง: {s.position}</p>
                        <p className="text-gray-600">โทร: {s.tel}</p>
                        {s.email && <p className="text-gray-600">อีเมล: {s.email}</p>}
                        {s.salary > 0 && <p className="text-gray-600">เงินเดือน: {s.salary.toLocaleString()} บาท/เดือน</p>}
                        <p className="text-sm text-gray-500 mt-2">เริ่มงาน: {s.startDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {showStaffModal && selectedStaff && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleCloseModal}>
                <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">รายละเอียดพนักงาน</h2>
                    <button 
                      onClick={handleCloseModal}
                      className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ *</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editFormData.firstName}
                          onChange={(e) => handleEditFormChange('firstName', e.target.value)}
                          className="w-full border rounded-lg px-4 py-2"
                          required
                        />
                      ) : (
                        <p className="text-gray-900">{selectedStaff.firstName || selectedStaff.name?.split(' ')[0] || '-'}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">นามสกุล *</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editFormData.lastName}
                          onChange={(e) => handleEditFormChange('lastName', e.target.value)}
                          className="w-full border rounded-lg px-4 py-2"
                          required
                        />
                      ) : (
                        <p className="text-gray-900">{selectedStaff.lastName || selectedStaff.name?.split(' ').slice(1).join(' ') || '-'}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทร *</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editFormData.tel}
                          onChange={(e) => handleEditFormChange('tel', e.target.value)}
                          className="w-full border rounded-lg px-4 py-2"
                          required
                        />
                      ) : (
                        <p className="text-gray-900">{selectedStaff.tel || '-'}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">อีเมล *</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editFormData.email}
                          onChange={(e) => handleEditFormChange('email', e.target.value)}
                          className="w-full border rounded-lg px-4 py-2"
                          required
                        />
                      ) : (
                        <p className="text-gray-900">{selectedStaff.email || '-'}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ตำแหน่ง *</label>
                      {isEditing ? (
                        <select
                          value={editFormData.position}
                          onChange={(e) => handleEditFormChange('position', e.target.value)}
                          className="w-full border rounded-lg px-4 py-2"
                          required
                        >
                          <option value="">เลือกตำแหน่ง</option>
                          <option value="แพทย์">แพทย์</option>
                          <option value="พนักงานคลินิก">พนักงานคลินิก</option>
                        </select>
                      ) : (
                        <p className="text-gray-900">{selectedStaff.position || '-'}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                      <p className="text-gray-900 font-mono">{selectedStaff.username || '-'}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <p className="text-gray-900 font-mono">{selectedStaff.password || '-'}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleStatusChange('active')}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            selectedStaff.status === 'active'
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          Active
                        </button>
                        <button
                          onClick={() => handleStatusChange('offline')}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            selectedStaff.status === 'offline'
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          Offline
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-3">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleCancelEdit}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                        >
                          ยกเลิก
                        </button>
                        <button
                          onClick={handleSaveEdit}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
                        >
                          บันทึก
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleEditClick}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
                        >
                          แก้ไข
                        </button>
                        <button
                          onClick={handleCloseModal}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                        >
                          ปิด
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'revenue' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">รายได้รวม</h3>
                  <DollarSign size={32} />
                </div>
                <p className="text-3xl font-bold">{totalRevenue.toLocaleString()}</p>
                <p className="text-green-100 text-sm mt-1">บาท</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">จำนวนบริการ</h3>
                  <Activity size={32} />
                </div>
                <p className="text-3xl font-bold">{totalServices}</p>
                <p className="text-blue-100 text-sm mt-1">ครั้ง</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">ค่าเฉลี่ย/ครั้ง</h3>
                  <FileText size={32} />
                </div>
                <p className="text-3xl font-bold">{Math.round(totalRevenue / totalServices).toLocaleString()}</p>
                <p className="text-purple-100 text-sm mt-1">บาท</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">รายละเอียดรายได้</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">วันที่</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ประเภทบริการ</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">จำนวน (ครั้ง)</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">รายได้ (บาท)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredRevenue.map((rev, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-4 py-3">{rev.date}</td>
                        <td className="px-4 py-3">{rev.type}</td>
                        <td className="px-4 py-3 text-right">{rev.services}</td>
                        <td className="px-4 py-3 text-right font-bold text-green-600">
                          {rev.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50 font-bold">
                      <td className="px-4 py-3" colSpan={2}>รวมทั้งหมด</td>
                      <td className="px-4 py-3 text-right">{totalServices}</td>
                      <td className="px-4 py-3 text-right text-green-600">{totalRevenue.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    const printWindow = window.open('', '', 'width=800,height=600');
                    printWindow.document.write(`
                      <html>
                        <head><title>รายงานรายได้</title>
                        <style>body{font-family:Arial;padding:40px;}table{width:100%;border-collapse:collapse;}th,td{border:1px solid #ddd;padding:8px;text-align:left;}</style>
                        </head>
                        <body>
                          <h1>รายงานรายได้คลินิก</h1>
                          <table>
                            <tr><th>วันที่</th><th>ประเภท</th><th>จำนวน</th><th>รายได้</th></tr>
                            ${revenue.map(r => `<tr><td>${r.date}</td><td>${r.type}</td><td>${r.services}</td><td>${r.amount.toLocaleString()}</td></tr>`).join('')}
                            <tr><td colspan="2"><b>รวม</b></td><td><b>${totalServices}</b></td><td><b>${totalRevenue.toLocaleString()}</b></td></tr>
                          </table>
                        </body>
                      </html>
                    `);
                    printWindow.document.close();
                    printWindow.print();
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
                >
                  <Printer size={18} />
                  <span>พิมพ์รายงาน</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">กราฟรายได้รายวัน</h3>
              <div className="h-64 flex items-end justify-around space-x-2">
                {revenue.map((rev, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg transition-all hover:opacity-80"
                      style={{ height: `${(rev.amount / Math.max(...revenue.map(r => r.amount))) * 100}%` }}
                    ></div>
                    <p className="text-xs text-gray-600 mt-2 text-center">
                      {new Date(rev.date).getDate()}/{new Date(rev.date).getMonth() + 1}
                    </p>
                    <p className="text-xs font-bold text-purple-600">{rev.amount.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function ClinicManagementApp() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  if (currentUser.role === 'doctor') {
    return <DoctorDashboard onLogout={handleLogout} userData={currentUser} />;
  }

  if (currentUser.role === 'staff') {
    return <StaffDashboard onLogout={handleLogout} userData={currentUser} />;
  }

  if (currentUser.role === 'owner') {
    return <OwnerDashboard onLogout={handleLogout} userData={currentUser} />;
  }

  return null;
}