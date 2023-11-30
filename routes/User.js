const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserControllers');

// Routes
router.post('/register', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:eventId', userController.getAllUsersByEventId)
router.get('/gender', userController.getAllUsersByGender);
router.get('/tshirtsize', userController.getAllUsersByTshirtSize);
router.get('/free-users', userController.getAllUsersFreeRegistration);
router.get('/paid-users', userController.getAllUsersPaidRegistration);
module.exports = router;