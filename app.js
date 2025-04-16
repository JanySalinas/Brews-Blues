require('dotenv').config();
const express = require('express');
 const session = require('express-session');
const eventsrouter = require('./routes/events');
const Reservation = require('./models/Reservation');
const Contact = require('./models/Contact');
const app = express();
const sequelize = require('./config/database');

//import all models so they are registered with sequelize 
const Nuts = require('./models/Nuts');
const Drinks = require('./models/Drinks');
const Beers = require('./models/Beers');
const NonAlcoholic = require('./models/NonAlcoholic');
const Mocktails = require('./models/Mocktails');

app.set('view engine', 'ejs');

// Middleware to parse URL- encoded and JSOn boodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session middleware
app.use(session({
  secret: 'Hello', // change this in production!
  resave: false,
  saveUninitialized: false
}));

app.use(express.static('public'));
app.use("/events", eventsrouter);


NonAlcoholic.sync().then(() => {
  console.log('NonAlcoholic table synced');
});

// Example: Sync all tables together
sequelize.sync().then(() => {
  console.log('Database synced');
});

// Hard-coded credentials (for example only)
const adminUsername = 'admin';
const adminPassword = 'password';

// Show admin login page
app.get('/admin/login', (req, res) => {
  res.render('adminLogin');
});

// Process admin login
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === adminUsername && password === adminPassword) {
    req.session.admin = true; // Mark admin as logged in
    res.redirect('/admin');
  } else {
    res.send('Invalid credentials');
  }
});

// Middleware to protect admin routes
function ensureAdmin(req, res, next) {
  if (req.session && req.session.admin) {
    next();
  } else {
    res.redirect('/admin/login');
  }
}

// Admin dashboard route
app.get('/admin', ensureAdmin, (req, res) => {
  res.render('adminDashboard'); // Create a simple dashboard view
});

//redirect
app.get('/', (req, res) => {
  res.redirect('/drinks');
}); 


app.get('/drinks', async (req, res) => {
  try {
    const drinksData = await Drinks.findAll();
    const beersData = await Beers.findAll();
    const nutsData = await Nuts.findAll();
    const nonAlcoholicData = await NonAlcoholic.findAll();
    const mocktailsData = await Mocktails.findAll();
    
    res.render('index', { 
      drinks: drinksData, 
      beers: beersData, 
      nonAlcoholic: nonAlcoholicData, 
      mocktails: mocktailsData, 
      nuts: nutsData
    });
  } catch (error) {
    console.error('Error retrieving drinks data:', error);
    res.status(500).send("Database error while fetching drinks.");
  }
});

app.get('/menu', async (req, res) => {
  try {
    const drinksData = await Drinks.findAll();
    const beersData = await Beers.findAll();
    const nutsData = await Nuts.findAll();
    const nonAlcoholicData = await NonAlcoholic.findAll();
    const mocktailsData = await Mocktails.findAll();
    console.log(drinksData);
    
    res.render('menu', { 
      drinks: drinksData, 
      beers: beersData, 
      nonAlcoholic: nonAlcoholicData, 
      mocktails: mocktailsData, 
      nuts: nutsData 
    });
  } catch (error) {
    console.error('Error fetching menu data:', error);
    res.status(500).send("Database error while fetching menu data.");
  }
 
  
});

app.get('/drinks', async (req, res) => {
  try {
    // Query the database using your models
    const drinksData = await Drinks.findAll();
    const beersData = await Beers.findAll();
    const nutsData = await Nuts.findAll();

    res.render('index', { drinks: drinksData, beers: beersData, nonAlcoholic, mocktails, nuts: nutsData, });
  } catch (error) {
    console.error('Error retrieving drinks data:', error);
    res.status(500).send("Database error while fetching drinks.");
  }
});

// Drinks detail route
app.get('/drinks/:id', async (req, res) => {
  try {
    const drinkId = parseInt(req.params.id, 10);
    const drink = await Drinks.findByPk(drinkId);
    if (!drink) {
      return res.status(404).send("Drink not found");
    }
    res.render('detail', { drink });
  } catch (error) {
    console.error('Error retrieving drink:', error);
    res.status(500).send("Database error while fetching drink details.");
  }
});

// Beer detail route
app.get('/beers/:id', async (req, res) => {
  try {
    const beer = await Beers.findByPk(parseInt(req.params.id, 10));
    if (!beer) return res.status(404).send("Beer not found");
    res.render('beerDetail', { beer });
  } catch (error) {
    console.error('Error retrieving beer:', error);
    res.status(500).send("Database error while fetching beer details.");
  }
});

// Route to list all non-alcoholic drinks 
app.get('/nonalcoholic', async (req, res) => {
  try {
    const nonAlcoholicData = await NonAlcoholic.findAll();
    res.render('nonalcoholic', { nonAlcoholic: nonAlcoholicData });
  } catch (error) {
    console.error('Error retrieving non-alcoholic drinks:', error);
    res.status(500).send("Database error while fetching non-alcoholic drinks.");
  }
});

