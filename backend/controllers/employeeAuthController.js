const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Employee = db.Employee;

exports.loginEmployee = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find employee by username
    const employee = await Employee.findOne({ where: { username } });

    if (!employee) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Verify password
    const isValidPassword = bcrypt.compareSync(password, employee.Password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: employee.id,
        employeeId: employee.employeeId,
        username: employee.username 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send response
    res.json({
      token,
      employeeId: employee.employeeId,
      username: employee.username
    });
  } catch (error) {
    console.error('Employee login error:', error);
    res.status(500).json({ message: 'An error occurred during login. Please try again.' });
  }
};

exports.verifyEmployeeToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.employee = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};