const { Register } = require('../models');
const { Event } = require("../models")
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");
const acountSid = "ACe79385ef5aff258d5b49a5b139c827c7";
const authToken = "4318e98c16d5c3136313145a7e8a2c3b";
const client = require("twilio")(acountSid, authToken);

const createUser = async (req, res) => {
  try {

    const event = await Event.findOne();
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'anusha.lakkakula2022@gmail.com',
        pass: 'iutvtpzrnkkcfoqd'
      }
    });

    const sendMail = (recipientEmail, message) => {
      const mailOptions = {
        from: 'santarun2023.rcck@gmail.com',
        to: recipientEmail,
        subject: "Registration successful",
        text: message
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email: ", error)
        }
        else {
          console.log("Email sent: ", info.response)
        }
      })
    };

    const addCountryCode = (phoneNumber) => {
      const countryCode = "91"
      if (!phoneNumber.startsWith("+")) {
        return `whatsapp:+91${phoneNumber}`;
      }
    }
    const addCountryCodeForText = (phoneNumber) => {
      const countryCode = "91"
      if (!phoneNumber.startsWith("+")) {
        return `+91${phoneNumber}`;
      }
    }

    const sendWatsappMsg = async (recipientNumber, message) => {
      try {
        const formattedRecipientNumber = addCountryCode(recipientNumber);
        const response = await client.messages.create({
          from: "whatsapp:+14155238886",
          body: message,
          to: formattedRecipientNumber
        });
        console.log("Watsapp message sent: ", response.sid);
      } catch (error) {
        console.log("Error sending watsapp message: ", error);
      }
    }
    const sendTextMsg = async (recipientNumber, message) => {
      try {
        const formattedRecipientNumber = addCountryCodeForText(recipientNumber);
        const response = await client.messages.create({
          from: "+12058392432",
          body: message,
          to: formattedRecipientNumber
        });
        console.log("Text message sent: ", response.sid);
      } catch (error) {
        console.log("Error sending text message: ", error);
      }
    }
    const user = await Register.create(req.body);

    res.status(200).json(user);
    console.log("User registered");
    const successfulMessage = "Thank you for registering...";
    sendMail(user.email, successfulMessage);
    sendWatsappMsg(user.mobileNumber, successfulMessage);
    sendTextMsg(user.mobileNumber, successfulMessage)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await Register.findAll();
    res.status(200).json(users);
    console.log("users fetched...")

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getAllUsersByEventId = async (req, res) => {
  try {
    const { eventId } = req.params;
    const users = await Register.findAll({ where: { eventId } });
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

const getAllUsersByTshirtSize = async (req, res) => {

  try {
    const { tShirtSize } = req.query;
    const users = await Register.findAll({ where: { tShirtSize } })
    res.status(200).json(users);

    console.log(users, "tshirt")
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getAllUsersFreeRegistration = async (req, res) => {
  try {
    const users = await Register.findAll({
      where: {
        dateOfBirth: {
          [Op.lte]: new Date(new Date() - 1000 * 60 * 60 * 24 * 365 * 65)
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

const getAllUsersPaidRegistration = async (req, res) => {
  try {
    const users = await Register.findAll({
      where: {
        dateOfBirth: {
          [Op.gt]: new Date(new Date() - 1000 * 60 * 60 * 24 * 365 * 65)
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
