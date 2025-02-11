const express = require("express");
const { getAllUsers , updateProfilePicture ,getUserProfile } = require("../controllers/UserController");
const {protect} = require('../middlewares/AuthMiddleware');
const upload = require('../middlewares/UploadMiddleware');

const router = express.Router();

router.get("/me", protect, getUserProfile);
router.get("/allusers", getAllUsers);
router.put('/uploadProfilePicture', protect, upload.single('profilePicture'), updateProfilePicture);

module.exports = router;
