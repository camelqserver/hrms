const express = require('express');
const router = express.Router();
const payslipController = require('../controllers/payslipController');

router.post('/create', payslipController.createPayslip);
router.get('/get', payslipController.getPayslips);
router.get('/:employeeId', payslipController.getPayslipsByEmployee);

module.exports = router;
