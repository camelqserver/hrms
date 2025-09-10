module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: { 
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        len: [6, 255]
      }
    },
    role: { 
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        isIn: [['EMPLOYEE', 'HR']]
      }
    },
    resetToken: { type: DataTypes.STRING, allowNull: true },
    resetTokenExpiry: { type: DataTypes.DATE, allowNull: true },
  });
  return User;
};
