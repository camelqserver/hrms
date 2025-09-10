const db = require('../models');
const Notification = db.Notification;

exports.sendNotification = async (req, res) => {
  try {
    const { employeeId, message } = req.body;
    const notification = await Notification.create({ employeeId, message });
    res.status(201).json(notification);
  } catch (error) {
    console.error('Notification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getNotificationsByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const notifications = await Notification.findAll({
      where: { employeeId },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.update({ isRead: true }, { where: { id } });
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update notification' });
  }
};
