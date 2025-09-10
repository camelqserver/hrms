module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define("Feedback", {
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Submitted" // Submitted, In Progress, Resolved
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  return Feedback;
};
