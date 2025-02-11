const User = require("../models/User");

const getUserProfile = async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select("-__v"); 

      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ error: "Server error while fetching user profile" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

const updateProfilePicture = async (req, res) => {
  try {
      const userId = req.user.id; 
      const profilePicturePath = req.file ? `/uploads/${req.file.filename}` : null;

      if (!profilePicturePath) {
          return res.status(400).json({ message: "No file uploaded" });
      }

      await User.findByIdAndUpdate(userId, { profilePicture: profilePicturePath });

      res.status(200).json({ message: "Profile picture updated successfully", profilePicture: profilePicturePath });
  } catch (error) {
      res.status(500).json({ message: "Server error", error });
  }
};
module.exports = { getAllUsers , updateProfilePicture , getUserProfile};
