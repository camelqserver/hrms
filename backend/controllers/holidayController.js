const db = require('../models');
const Holiday = db.Holiday;

exports.addHoliday = async (req, res) => {
  try {
    const { title, date, description } = req.body;
    const newHoliday = await Holiday.create({ title, date, description });
    res.status(201).json(newHoliday);
  } catch (err) {
    console.error('Add Holiday Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllHolidays = async (req, res) => {
  try {
    const holidays = await Holiday.findAll();
    res.status(200).json(holidays);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteHoliday = async (req, res) => {
  try {
    const { id } = req.params;
    await Holiday.destroy({ where: { id } });
    res.status(200).json({ message: 'Holiday deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
