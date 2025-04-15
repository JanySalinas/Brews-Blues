const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Events = sequelize.define('events', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
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