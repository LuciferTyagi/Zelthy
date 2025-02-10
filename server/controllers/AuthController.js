const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Availability = require("../models/Availability");

const registerUser = async (req, res) => {
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({ message: "Username and email are required" });
    }
    
    try {
        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({ message: "Name already registered" });
        }

        const newUser = new User({ username, email });
        await newUser.save();
        console.log(newUser._id)
        const defaultAvailability = {
            userId: newUser._id,
            availability: {
                monday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
                tuesday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
                wednesday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
                thursday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
                friday: { isAvailable: false, startTime: "09:00", endTime: "14:00" },
                saturday: { isAvailable: false, startTime: "09:00", endTime: "18:00" },
                sunday: { isAvailable: false, startTime: "09:00", endTime: "20:00" }
            }
        };
        const newAvailability = new Availability(defaultAvailability);
        await newAvailability.save(); 

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const loginUser = async (req, res) => {
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({ message: "Username and email are required" });
    }

    try {
        const user = await User.findOne({ username, email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate a JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { registerUser, loginUser };
