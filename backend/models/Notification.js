// models/Notification.js
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return Notification;
};
