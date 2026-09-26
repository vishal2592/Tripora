const express = require("express");

const router = express.Router();

const { getMyBookings } = require("../controllers/myBookings.controller");
const authMiddleware = require("../middleware/auth.middleware");

//get loggedIn user's bookings
router.get("/my-bookings", authMiddleware, getMyBookings);

module.exports = router;
