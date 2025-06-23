const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const profileController = require('../controllers/profileController');
const projectController = require('../controllers/projectController');
const contactController = require ('../controllers/contactController')

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/forgot-password',userController.forgotPassword);
router.post('/reset-password/:token', userController.resetPassword);

// USER PROFILE ROUTER //
router.post('/profile',profileController.createProfile);
router.get('/getprofile/:id',profileController.getProfileById);

// Create Project ROUTER //
router.post('/createProject',projectController.createProject);
router.get('/getProject',projectController.getAllProjects);

// CONTACT MESSAGE ROUTER //
router.post('/contact',contactController.sendContactMessage);
router.get ('/contact',contactController.getAllContactMessages);
router.patch('/contact/:id/reply',contactController.markContactAsReplied);


module.exports = router;
