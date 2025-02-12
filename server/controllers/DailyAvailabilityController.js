const DailyAvailability = require("../models/DailyAvailability");


exports.setAvailability = async (req, res) => {
  try {
    const { userId, date, isAvailable, startTime, endTime } = req.body;

    
    const today = new Date();
    const selectedDate = new Date(date);
    if (selectedDate < today.setHours(0, 0, 0, 0)) {
      return res.status(400).json({ message: "Cannot select past dates." });
    }

    
    let availability = await DailyAvailability.findOne({ userId, date });

    if (availability) {
      
      availability.isAvailable = isAvailable;
      availability.startTime = startTime;
      availability.endTime = endTime;
    } else {
      
      availability = new DailyAvailability({
        userId,
        date,
        isAvailable,
        startTime,
        endTime,
      });
    }

    await availability.save();
    res.status(200).json({ message: "Availability set successfully", availability });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


exports.getAvailability = async (req, res) => {
  try {
    const { userId } = req.params;
    const availabilities = await DailyAvailability.find({ userId }).sort({ date: 1 });

    res.status(200).json(availabilities);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


exports.deleteAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    await DailyAvailability.findByIdAndDelete(id);
    res.status(200).json({ message: "Availability deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
