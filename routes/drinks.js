const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Path to the drinks data file
const drinksPath = path.join(__dirname, '../data/drinks.json');

// GET /drinks
router.get('/', (req, res) => {
    const drinks = JSON.parse(fs.readFileSync(drinksPath));
    res.json(drinks);
});

// GET /drinks/:id
router.get('/:id', (req, res) => {
    const drinks = JSON.parse(fs.readFileSync(drinksPath));
    const drink = drinks.find(d => d.id === parseInt(req.params.id));
    if (!drink) return res.status(404).send('Drink not found');
    res.json(drink);
});

// POST /drinks
router.post('/', (req, res) => {
    const drinks = JSON.parse(fs.readFileSync(drinksPath));
    const newDrink = {
        id: drinks.length + 1,
        name: req.body.name,
        ingredients: req.body.ingredients,
        description: req.body.description
    };
    drinks.push(newDrink);
    fs.writeFileSync(drinksPath, JSON.stringify(drinks, null, 2));
    res.json(newDrink);
});

// DELETE /drinks/:id
router.delete('/:id', (req, res) => {
    let drinks = JSON.parse(fs.readFileSync(drinksPath));
    drinks = drinks.filter(d => d.id !== parseInt(req.params.id));
    fs.writeFileSync(drinksPath, JSON.stringify(drinks, null, 2));
    res.sendStatus(204); // No content response
});

// GET /drinks/:id - Show details for a specific drink
router.get('/:id', (req, res) => {
    const drinks = JSON.parse(fs.readFileSync(drinksPath));
    const drink = drinks.find(d => d.id === parseInt(req.params.id));
    if (!drink) return res.status(404).send('Drink not found');
    
    res.render('drinkDetail', { drink: drink });
});

module.exports = router;
