//const mongoose = require ('mongoose')
const Project = require ('../models/projectModel')


const createProject = async (req,res)=>{
    try {
       const {title,description,techStack,githubLink,liveLink,image} = req.body ;
       if(!title || !description)
        {
        return res.status(400).json({ message: 'Title and description are required' });
       }

       const newProject = new Project({
        title,description,techStack,githubLink,liveLink,image
       });
       await newProject.save();

       res.status(201).json({ message: 'Project created successfully', project: newProject });
    } catch (error) {console.error('Create Project Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
        
    }
}
const getAllProjects = async (req, res) => {
    try {
      const projects = await Project.find().sort({ createdAt: -1 });
      res.status(200).json(projects);
    } catch (error) {
      console.error('Fetch Projects Error:', error);
      res.status(500).json({ message: 'Failed to fetch projects', error: error.message });
    }
  };



module.exports ={createProject,getAllProjects};
