const { default: mongoose } = require('mongoose');
const Room = require('../models/Room');

const makeRoom = async (req, res) => {
    const { doctor } = req.body;
  
    try {
      // Create a new room
      const room = new Room();
      
      // Add the doctor to the users array
      room.users.push(doctor);
  
      // Save the room to the database
      await room.save();
  
      return res.status(201).json({ success: true, room: room._id});
    } catch (error) {
      console.error('Error creating room:', error);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };

module.exports = {
    makeRoom
}