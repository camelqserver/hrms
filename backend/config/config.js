const { Sequelize } = require('sequelize');
require('dotenv').config();

// Use environment variables with fallback to config.json values
const sequelize = new Sequelize(
  process.env.DB_NAME || 'hrms',        // your database name
  process.env.DB_USER || 'postgres',    // your database user
  process.env.DB_PASS || 'Password',    // your database password
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false
  }
);

module.exports = sequelize;
