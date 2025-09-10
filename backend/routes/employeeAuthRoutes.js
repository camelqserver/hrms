const express = require('express');
const router = express.Router();
const { loginEmployee, verifyEmployeeToken } = require('../controllers/employeeAuthController');

// Employee login route
router.post('/login', loginEmployee);

// Protected route example
router.get('/verify', verifyEmployeeToken, (req, res) => {
  res.json({ message: 'Valid token', employee: req.employee });
});

module.exports = router;