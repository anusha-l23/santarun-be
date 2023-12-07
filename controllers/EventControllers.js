const {Event} = require("../models");

const selectEvent = async (req, res) => {
  try {
    const { eventName } = req.body;


    const existingEvent = await Event.findOne({ where: { eventName } });

    if (!existingEvent) {
      
      const event = await Event.create(req.body);
      res.status(200).json(event);
    } else {
  
      res.status(200).json(existingEvent);
    }
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
  