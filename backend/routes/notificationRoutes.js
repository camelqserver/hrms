const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/notifications', notificationController.sendNotification);
router.get('/notifications/:employeeId', notificationController.getNotificationsByEmployee);
router.put('/notifications/:id/read', notificationController.markAsRead);

module.exports = router;
