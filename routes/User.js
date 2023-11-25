const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserControllers');

// Routes
router.post('/register', userController.createUser);
router.get('/', userController.getAllUsers);


module.exports = router;