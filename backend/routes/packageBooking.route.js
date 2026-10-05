const express = require("express");
const router = express.Router();
const {
  createPackageBooking,
  getallbookings,
  getMyPackageBooking,
  getSinglePackageBooking,
  cancelPackageBooking,
  adminCancelPackageBooking,
  // deletePackageBooking,
} = require("../controllers/packageBooking.controller");

const adminAuth = require("../middleware/adminAuth.middleware");
const authMiddleware = require("../middleware/auth.middleware");
//get all package booking route
router.get("/", authMiddleware, getMyPackageBooking);
//get single package booking route
router.get("/:id", authMiddleware, getSinglePackageBooking);
//creat package booking route
router.post("/", authMiddleware, createPackageBooking);
// Cancel package booking
router.put("/:id/cancel", authMiddleware, cancelPackageBooking);

// router.delete("/admin/:id", adminAuth, deletePackageBooking);

router.put("/:id/cancel", adminAuth, adminCancelPackageBooking);

module.exports = router;
