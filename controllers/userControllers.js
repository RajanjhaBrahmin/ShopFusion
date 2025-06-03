const mongoose = require ('mongoose');
const User = require("../models/userModel");
const errorHandler = require ("../constants/errrorHandling")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res, next) => {
    try {
      const { first_name, last_name, email, password, role } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        const error = new Error('User already exists');
        error.statusCode = 400;
        return next(error); 
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        role,
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
     
    } catch (error) {
      next(error); 
    }
  };

const loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        const error = new Error('Invalid email or password');
        error.statusCode = 400;
        return next(error);
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        const error = new Error('Invalid email or password');
        error.statusCode = 400;
        return next(error);
      }
  
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET || 'your_secret_key',
        { expiresIn: '1d' }
      );
  
      user.user_token = token;
      await user.save();
  
      res.json({ message: 'Login successful', token });
  
    } catch (error) {
      next(error); 
    }
  };
  

module.exports = {registerUser, loginUser};
  

