'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// Use the application config instead of config.json
const sequelizeConfig = require('../config/config');

const db = {};

// Use the application configuration
const sequelize = sequelizeConfig;

// Dynamically load all model files
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Add model associations if defined
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Manual association for Role <-> User through UserRole
if (db.User && db.Role && db.UserRole) {
  db.User.belongsToMany(db.Role, {
    through: db.UserRole,
    foreignKey: 'userId',
    otherKey: 'roleId',
  });

  db.Role.belongsToMany(db.User, {
    through: db.UserRole,
    foreignKey: 'roleId',
    otherKey: 'userId',
  });
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
