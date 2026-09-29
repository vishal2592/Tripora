const express = require("express");
const router = express.Router();
const {
  createPackageBooking,
  getMyPackageBooking,
  getSinglePackageBooking,
  cancelPackageBooking,
} = require("../controllers/packageBooking.controller");

const authMiddleware = require("../middleware/auth.middleware");
//get all package booking route
router.get("/", authMiddleware, getMyPackageBooking);
//get single package booking route
router.get("/:id", authMiddleware, getSinglePackageBooking);
//creat package booking route
router.post("/", authMiddleware, createPackageBooking);
// Cancel package booking
router.put("/:id/cancel", authMiddleware, cancelPackageBooking);

module.exports = router;
