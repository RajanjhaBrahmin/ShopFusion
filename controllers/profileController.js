const mongoose = require('mongoose');
const Profile = require ("../models/ProfileModel")

const createProfile = async (req,res,next)=>{
    try {
     const {email } = req.body;
     const existingProfile = await Profile.findOne({email});
     if (existingProfile){
        return res.status(400).json({message: 'Profile already exists with this email'});
     } 
     const profile = new Profile(req.body);
     await profile.save();
     res.status(201).json({message: 'Profile created successfully',
     profile });

    } catch (error) {
        console.error('Create Profile Error:', error);
        res.status(500).json({message:'Server error', error: error.message});
        
    }
};

  const getProfileById = async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ message: 'Invalid Get profile ID' });
      }
      const profile = await Profile.findById(id);
  
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      res.status(200).json(profile);
    } catch (error) {
      console.error('Get Profile by ID Error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
module.exports = {createProfile,getProfileById};



