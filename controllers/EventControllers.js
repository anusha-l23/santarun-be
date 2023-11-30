const {Event} = require("../models");

const selectEvent = async (req, res)=> {
    try {

      const { eventName } = req.body;
      const [event, created] = await Event.findOrCreate({
        where: { eventName },
        defaults: req.body
      });
  
      if (!created) {
        return res.status(400).json({ error: 'Event with this name already exists' });
      }

      res.status(200).json(event);

      
    } catch (error) {
      console.error(error, "error");
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  const getAllEvents = async (req, res)=> {
    try {
      const events = await Event.findAll();
      res.status(200).json(events);
      console.log("Event Fetched...")
      
    } catch (error) {
      console.error(error, "error");
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  module.exports = {
    selectEvent,
    getAllEvents
  };
  