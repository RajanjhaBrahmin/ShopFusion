const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String, 
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  location: {
    type: String,
  },
  website: {
    type: String,
  },
  github: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  facebook:{
   type: String,
  },
  instagram:{
    type : String,
  },
  skills: {
    type: [String], // e.g., ["React", "Node.js", "MongoDB"]
    default: [],
  },
  experience: [
    {
      company: String,
      role: String,
      duration: String,
      description: String,
    }
  ],
  education: [
    {
      institute: String,
      degree: String,
      duration: String,
      description: String,
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Profile', profileSchema);
