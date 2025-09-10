module.exports = (sequelize, DataTypes) => {
  const AppSetting = sequelize.define("AppSetting", {
    timeZone: {
      type: DataTypes.STRING,
      defaultValue: "Asia/Kolkata"
    },
    language: {
      type: DataTypes.STRING,
      defaultValue: "en"
    },
    notificationsEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    theme: {
      type: DataTypes.STRING,
      defaultValue: "light"
    }
  });

  return AppSetting;
};
