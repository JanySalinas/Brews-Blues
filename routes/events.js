const express = require("express");
const router = express.Router();
const Events = require("../models/Events");

// GET all events from the database
router.get("/", async (req, res) => {
  try {
    const events = await Events.findAll();
    res.render("events", { events });
  } catch (error) {
    console.error("Error retrieving events:", error);
    res.status(500).send("Database error while fetching events.");
  }
});

// GET a single event from the database by id
router.get("/:id", async (req, res) => {
  try {
    const event = await Events.findByPk(parseInt(req.params.id, 10));
    if (!event) return res.status(404).send("Event not found");
    res.render("eventDetail", { event });
  } catch (error) {
    console.error("Error retrieving event:", error);
    res.status(500).send("Database error while fetching event details.");
  }
});

module.exports = router;
