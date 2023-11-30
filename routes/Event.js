const express = require('express');
const router = express.Router();
const eventController = require("../controllers/EventControllers");
// Routes
router.post('/event', eventController.selectEvent);
router.get('/events', eventController.getAllEvents);

module.exports = router;