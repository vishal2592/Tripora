const express = require("express");

const { loginAdmin } = require("../controllers/admin.controller");

const adminAuth = require("../middleware/adminAuth.middleware");
const {
  getAllHotelBookings,
  getHotelBookingByBookingId,
  updateHotelBooking,
  cancelHotelBooking,
} = require("../controllers/hotelBooking.controller");
const {
  getAllPackageBookings,
  getSinglePackageBooking,
  updatePackageBooking,
} = require("../controllers/adminPackageBooking.controller");
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  toggleUserStatus,
  toggleUserVerification,
  deleteUser,
  createUserByAdmin,
} = require("../controllers/adminUser.controller");
const router = express.Router();

router.post("/login", loginAdmin);
router.get("/users", adminAuth, getAllUsers);
router.get("/users/:id", adminAuth, getSingleUser);
router.put("/users/:id", adminAuth, updateUser);
router.put("/users/:id/block", adminAuth, toggleUserStatus);
router.put("/users/:id/status", adminAuth, toggleUserStatus);
router.put("/users/:id/verification", adminAuth, toggleUserVerification);
router.delete("/users/:id", adminAuth, deleteUser);
router.post("/users", adminAuth, createUserByAdmin);
router.get("/bookings", adminAuth, getAllHotelBookings);
router.get("/bookings/:bookingId", adminAuth, getHotelBookingByBookingId);
router.put("/bookings/:bookingId", adminAuth, updateHotelBooking);
router.put("/bookings/:bookingId/cancel", adminAuth, cancelHotelBooking);
// Get all package bookings
router.get("/package-bookings", adminAuth, getAllPackageBookings);
// Get single package booking
router.get("/package-bookings/:id", adminAuth, getSinglePackageBooking);
// Update package booking
router.put("/package-bookings/:id", adminAuth, updatePackageBooking);
//protected test route
router.get("/profile", adminAuth, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin authentication successful",
    admin: req.admin,
  });
});

module.exports = router;
