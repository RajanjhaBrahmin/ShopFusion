const mongoose = require ('mongoose');
const User = require("../models/userModel");
const errrorHandling = require ("../constants/errrorHandling")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const handlebars = require('handlebars');
const crypto = require('crypto');
const fs = require('fs');

const path = require('path');
const sendEmail = require ("../utils/sendEmail")


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
 
const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found with this email' });
      }

      const resetToken = crypto.randomBytes(32).toString('hex');
      user.reset_password_token = resetToken;
      await user.save();
     
      const templatePath = path.join(__dirname, 'templates', 'forgotPasswordEmailTemplate.hbs');
      const templateSource = fs.readFileSync('templates/forgotPasswordEmailTemplate.hbs', 'utf8');
      const template = handlebars.compile(templateSource);

      const imageUrl = 'http://localhost:5000/email-logo.png';
      const resetPasswordLink = `http://localhost:5000/reset-password/${resetToken}`; 

      const emailData = {
          user_first_name: user.first_name,
          resetPasswordLink: resetPasswordLink,
          user_token: resetToken,
          //basecurruntdate: new Date().toISOString(),
          dataUrl: imageUrl
      };

      const emailHtml = template(emailData);

      // Send email
      await sendEmail({
          to: user.email,
          subject: 'Password Reset',
          html: emailHtml
      });

      res.status(200).json({ message: 'Password reset email sent' });

  } catch (error) {
      next(error);
  }
};

const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
      const user = await User.findOne({ reset_password_token: token });

      if (!user) {
          return res.status(400).json({ message: 'Invalid or expired token' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.reset_password_token = null;
      await user.save();

      res.status(200).json({ message: 'Password reset successfully' });

  } catch (error) {
      next(error);
  }
};

module.exports = {registerUser, loginUser,resetPassword,forgotPassword};
  

