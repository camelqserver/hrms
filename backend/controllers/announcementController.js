const db = require('../models');
const Announcement = db.Announcement;

exports.addAnnouncement = async (req, res) => {
  try {
    const { title, message, role } = req.body;
    const newAnnouncement = await Announcement.create({ title, message, role });
    res.status(201).json(newAnnouncement);
  } catch (error) {
    console.error("Add Announcement Error:", error);
    res.status(500).json({ error: "Failed to add announcement" });
  }
};

exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.findAll();
    res.status(200).json(announcements);
  } catch (error) {
    console.error("Get Announcements Error:", error);
    res.status(500).json({ error: "Failed to fetch announcements" });
  }
};
