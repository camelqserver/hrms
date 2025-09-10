module.exports = (sequelize, DataTypes) => {
  const Notice = sequelize.define("Notice", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return Notice;
};
