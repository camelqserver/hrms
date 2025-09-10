module.exports = (sequelize, DataTypes) => {
  const Break = sequelize.define('Break', {
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    breakStart: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    breakEnd: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: true,
    },

  });

  return Break;
};
