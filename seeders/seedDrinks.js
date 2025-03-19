const Drinks = require('../models/Drinks'); // Adjusted relative path
const drinksData = require('../data/drinks.json'); // Adjusted relative path

(async () => {
  try {
    console.log('Drinks data:', drinksData);
    await Drinks.sync({ force: true }); // Rebuild table (drops if exists)
    await Drinks.bulkCreate(drinksData); // Bulk insert records from JSON
    console.log('Drinks table seeded.');
    process.exit(); // Exit the script once done
  } catch (error) {
    console.error('Error seeding Drinks table:', error);
    process.exit(1);
  }
})();
