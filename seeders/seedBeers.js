const Beers = require('../models/Beers'); // Adjusted relative path
const beersData = require('../data/beers.json'); // Adjusted relative path

(async () => {
  try {
    console.log('Beers data:', beersData);
    await Beers.sync({ force: true }); // Rebuild table (drops if exists)
    await Beers.bulkCreate(beersData); // Bulk insert records from JSON
    console.log('Beers table seeded.');
    process.exit(); // Exit the script once done
  } catch (error) {
    console.error('Error seeding Beers table:', error);
    process.exit(1);
  }
})();


