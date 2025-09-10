const db = require('../models');
const Role = db.Role;
const UserRole = db.UserRole;

exports.createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const role = await Role.create({ name });
    res.status(201).json(role);
  } catch (err) {
    res.status(500).json({ error: 'Error creating role' });
  }
};

exports.assignRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    await UserRole.create({ userId, roleId });
    res.status(200).json({ message: 'Role assigned successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error assigning role' });
  }
};

exports.getUserRoles = async (req, res) => {
  try {
    const roles = await UserRole.findAll({ where: { userId: req.params.userId } });
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching roles' });
  }
};
