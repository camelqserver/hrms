// models/Payslip.js
module.exports = (sequelize, DataTypes) => {
  const Payslip = sequelize.define('Payslip', {
    employeeId: DataTypes.STRING,
    name:DataTypes.STRING,
    joiningDate: DataTypes.STRING,
    designation: DataTypes.STRING,
    department: DataTypes.STRING,
    location: DataTypes.STRING,
    workingdays: DataTypes.STRING,
    lopDays: DataTypes.INTEGER,
    lopamount: DataTypes.INTEGER,
    bankname: DataTypes.STRING,
    bankaccountnumber: DataTypes.STRING,
    month: DataTypes.STRING,
    year: DataTypes.STRING,
    basic: DataTypes.FLOAT,
    da: DataTypes.FLOAT,
    hra: DataTypes.FLOAT,
    conveyance:DataTypes.STRING,
    medicalallowances: DataTypes.FLOAT,
    specialallowances: DataTypes.STRING,
    proftax: DataTypes.FLOAT,
    pf: DataTypes.STRING,
    netSalary: DataTypes.FLOAT,
    pdfUrl: DataTypes.STRING
  });
  return Payslip;
};
