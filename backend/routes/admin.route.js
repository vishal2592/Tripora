const express = require("express");

const { loginAdmin } = require("../controllers/admin.controller");

const adminAuth = require("../middleware/adminAuth.middleware");
const {
  getAllHotelBookings,
  getHotelBookingByBookingId,
  updateHotelBooking,
  cancelHotelBooking,
} = require("../controllers/hotelBooking.controller");
const router = express.Router();

router.post("/login", loginAdmin);
router.get("/bookings", adminAuth, getAllHotelBookings);
router.get("/bookings/:bookingId", adminAuth, getHotelBookingByBookingId);
router.put("/bookings/:bookingId", adminAuth, updateHotelBooking);
router.put("/bookings/:bookingId/cancel", adminAuth, cancelHotelBooking);
//protected test route
router.get("/profile", adminAuth, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin authentication successful",
    admin: req.admin,
  });
});

module.exports = router;
