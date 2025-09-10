const db = require('../models');
const Leave = db.Leave;

exports.applyLeave = async (req, res) => {
  try {
    const leave = await Leave.create(req.body);
    res.status(201).json(leave);
  } catch (err) {
    console.error("❌ Error while applying leave:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};

exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.findAll();
    res.status(200).json(leaves);
  } catch (err) {
    console.error("❌ Error fetching leaves:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateLeaveStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const leave = await Leave.findByPk(id);
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    leave.status = status;
    await leave.save();

    res.json({ message: 'Leave status updated successfully', leave });
  } catch (err) {
    console.error('Error updating status:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
