const { Register } = require('../models');
const {Event} = require("../models") 
const {Op} = require("sequelize");

// const createUser = async (req, res) => {
//   try {

//     const event = await Event.findOne({where: {eventName}});

//     if (!event) {
//       return res.status(404).json({ error: 'Event not found' });
//     }



//     const user = await Register.create({
//       firstName:req.body.firstName,
//   lastName:req.body.lastName,
//   email:req.body.email,
//   mobileNumber:req.body.mobileNumber,
//   gender:req.body.gender,
//   dateOfBirth:req.body.dateOfBirth,
//   tShirtSize:req.body.tShirtSize,
//   nameOfTheBib:req.body.nameOfTheBib,
//   bloodGroup:req.body.bloodGroup,
//   contactName:req.body.contactName,
//   contactNumber:req.body.contactNumber,
//   acceptedTerms:req.body.acceptedTerms,
//   eventId:event.id
//     });
   
  
//     res.status(200).json(user);
//     console.log("user registered")
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

const createUser = async (req, res) => {
  try {
    const { eventName, ...userData } = req.body; 

    const event = await Event.findOne({ where: { eventName } });
console.log(eventName, "eventName")
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const user = await Register.create({
      ...userData, 
      eventId: event.id,
    });

    res.status(200).json(user);
    console.log("User registered");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllUsers = async (req, res)=> {
  try {
    const users = await Register.findAll();
    res.status(200).json(users);
    console.log("users fetched...")
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getAllUsersByEventId = async (req, res)=> {
  try {
    const {eventId} = req.params;
    const users = await Register.findAll({where: {eventId}});
    res.status(200).json(users);
    console.log("users fetched...")
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



const getAllUsersByGender = async (req, res) => {
  try {
    const { gender } = req.query;

    if (!gender) {
      return res.status(400).json({ error: 'Gender parameter is missing' });
    }

    const users = await Register.findAll({ where: { gender } });

    res.status(200).json(users);
    console.log("Users fetched...");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllUsersByTshirtSize = async(req, res)=>{

  try {
 const { tShirtSize } = req.query;
 const users = await Register.findAll({where: {tShirtSize} })   
 res.status(200).json(users);

 console.log(users, "tshirt")
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getAllUsersFreeRegistration = async (req, res)=> {
  try {
    const users = await Register.findAll({where:{
      dateOfBirth: {
        [Op.lte]: new Date(new Date() - 1000*60*60*24*365*65)
      }
    }});
    res.status(200).json(users);
    console.log("users fetched...")
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getAllUsersPaidRegistration = async (req, res)=> {
  try {
    const users = await Register.findAll({
      where:{
        dateOfBirth: {
          [Op.gt]: new Date(new Date() - 1000*60*60*24*365*65)
        }
      }
    });
    res.status(200).json(users);
    console.log("users fetched...")
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {
  createUser,
  getAllUsers,
  getAllUsersByEventId,
  getAllUsersByGender,
  getAllUsersByTshirtSize,
  getAllUsersFreeRegistration,
  getAllUsersPaidRegistration
};
