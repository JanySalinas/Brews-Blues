const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Nuts = sequelize.define('nuts', {
  name: DataTypes.STRING,
  ingredients: DataTypes.JSON,
  description: DataTypes.TEXT,
  price: DataTypes.DECIMAL,
  // Add more columns as needed
});

module.exports = Nuts;