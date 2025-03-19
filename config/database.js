const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Brews_Blues', 'root', 'admin', {
    host: 'localhost',
    dialect: 'mysql'
  });
  
  module.exports = sequelize;
  