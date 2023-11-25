const { Register } = require('../models');

const createUser = async (req, res) => {
  try {
    
    const user = await Register.create(req.body);
    res.status(200).json(user);
    console.log("user registered")
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

module.exports = {
  createUser,
  getAllUsers
};
