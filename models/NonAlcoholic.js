const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const NonAlcoholic = sequelize.define('NonAlcoholic', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ingredients: {
        type: DataTypes.JSON,
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
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
});

module.exports = NonAlcoholic;
