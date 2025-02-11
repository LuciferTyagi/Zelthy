const Availability = require('../models/Availability');

const getAvailability = async (req, res) => {
    try {
      const userId = req.user.id; 
      const availability = await Availability.findOne({ userId });
  
      if (!availability) {
        return res.status(404).json({ error: "Availability not found" });
      }
  
      res.status(200).json({ availability: availability.availability, timezone: availability.timezone });
    } catch (error) {
      res.status(500).json({ error: "Server error while fetching availability" });
    }
  };

  const updateAvailability = async (req, res) => {
    try {
      const userId = req.user.id;
      const { availability , timezone  } = req.body;
  
      const updatedAvailability = await Availability.findOneAndUpdate(
        { userId },
        { availability , timezone  },
        { new: true }
      );
  
      if (!updatedAvailability) {
        return res.status(404).json({ error: "Availability not found" });
      }
  
      res.status(200).json({ message: "Availability updated successfully", availability: updatedAvailability.availability , timezone: updatedAvailability.timezone });
    } catch (error) {
      res.status(500).json({ error: "Server error while updating availability" });
    }
  };

  const getUserAvailability = async (req, res) => {
    try {
      const { userId } = req.params;
      const availability = await Availability.findOne({ userId });
  
      if (!availability) {
        return res.status(404).json({ error: "User's availability not found" });
      }
  
      res.status(200).json({ availability: availability.availability , timezone: availability.timezone  });
    } catch (error) {
      res.status(500).json({ error: "Server error while fetching user's availability" });
    }
  };

  module.exports = {
    getAvailability,
    updateAvailability,
    getUserAvailability,
  };