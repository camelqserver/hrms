module.exports = (sequelize, DataTypes) => {
  const Payroll = sequelize.define("Payroll", {
    periodName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    payDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  return Payroll;
};
