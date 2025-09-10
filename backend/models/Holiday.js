module.exports = (sequelize, DataTypes) => {
  const Holiday = sequelize.define('Holiday', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  });

  return Holiday;
};
