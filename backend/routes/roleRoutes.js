const express = require('express');
const router = express.Router();
const controller = require('../controllers/roleController');

router.post('/roles', controller.createRole);
router.post('/assign-role', controller.assignRole);
router.get('/user-roles/:userId', controller.getUserRoles);

module.exports = router;
