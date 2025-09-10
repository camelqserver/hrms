module.exports = (sequelize, DataTypes) => {
  const OrganizationSetting = sequelize.define("OrganizationSetting", {
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
    },
    workingDays: {
      type: DataTypes.STRING, // e.g., "Mon,Tue,Wed,Thu,Fri"
    },
    workingHours: {
      type: DataTypes.STRING, // e.g., "09:00-17:00"
    },
    leavePolicy: {
      type: DataTypes.TEXT,
    },
    logoUrl: {
      type: DataTypes.STRING,
    },
  });

  return OrganizationSetting;
};
