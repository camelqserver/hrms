module.exports = (sequelize, DataTypes) => {
  const SalaryStructure = sequelize.define("SalaryStructure", {
employeeId: DataTypes.INTEGER,
    name:DataTypes.STRING,
    basic: DataTypes.FLOAT,
    hra: DataTypes.FLOAT,
    conveyance:DataTypes.STRING,
    medicalallowances: DataTypes.FLOAT,
    specialallowances: DataTypes.STRING,
    proftax: DataTypes.FLOAT,
    pf: DataTypes.STRING,
    netSalary: DataTypes.FLOAT,
  });


  return SalaryStructure;
};
