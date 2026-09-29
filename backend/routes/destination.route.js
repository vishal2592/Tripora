const express = require("express");

const router = express.Router();

const {
  createDestination,
  getAllDestination,
  getSingleDestinationById,
  updateDestination,
  deleteDestination,
} = require("../controllers/destination.controller");

const { uploadImage } = require("../middleware/upload.middleware");

const adminAuth = require("../middleware/adminAuth.middleware");

//get all destinations
router.get("/", getAllDestination);
//get signle destination
router.get("/:id", getSingleDestinationById);
//create destination
router.post("/", adminAuth, uploadImage, createDestination);
//update destination
router.put("/:id", adminAuth, uploadImage, updateDestination);
// Delete Destination
router.delete("/:id", adminAuth, deleteDestination);

module.exports = router;
