const db = require("../models");
const OrgSetting = db.OrganizationSetting;

exports.saveSettings = async (req, res) => {
  try {
    const setting = await OrgSetting.findOne();
    if (setting) {
      await setting.update(req.body);
      res.status(200).json(setting);
    } else {
      const created = await OrgSetting.create(req.body);
      res.status(201).json(created);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to save settings" });
  }
};

exports.getSettings = async (req, res) => {
  try {
    const setting = await OrgSetting.findOne();
    res.status(200).json(setting);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
};
