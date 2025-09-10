// models/Policy.js
module.exports = (sequelize, DataTypes) => {
  const Policy = sequelize.define("Policy", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Policy;
};
