const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settings.controller');

router.get('/settings', settingsController.getSettings);
router.post('/settings', settingsController.createOrUpdateSettings);

module.exports = router;
