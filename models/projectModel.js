const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  techStack: {
    type: [String], // e.g., ["React", "Node.js", "MongoDB"]
    default: []
  },
  githubLink: {
    type: String
  },
  liveLink: {
    type: String
  },
  image: {
    type: String 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);
