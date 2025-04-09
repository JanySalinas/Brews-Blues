const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'Brews_Blues',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || 'admin',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3000,
  }
);

module.exports = sequelize;
  