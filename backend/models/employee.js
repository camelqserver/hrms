module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define("Employee", {
    username: DataTypes.STRING,
    Password: DataTypes.STRING,
    employeeId: DataTypes.STRING,
    employeename: DataTypes.STRING,
    email: DataTypes.STRING,
    designation: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    Location: DataTypes.STRING,
    joiningDate: DataTypes.DATEONLY,
    status: DataTypes.STRING
  });
  return Employee;
};
