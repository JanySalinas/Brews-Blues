
const NonAlcoholic = require('../models/nonAlcoholic');
const nonAlcoholicData = require('../data/nonAlcoholic.json');

(async () => {
  try {
    console.log('NonAlcoholic data:', nonAlcoholicData);
    await NonAlcoholic.sync({ force: true }); // Drop and recreate the table
    await NonAlcoholic.bulkCreate(nonAlcoholicData);
    console.log('NonAlcoholic table seeded.');
    process.exit();
  } catch (error) {
    console.error('Error seeding NonAlcoholic table:', error);
    process.exit(1);
  }
})();
