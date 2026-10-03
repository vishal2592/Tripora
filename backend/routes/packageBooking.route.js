const express = require("express");
const router = express.Router();
const {
  createPackageBooking,
  getMyPackageBooking,
  getSinglePackageBooking,
  cancelPackageBooking,
  deletePackageBooking,
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
//deletePackageBookin route

router.delete("/:id", adminAuth, deletePackageBooking);

module.exports = router;
