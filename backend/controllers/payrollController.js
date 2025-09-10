const db = require('../models');
const Payroll = db.Payroll;

exports.createPayroll = async (req, res) => {
  try {
    const payroll = await Payroll.create(req.body);
    res.status(201).json(payroll);
  } catch (err) {
    console.error("Create payroll error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllPayrolls = async (req, res) => {
  try {
    const records = await Payroll.findAll();
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch payrolls" });
  }
};

exports.deletePayroll = async (req, res) => {
  try {
    const { id } = req.params;
    await Payroll.destroy({ where: { id } });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};
