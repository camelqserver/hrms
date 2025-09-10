const express = require('express');
const router = express.Router();
const controller = require('../controllers/payrollController');

router.post('/', controller.createPayroll);
router.get('/', controller.getAllPayrolls);
router.delete('/:id', controller.deletePayroll);

module.exports = router;
