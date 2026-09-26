const express = require("express");

const router = express.Router();

const {
  createHotelBooking,
  getHotelBookingByBookingId,
  getAllHotelBookings,
  updateHotelBooking,
  cancelHotelBooking,
} = require("../controllers/hotelBooking.controller");

//create hotel booking route
router.post("/", createHotelBooking);
//get all hotel bookings
router.get("/", getAllHotelBookings);
//get hotel booking by id route
router.get("/:bookingId", getHotelBookingByBookingId);
//update hotel booking route
router.put("/:bookingId", updateHotelBooking);
//cancel hotel booking route
router.put("/:bookingId/cancel", cancelHotelBooking);

module.exports = router;
