const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  timezone: { type: String, required: true, default: "Asia/Kolkata" },
  availability: {
    monday: { isAvailable: Boolean, startTime: String, endTime: String },
    tuesday: { isAvailable: Boolean, startTime: String, endTime: String },
    wednesday: { isAvailable: Boolean, startTime: String, endTime: String },
    thursday: { isAvailable: Boolean, startTime: String, endTime: String },
    friday: { isAvailable: Boolean, startTime: String, endTime: String },
    saturday: { isAvailable: Boolean, startTime: String, endTime: String },
    sunday: { isAvailable: Boolean, startTime: String, endTime: String },
  },
});

const Availability = mongoose.model('Availability' , availabilitySchema)
module.exports = Availability;
