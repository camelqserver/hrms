const db = require('../models');
const AppSetting = db.AppSetting;

exports.getSettings = async (req, res) => {
  try {
    let settings = await AppSetting.findOne();
    if (!settings) {
      settings = await AppSetting.create({});
    }
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const updates = req.body;
    const setting = await AppSetting.findOne();
    if (setting) {
      await setting.update(updates);
      res.status(200).json({ message: "Settings updated", data: setting });
    } else {
      const newSetting = await AppSetting.create(updates);
      res.status(201).json({ message: "Settings created", data: newSetting });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update settings" });
  }
};
