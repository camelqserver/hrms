const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');

// POST /api/leaves
router.post('/add', leaveController.applyLeave);

// GET /api/leaves
router.get('/get', leaveController.getAllLeaves);

// PUT /api/leaves/:id/status
router.put('/:id/status', leaveController.updateLeaveStatus);

module.exports = router;
