const express = require("express");
const router = express.Router();
const controller = require("../controllers/salaryStructureController");

router.post("/", controller.createSalary);
router.get("/", controller.getAllSalaries);
router.put("/:id", controller.updateSalary);
router.delete("/:id", controller.deleteSalary);

module.exports = router;
