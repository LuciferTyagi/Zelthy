const express = require("express");
const {
  getAvailability,
  updateAvailability,
  getUserAvailability,
} = require("../controllers/AvailabilityController");
const {protect} = require("../middlewares/AuthMiddleware")

const router = express.Router();

router.get("/myAvailability", protect, getAvailability);
router.put("/update", protect, updateAvailability);
router.get("/:userId", protect, getUserAvailability);

module.exports = router;
