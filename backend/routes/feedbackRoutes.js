const express = require('express');
const router = express.Router();
const controller = require('../controllers/feedbackController');

router.post('/', controller.submitFeedback);
router.get('/', controller.getAllFeedbacks);
router.put('/:id', controller.respondFeedback);

module.exports = router;
