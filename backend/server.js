require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
const employeeRoutes = require('./routes/employeeRoutes');
const salaryRoutes = require("./routes/salaryStructureRoutes");
const payslipRoutes = require('./routes/payslipRoutes');
// const attendanceRoutes = require('./routes/attendanceRoutes');
const breakRoutes = require('./routes/breakRoutes');
const ClockinoutRoutes = require('./routes/clockin-clockoutRoutes');
const AnnouncementRoutes = require('./routes/announcementRoutes');
const Feedback = require('./routes/feedbackRoutes');
const payrollRoutes = require('./routes/payrollRoutes');
const appSettingRoutes = require('./routes/appSettingRoutes');
const noticeRoutes = require('./routes/notice.routes');
const settingsRoutes = require('./routes/settings.routes');
const policyRoutes = require('./routes/policyRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const holidayRoutes = require('./routes/holidayRoutes');
const employeeAuthRoutes = require('./routes/employeeAuthRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const passwordResetRoutes = require('./routes/passwordResetRoutes');
const userRoutes = require('./routes/userRoutes');


app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/auth/employee", employeeAuthRoutes);
app.use('/api/employees', employeeRoutes);
app.use("/api/salaries", salaryRoutes);
app.use('/api/payslips', payslipRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/users', userRoutes);
app.use('/api/break',breakRoutes);
app.use('/api/attendance', ClockinoutRoutes);
app.use('/api/announcements', AnnouncementRoutes);
app.use('/api/feedbacks', Feedback);
app.use('/api/payrolls', payrollRoutes);
app.use('/api/settings', appSettingRoutes);
app.use('/api/holidays', holidayRoutes)
app.use('/api', noticeRoutes);
app.use('/api', settingsRoutes);
app.use('/api', policyRoutes);
app.use('/api', notificationRoutes);
app.use('/api/password-reset', passwordResetRoutes);

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
