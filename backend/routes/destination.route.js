const express = require("express");

const router = express.Router();

const {
  createDestination,
  getAllDestination,
  getSingleDestinationById,
  updateDestination,
  deleteDestination,
} = require("../controllers/destination.controller");

const { uploadHotelImages } = require("../middleware/upload.middleware");

const adminAuth = require("../middleware/adminAuth.middleware");

// Get all destinations
router.get("/", getAllDestination);

// Get single destination
router.get("/:id", getSingleDestinationById);

// Create destination
router.post(
  "/",
  adminAuth,
  uploadHotelImages,
  createDestination
);

// Update destination
router.put(
  "/:id",
  adminAuth,
  uploadHotelImages,
  updateDestination
);

// Delete destination
router.delete(
  "/:id",
  adminAuth,
  deleteDestination
);

module.exports = router;