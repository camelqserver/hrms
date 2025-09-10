
const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyController');

router.post('/policies', policyController.uploadPolicy);
router.get('/policies', policyController.getAllPolicies);

module.exports = router;
