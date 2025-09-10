import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Hrloginpage";
import EmployeeLogin from "./pages/EmployeeLogin";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Dashboard from "./pages/Dashboard";
import Employeepage from "./pages/EmployeePage";
import SalaryStructurePage from "./pages/SalaryStructurePage";
import PayslipPage from "./pages/PayslipPage";
import LeavePage from './pages/LeavePage';
import HRLeaveApprovalPage from './pages/HRLeaveApprovalPage';
import AttendanceDashboard from './components/hr/AttendanceDashboard';
import MonthlySummary from "./components/hr/MonthlySummary";
import Breakform from "./pages/BreakForm";
import ClockInOutForm from "./pages/ClockInOutForm";
import MonthlySummaryPage from "./pages/MonthlySummaryPage";
import LeaveCalendar from "./pages/LeaveCalendar";
import HolidayList from './pages/HolidayList';
import AddHolidayForm from './pages/AddHolidayForm';
import AnnouncementList from './pages/AnnouncementList';
import AddAnnouncementForm from './pages/AddAnnouncementForm';
import SubmitFeedback from './components/SubmitFeedback';
import ViewFeedbacks from './components/ViewFeedbacks';
import AddRole from './components/AddRole';
import AssignRole from './components/AssignRole';
import OrgSettingForm from './components/settings/OrgSettingForm';
import NoticeBoard from "./pages/NoticeBoard";
import AdminSettings from "./pages/AdminSettings";
import WelcomePage from "./pages/Welcome";
import Leaverequestpage from "./pages/Employeeleaverequest";
import Employeepayslip from "./pages/Employeepayslipdownload";
import Holidaydisplay from "./pages/Holidaydisplay";
import Register from './pages/Register';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/HR/Login" element={<LoginPage />} />
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/EmployeePage" element={<Employeepage />} />
        <Route path="/SalaryStructurePage" element={<SalaryStructurePage />} />
        <Route path="/PayslipPage" element={<PayslipPage />} />
        <Route path="/EmployeePayslip" element={<Employeepayslip />} />
        <Route path="/leave" element={<LeavePage />} />
        <Route path="/hr/leavesrequest" element={<HRLeaveApprovalPage />} />
        <Route path="/hr/attendance" element={<AttendanceDashboard />} />
        <Route path="/hr/monthly-summary" element={<MonthlySummary />} />
        <Route path="/Breakform" element={<Breakform />} />
        <Route path="/ClockInOutForm" element={<ClockInOutForm/>}/>
        <Route path="/MonthlySummaryPage" element={<MonthlySummaryPage/>}/>
        <Route path="/LeaveCalendar" element={<LeaveCalendar/>}/>
        <Route path="/announcements" element={<AnnouncementList />} />
        <Route path="/add-announcement" element={<AddAnnouncementForm />} />
        <Route path="/submit-feedback" element={<SubmitFeedback />} />
        <Route path="/view-feedbacks" element={<ViewFeedbacks />} />
        <Route path="/add-role" element={<AddRole />} />
        <Route path="/assign-role" element={<AssignRole />} />
        <Route path="/add-holiday" element={<AddHolidayForm onHolidayAdded={() => {}} />} />
        <Route path="/holidays" element={<HolidayList />} />
        <Route path="/holidaydisplay" element={<Holidaydisplay />} />
        <Route path="/org-settings" element={<OrgSettingForm />} />
        <Route path="/NoticeBoard" element={<NoticeBoard />} />
        <Route path="/AdminSettings" element={<AdminSettings />} />
        <Route path="/Leaverequestpage" element={<Leaverequestpage />} />


      </Routes>
    </BrowserRouter>
  );
}
export default App;
