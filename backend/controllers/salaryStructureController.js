const db = require("../models");
const SalaryStructure = db.SalaryStructure;

exports.createSalary = async (req, res) => {
  try {
    const newSalary = await SalaryStructure.create(req.body);
    res.status(201).json(newSalary);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllSalaries = async (req, res) => {
  try {
    const salaries = await SalaryStructure.findAll();
    res.json(salaries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSalary = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await SalaryStructure.update(req.body, { where: { id } });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteSalary = async (req, res) => {
  try {
    const { id } = req.params;
    await SalaryStructure.destroy({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
