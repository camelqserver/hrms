const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/password-reset/request - Send password reset email
router.post('/request', authController.requestPasswordReset);

// POST /api/password-reset/reset - Reset password with token
router.post('/reset', authController.resetPassword);

// POST /api/password-reset/verify - Verify reset token
router.post('/verify', authController.verifyResetToken);

module.exports = router;
