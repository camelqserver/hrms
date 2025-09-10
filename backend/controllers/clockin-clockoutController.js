// controllers/attendanceController.js

const db = require('../models');
const Attendance = db.Attendance;



exports.getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.findAll();
    res.status(200).json(records);
  } catch (error) {
    console.error('Fetch attendance error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAttendanceRecord = async (req, res) => {
  try {
    const { employeeId, date } = req.query;

    if (!employeeId || !date) {
      return res.status(400).json({ error: 'Missing required fields: employeeId and date' });
    }

    const attendance = await Attendance.findOne({ where: { employeeId, date } });

    if (!attendance) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }

    res.status(200).json(attendance);
  } catch (error) {
    console.error('Get attendance record error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Clock In Controller
exports.markClockIn = async (req, res) => {
  try {
    console.log("Clock-in request body:", req.body);  // 🐞 Add this log

    const { employeeId, date, clockInTime, location } = req.body;

    if (!employeeId || !date || !clockInTime || !location) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const [attendance, created] = await Attendance.findOrCreate({
      where: { employeeId, date },
      defaults: { clockInTime, location }
    });

    if (!created) {
      return res.status(400).json({ error: 'Already clocked in today' });
    }

    res.status(200).json({ message: 'Clocked in successfully', attendance });
  } catch (error) {
    console.error('Clock-in error:', error);  // ❗ This will show the full error
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Clock Out Controller
exports.markClockOut = async (req, res) => {
  try {
    const { employeeId, date, clockOutTime } = req.body;

    if (!employeeId || !date || !clockOutTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const attendance = await Attendance.findOne({ where: { employeeId, date } });

    if (!attendance) {
      return res.status(404).json({ error: 'Clock-in record not found' });
    }

    if (attendance.clockOutTime) {
      return res.status(400).json({ error: 'Already clocked out today' });
    }

    await attendance.update({ clockOutTime });

    res.status(200).json({ message: 'Clocked out successfully', attendance });
  } catch (error) {
    console.error('Clock-out error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



