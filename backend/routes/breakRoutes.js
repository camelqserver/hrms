const express = require('express');
const router = express.Router();
const breakController = require('../controllers/breakController');

// routes/breakRoutes.js
router.post('/start', breakController.startBreak);  // POST /api/break/start
router.post('/end', breakController.endBreak);      // POST /api/break/end
router.get('/:employeeId', breakController.getBreaksByEmployee);

module.exports = router;
