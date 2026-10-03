const express = require("express");

const router = express.Router();

const {
  createHotelBooking,
  getHotelBookingByBookingId,
  getAllHotelBookings,
  updateHotelBooking,
  cancelHotelBooking,
  adminCancelHotelBooking,
  deleteHotelBooking,

  // Razorpay
  createHotelRazorpayOrder,
  verifyHotelRazorpayPayment,
  handleHotelPaymentFailure,
  handleHotelPaymentWebhook,
} = require("../controllers/hotelBooking.controller");

const adminAuth = require("../middleware/adminAuth.middleware");
const authMiddleware = require("../middleware/auth.middleware");

// ======================================================
// CREATE HOTEL BOOKING - USER
// ======================================================

router.post(
  "/",
  authMiddleware,
  createHotelBooking
);

// ======================================================
// ADMIN HOTEL BOOKING ROUTES
// ======================================================

// Get all hotel bookings - Admin
router.get(
  "/admin/all",
  adminAuth,
  getAllHotelBookings
);

// Cancel any hotel booking - Admin
router.put(
  "/admin/:bookingId/cancel",
  adminAuth,
  adminCancelHotelBooking
);

// Delete hotel booking - Admin
router.delete(
  "/admin/:bookingId",
  adminAuth,
  deleteHotelBooking
);

// ======================================================
// RAZORPAY ROUTES
// ======================================================

// Create Razorpay order
router.post(
  "/:bookingId/order",
  authMiddleware,
  createHotelRazorpayOrder
);

// Verify Razorpay payment
router.post(
  "/:bookingId/verify",
  authMiddleware,
  verifyHotelRazorpayPayment
);

// Handle Razorpay payment failure
router.post(
  "/:bookingId/failure",
  authMiddleware,
  handleHotelPaymentFailure
);

// Razorpay webhook
router.post(
  "/webhook",
  handleHotelPaymentWebhook
);

// ======================================================
// USER HOTEL BOOKING ROUTES
// ======================================================

// Get hotel booking by booking ID
router.get(
  "/:bookingId",
  authMiddleware,
  getHotelBookingByBookingId
);

// Update hotel booking
router.put(
  "/:bookingId",
  authMiddleware,
  updateHotelBooking
);

// Cancel own hotel booking
router.put(
  "/:bookingId/cancel",
  authMiddleware,
  cancelHotelBooking
);

module.exports = router;