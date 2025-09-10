const { Payslip } = require('../models');

exports.createPayslip = async (req, res) => {
  try {
    const payslip = await Payslip.create(req.body);
    res.status(201).json(payslip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPayslips = async (req, res) => {
  try {
    const payslips = await Payslip.findAll();
    res.json(payslips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET payslip for a specific employee
exports.getPayslipsByEmployee = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const payslips = await Payslip.findAll({
      where: { employeeId },
      order: [['year', 'DESC'], ['month', 'DESC']],
    });

    if (payslips.length === 0) {
      return res.status(404).json({ message: 'No payslips found for this employee' });
    }

    res.json(payslips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while fetching payslips' });
  }
};
