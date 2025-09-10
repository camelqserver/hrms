const db = require('../models');
const Settings = db.Settings;

exports.createOrUpdateSettings = async (req, res) => {
  try {
    const existing = await Settings.findOne();
    if (existing) {
      await existing.update(req.body);
      res.status(200).json({ message: "Settings updated", data: existing });
    } else {
      const created = await Settings.create(req.body);
      res.status(201).json({ message: "Settings created", data: created });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.status(200).json(settings);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve settings" });
  }
};
