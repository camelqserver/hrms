const db = require('../models');
const Break = db.Break;
const moment = require('moment');

exports.startBreak = async (req, res) => {
  try {
    const { employeeId, date, breakStart } = req.body;

    // Validate employeeId
    if (!employeeId || isNaN(parseInt(employeeId))) {
      return res.status(400).json({ error: "Invalid or missing employeeId" });
    }

    const existing = await Break.findOne({
      where: {
        employeeId: parseInt(employeeId),
        date,
        breakEnd: null
      }
    });

    if (existing) {
      return res.status(400).json({ message: 'Break already started.' });
    }

    const newBreak = await Break.create({
      employeeId: parseInt(employeeId),
      date,
      breakStart
    });

    return res.status(201).json(newBreak);
  } catch (error) {
    console.error("Start break error:", error);
    return res.status(500).json({ error: 'Failed to start break' });
  }
};

exports.endBreak = async (req, res) => {
  try {
    const { employeeId, date, breakEnd } = req.body;

    // Find the break for the employee on the given date that hasn't ended yet
    const ongoing = await Break.findOne({
      where: {
        employeeId,
        date,
        breakEnd: null
      },
      order: [['createdAt', 'DESC']] // get the latest break if multiple exist
    });

    if (!ongoing) {
      return res.status(404).json({ error: "No active break found for this employee." });
    }

    const duration = moment
      .utc(moment(breakEnd, "HH:mm:ss").diff(moment(ongoing.breakStart, "HH:mm:ss")))
      .format("HH:mm:ss");

    await ongoing.update({ breakEnd, duration });

    res.status(200).json(ongoing);
  } catch (err) {
    console.error("End break error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getBreaksByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const records = await Break.findAll({ where: { employeeId } });
    res.status(200).json(records);
  } catch (err) {
    console.error("Fetch breaks error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
