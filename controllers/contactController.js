const Contact = require ('../models/contactModel');

const sendContactMessage = async (req,res)=>{
    try {
        const {name,email,subject,message}= req.body ;
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, email, and message are required.' });
          }
          const contact = new Contact({ name, email, subject, message });
          await contact.save();
      
          res.status(201).json({ message: 'Message sent successfully', contact });
        } catch (error) {
          console.error('Contact form error:', error);
          res.status(500).json({ message: 'Failed to send message', error: error.message });
        }
      };

      const getAllContactMessages = async (req, res) => {
        try {
          const messages = await Contact.find().sort({ createdAt: -1 }); 
          res.status(200).json(messages);
        } catch (error) {
          console.error('Fetch Contact Messages Error:', error);
          res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
        }
      };
     
      const markContactAsReplied = async (req, res) => {
        try {
          const { id } = req.params;
      
          const contact = await Contact.findByIdAndUpdate(
            id,
            { isReplied: true },
            { new: true }
          );
      
          if (!contact) {
            return res.status(404).json({ message: 'Contact message not found' });
          }
      
          res.status(200).json({
            message: 'Message marked as replied',
            contact
          });
        } catch (error) {
          console.error('Reply Update Error:', error);
          res.status(500).json({ message: 'Failed to update message', error: error.message });
        }
      };
            


      module.exports = {sendContactMessage ,getAllContactMessages,markContactAsReplied}
   
