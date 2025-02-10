const express = require("express");
const { getAllUsers } = require("../controllers/UserController");

const router = express.Router();

router.get("/allusers", getAllUsers);

module.exports = router;
