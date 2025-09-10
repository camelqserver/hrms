// models/Attendance.js
module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clockInTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    clockOutTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  return Attendance;
};
