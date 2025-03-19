const Mocktails = require('../models/Mocktails');
const mocktailsData = require('../data/mocktails.json');

(async () => {
  try {
    console.log('Mocktails data:', mocktailsData);
    await Mocktails.sync({ force: true }); // Drop and recreate the table
    await Mocktails.bulkCreate(mocktailsData); // Bulk insert records from JSON
    console.log('Mocktails table seeded.');
    process.exit();
  } catch (error) {
    console.error('Error seeding Mocktails table:', error);
    process.exit(1);
  }
})();
