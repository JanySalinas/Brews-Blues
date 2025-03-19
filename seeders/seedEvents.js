const Events = require('../models/Events');
const eventsData = require('../data/events.json');

(async () => {
  try {
    console.log('Events data:', eventsData);
    await Events.sync({ force: true }); // Drop and recreate the table
    await Events.bulkCreate(eventsData);
    console.log('Events table seeded.');
    process.exit();
  } catch (error) {
    console.error('Error seeding Events table:', error);
    process.exit(1);
  }
})();
