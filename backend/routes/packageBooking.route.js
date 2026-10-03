const express = require("express");
const router = express.Router();
const {
  createPackageBooking,
  getallbookings,
  getMyPackageBooking,
  getSinglePackageBooking,
  cancelPackageBooking,
  adminCancelPackageBooking,
} = require("../controllers/packageBooking.controller");

const adminAuth = require("../middleware/adminAuth.middleware");
const authMiddleware = require("../middleware/auth.middleware");
//get all package booking route
router.get("/", authMiddleware, getMyPackageBooking);

router.get("/all",  getallbookings);
//get single package booking route
router.get("/:id", authMiddleware, getSinglePackageBooking);
//creat package booking route
router.post("/", authMiddleware, createPackageBooking);
// Cancel package booking
router.put("/:id/cancel", authMiddleware, cancelPackageBooking);

router.put(
  "/admin/:id/cancel",
  authMiddleware,
  adminCancelPackageBooking
);

module.exports = router;
