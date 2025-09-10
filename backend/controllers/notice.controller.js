const db = require('../models');
const Notice = db.Notice;

exports.createNotice = async (req, res) => {
  try {
    const notice = await Notice.create(req.body);
    res.status(201).json(notice);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.findAll({ order: [['date', 'DESC']] });
    res.status(200).json(notices);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    await Notice.destroy({ where: { id } });
    res.status(200).json({ message: "Notice deleted" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
