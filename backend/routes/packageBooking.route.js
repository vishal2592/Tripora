
const express = require("express");

const router = express.Router();

const {
  createPackageBooking,
  getallbookings,
  getMyPackageBooking,
  getSinglePackageBooking,
  cancelPackageBooking,
  adminCancelPackageBooking,
  deletePackageBooking,
} = require("../controllers/packageBooking.controller");

const adminAuth = require("../middleware/adminAuth.middleware");
const authMiddleware = require("../middleware/auth.middleware");

// =====================================================
// GET MY PACKAGE BOOKINGS
// GET /api/package-bookings
// =====================================================

router.get(
  "/",
  authMiddleware,
  getMyPackageBooking
);

// =====================================================
// GET ALL PACKAGE BOOKINGS - ADMIN
// GET /api/package-bookings/all
// IMPORTANT: This must come before /:id
// =====================================================

router.get(
  "/all",
  adminAuth,
  getallbookings
);

// =====================================================
// GET SINGLE PACKAGE BOOKING
// GET /api/package-bookings/:id
// =====================================================

router.get(
  "/:id",
  authMiddleware,
  getSinglePackageBooking
);

// =====================================================
// CREATE PACKAGE BOOKING
// POST /api/package-bookings
// =====================================================

router.post(
  "/",
  authMiddleware,
  createPackageBooking
);

// =====================================================
// CANCEL PACKAGE BOOKING - USER
// PUT /api/package-bookings/:id/cancel
// =====================================================

router.put(
  "/:id/cancel",
  authMiddleware,
  cancelPackageBooking
);

// =====================================================
// CANCEL PACKAGE BOOKING - ADMIN
// PUT /api/package-bookings/admin/:id/cancel
// =====================================================

router.put(
  "/admin/:id/cancel",
  adminAuth,
  adminCancelPackageBooking
);

// =====================================================
// DELETE PACKAGE BOOKING - ADMIN
// DELETE /api/package-bookings/admin/:id
// =====================================================

router.delete(
  "/admin/:id",
  adminAuth,
  deletePackageBooking
);

module.exports = router;

