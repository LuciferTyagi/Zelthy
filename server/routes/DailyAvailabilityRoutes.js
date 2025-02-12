const express = require("express");
const router = express.Router();
const dailyAvailabilityController = require("../controllers/DailyAvailabilityController");


router.post("/", dailyAvailabilityController.setAvailability);


router.get("/:userId", dailyAvailabilityController.getAvailability);


router.delete("/:id", dailyAvailabilityController.deleteAvailability);

module.exports = router;
