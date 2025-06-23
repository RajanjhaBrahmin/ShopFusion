const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const profileController = require('../controllers/profileController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/forgot-password',userController.forgotPassword);
router.post('/reset-password/:token', userController.resetPassword);

// USER PROFILE ROUTER //
router.post('/profile',profileController.createProfile);
router.get('/getprofile/:id',profileController.getProfileById);

module.exports = router;
