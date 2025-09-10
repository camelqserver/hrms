module.exports = (sequelize, DataTypes) => {
  const Settings = sequelize.define("Settings", {
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timezone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    workDays: {
      type: DataTypes.ARRAY(DataTypes.STRING), // e.g. ['Monday', 'Tuesday', ...]
      allowNull: false,
    },
    clockInFrom: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    clockInTo: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  });

  return Settings;
};
