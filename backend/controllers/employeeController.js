const { Employee } = require('../models');
const bcrypt = require('bcryptjs');

exports.getAll = async (req, res) => {
  const employees = await Employee.findAll();
  res.json(employees);
};

exports.create = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Request body is required' });
    }
    const employeeData = req.body;

    // Validate and parse joiningDate
    if (employeeData.joiningDate) {
      const date = new Date(employeeData.joiningDate);
      if (isNaN(date.getTime())) {
        console.error('Invalid joiningDate provided:', employeeData.joiningDate);
        employeeData.joiningDate = null;
      } else {
        employeeData.joiningDate = date.toISOString().split('T')[0];
      }
    }

    // Hash the password before storing
    if (employeeData.Password) {
      const salt = bcrypt.genSaltSync(10);
      employeeData.Password = bcrypt.hashSync(employeeData.Password, salt);
    }
    const newEmp = await Employee.create(employeeData);
    res.json(newEmp);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Error creating employee' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.body) {
      return res.status(400).json({ message: 'Request body is required' });
    }
    const employeeData = req.body;

    // Validate and parse joiningDate
    if (employeeData.joiningDate) {
      const date = new Date(employeeData.joiningDate);
      if (isNaN(date.getTime())) {
        console.error('Invalid joiningDate provided:', employeeData.joiningDate);
        employeeData.joiningDate = null;
      } else {
        employeeData.joiningDate = date.toISOString().split('T')[0];
      }
    }

    // Hash the password if it's being updated
    if (employeeData && employeeData.Password) {
      const salt = bcrypt.genSaltSync(10);
      employeeData.Password = bcrypt.hashSync(employeeData.Password, salt);
    }

    await Employee.update(employeeData, { where: { id } });
    res.json({ message: "Employee updated successfully" });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Error updating employee' });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await Employee.destroy({ where: { id } });
  res.json({ message: "Employee deleted" });
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({
      where: { employeeId: id }, 
      attributes: { exclude: ['Password'] }
    });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ message: 'Error fetching employee data' });
  }
};
