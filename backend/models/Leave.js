module.exports = (sequelize, DataTypes) => {
  const Leave = sequelize.define("Leave", {
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    leaveType: {
      type: DataTypes.STRING, // "Sick", "Casual", "Earned"
      allowNull: false,
    },
    fromDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    toDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING, // Pending, Approved, Rejected
      defaultValue: "Pending",
    }
  });

  return Leave;
};
