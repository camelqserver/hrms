module.exports = (sequelize, DataTypes) => {
  const Announcement = sequelize.define('Announcement', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Announcement;
};
