const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');

router.post('/', announcementController.addAnnouncement);
router.get('/', announcementController.getAllAnnouncements);

module.exports = router;
