const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/notice.controller');

router.post('/notices', noticeController.createNotice);
router.get('/notices', noticeController.getNotices);
router.delete('/notices/:id', noticeController.deleteNotice);

module.exports = router;
