const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Events = sequelize.define('Events', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  venue: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tickets: {
    type: DataTypes.STRING,
    allowNull: true
  },
  songLink: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ticketsLink: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Events;