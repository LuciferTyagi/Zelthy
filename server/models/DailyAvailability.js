const mongoose = require("mongoose");

const dailyAvailabilitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true, unique: true }, 
  isAvailable: { type: Boolean, required: true, default: false },
  startTime: { type: String, required: false },
  endTime: { type: String, required: false },
});

const DailyAvailability = mongoose.model("DailyAvailability", dailyAvailabilitySchema);
module.exports = DailyAvailability;
