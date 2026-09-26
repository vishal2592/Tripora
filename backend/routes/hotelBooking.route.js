const express = require("express");

const router = express.Router();

const {
  createHotelBooking,
  getHotelBookingByBookingId,
  getAllHotelBookings,
} = require("../controllers/hotelBooking.controller");

//create hotel booking route
router.post("/", createHotelBooking);
//get hotel booking by id route
router.get("/:bookingId", getHotelBookingByBookingId);
//get all hotel bookings
router.get("/", getAllHotelBookings);

module.exports = router;
