const express = require("express");

const router = express.Router();

const {
  createHotelBooking,
  getHotelBookingByBookingId,
  getAllHotelBookings,
  updateHotelBooking,
  cancelHotelBooking,
  deleteHotelBooking,
  //razorpay
  createHotelRazorpayOrder,
  verifyHotelRazorpayPayment,
  handleHotelPaymentFailure,
  handleHotelPaymentWebhook,
} = require("../controllers/hotelBooking.controller");

const adminAuth = require("../middleware/adminAuth.middleware");
const authMiddleware = require("../middleware/auth.middleware");
//create hotel booking route
router.post("/", authMiddleware, createHotelBooking);
//get all hotel bookings
router.get("/", getAllHotelBookings);

// Razorpay order
router.post("/:bookingId/order", authMiddleware, createHotelRazorpayOrder);
router.post("/:bookingId/verify", authMiddleware, verifyHotelRazorpayPayment);
router.post("/:bookingId/failure", authMiddleware, handleHotelPaymentFailure);

router.post(
  "/webhook",

  handleHotelPaymentWebhook,
);

//get hotel booking by id route
router.get("/:bookingId", authMiddleware, getHotelBookingByBookingId);
//update hotel booking route
router.put("/:bookingId", updateHotelBooking);
//cancel hotel booking route
router.put("/:bookingId/cancel", cancelHotelBooking);
router.delete("/admin/:bookingId", adminAuth, deleteHotelBooking);

module.exports = router;