// Non-alcoholic drink detail route
app.get('/nonalcoholic/:id', async (req, res) => {
  try {
    const na = await NonAlcoholic.findByPk(parseInt(req.params.id, 10));
    if (!na) return res.status(404).send("Non-alcoholic drink not found");
    res.render('nonalcoholicDetail', { na });
  } catch (error) {
    console.error('Error retrieving non-alcoholic drink:', error);
    res.status(500).send("Database error while fetching non-alcoholic drink details.");
  }
});

// Route to list all mocktails (create a corresponding view mocktails.ejs if needed)
app.get('/mocktails', async (req, res) => {
  try {
    const mocktailsData = await Mocktails.findAll();
    res.render('mocktails', { mocktails: mocktailsData });
  } catch (error) {
    console.error('Error retrieving mocktails:', error);
    res.status(500).send("Database error while fetching mocktails.");
  }
});

// Mocktail drink detail route
app.get('/mocktails/:id', async (req, res) => {
  try {
    const mocktail = await Mocktails.findByPk(parseInt(req.params.id, 10));
    if (!mocktail) return res.status(404).send("Mocktail not found");
    res.render('mocktailsDetail', { mocktail });
  } catch (error) {
    console.error('Error retrieving mocktail:', error);
    res.status(500).send("Database error while fetching mocktail details.");
  }
});

//ROUTES FOR RESERVATION//-->
//other routes 
app.get('/reservations', (req, res) => {
  res.render('reservation'); 
});
// POST route for reservations
app.post('/reservations', async (req, res) => {
  try {
    // Create a new reservation record from form data
    await Reservation.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      reservationTime: req.body.reservationTime,
      guests: req.body.guests
    });
    res.redirect('/reservations-confirmation'); // or send JSON response
  } catch (error) {
    console.error('Error saving reservation:', error);
    res.status(500).send("Error saving reservation.");
  }
});

// And update the GET route:
app.get('/reservations-confirmation', (req, res) => {
  res.render('reservationConfirmation');
});
//ROUTES FOR RESERVATION <---


//POST ROUTE CONTACT//-->

// Contact page route
app.get('/contact', (req, res) => {
  res.render('contact');
});

// POST route for contact
app.post('/contact', async (req, res) => {
  try {
    // Save contact message into the database
    await Contact.create({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    });
    res.redirect('/contact-confirmation'); // or send JSON response
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).send("Error saving contact message.");
  }
});
//POSTROUTE <---

//ROUTE FOR RESERVATIONS//
// Admin route to view all reservations
app.get('/admin/reservations', ensureAdmin, async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.render('adminReservations', { reservations });
  } catch (error) {
    console.error('Error retrieving reservations:', error);
    res.status(500).send("Database error while fetching reservations.");
  }
});

app.post('/reservations', async (req, res) => {
  try {
    await Reservation.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      reservationTime: req.body.reservationTime,
      guests: req.body.guests
    });
    // Consistent redirect URL:
    res.redirect('/reservation-confirmation');
  } catch (error) {
    console.error('Error saving reservation:', error);
    res.status(500).send("Error saving reservation.");
  }
});

// Delete reservation route
app.post('/admin/reservations/:id/delete', ensureAdmin, async (req, res) => {
  try {
    await Reservation.destroy({
      where: { id: req.params.id }
    });
    res.redirect('/admin/reservations');
  } catch (error) {
    console.error('Error deleting reservation:', error);
    res.status(500).send("Error deleting reservation.");
  }
});


app.get('/reservation-confirmation', (req, res) => {
  res.render('reservationConfirmation');
});

//ROUTE FOR CONTACT//

// Admin route to view all contacts
app.get('/admin/contacts', ensureAdmin, async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.render('adminContact', { contacts }); // Note: matches file name "adminContact.ejs"
  } catch (error) {
    console.error('Error retrieving contacts:', error);
    res.status(500).send("Database error while fetching contacts.");
  }
});

app.post('/contact', async (req, res) => {
  try {
    // Save contact message (using your Contact model)
    await Contact.create({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    });
    res.redirect('/contact-confirmation');
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).send("Error saving contact message.");
  }
});

// Delete contact route
app.post('/admin/contacts/:id/delete', ensureAdmin, async (req, res) => {
  try {
    await Contact.destroy({
      where: { id: req.params.id }
    });
    res.redirect('/admin/contacts');
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).send("Error deleting contact.");
  }
});

//Reply for the contacts
app.post('/admin/contacts/:id/reply', (req, res) => {
  const contactId = req.params.id;
  const replyMessage = req.body.reply;

  // Process the reply. For example, send an email or update the database.
  // Example: sendEmailToContact(contactId, replyMessage);

  // After processing, redirect back to the contacts view.
  res.redirect('/admin/contacts');
});

//ROUTE FOR ADMIN//

// Logout route for admin
app.get('/admin/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

// GET route for confirmation page
app.get('/contact-confirmation', (req, res) => {
  res.render('contactConfirmation');
});

// ... existing routes ...
app.get('/about', (req, res) => {
  res.render('about');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
