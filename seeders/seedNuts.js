const Nuts = require('../models/Nuts'); // Adjusted relative path
const nutsData = require('../data/nuts.json'); // Adjusted relative path

(async () => {
  try {
    await Nuts.sync({ force: true }); // Rebuild table (drops if already exists)
    await Nuts.bulkCreate(nutsData); // Bulk insert records from JSON
    console.log('Nuts table seeded.');
    process.exit(); // Exit the script once done
  } catch (error) {
    console.error('Error seeding Nuts table:', error);
    process.exit(1);
  }
})();