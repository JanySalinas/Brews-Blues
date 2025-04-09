const Sequelize = require('sequelize');

// Hent DATABASE_URL fra miljøvariabelen
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  protocol: 'mysql',
  dialectOptions: {
    useUTC: false, // For tidssonehåndtering
  },
  timezone: 'Etc/GMT+0', // Tidssoneinnstillinger
});

// Test tilkoblingen
sequelize.authenticate()
  .then(() => {
    console.log('Database tilkoblet!');
  })
  .catch((error) => {
    console.error('Kan ikke koble til databasen:', error);
  });

  module.exports = sequelize;