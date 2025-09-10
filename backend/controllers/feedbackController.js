const db = require('../models');
const Feedback = db.Feedback;

exports.submitFeedback = async (req, res) => {
  try {
    const { employeeId, subject, message } = req.body;
    const feedback = await Feedback.create({ employeeId, subject, message });
    res.status(201).json(feedback);
  } catch (err) {
    console.error("Feedback error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll();
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.respondFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { response, status } = req.body;
    await Feedback.update({ response, status }, { where: { id } });
    res.status(200).json({ message: "Feedback responded" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
