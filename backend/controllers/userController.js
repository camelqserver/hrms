const bcrypt = require('bcryptjs');
const { User } = require('../models');

// ✅ Register User
exports.registerUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Email, password, and role are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    // Validate role
    const validRoles = ['EMPLOYEE', 'HR'];
    if (!validRoles.includes(role.toUpperCase())) {
      return res.status(400).json({ message: 'Role must be either EMPLOYEE or HR' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      email: email.toLowerCase(), 
      password: hashedPassword, 
      role: role.toUpperCase() 
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user.id, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific Sequelize errors
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
    }
    
    if (error.name === 'SequelizeConnectionError') {
      return res.status(500).json({ message: 'Database connection error' });
    }
    
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
};

// ✅ Get All Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'role'] // hide password
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
