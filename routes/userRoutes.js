const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/forgot-password',userController.forgotPassword);
router.post('/reset-password/:token', userController.resetPassword);
module.exports = router;
