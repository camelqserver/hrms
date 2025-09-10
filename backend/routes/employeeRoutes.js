const express = require('express');
const router = express.Router();
const empController = require('../controllers/employeeController');

router.get('/', empController.getAll);
router.get('/:id', empController.getById); // Add this line
router.post('/', empController.create);
router.put('/:id', empController.update);
router.delete('/:id', empController.delete);

module.exports = router;
