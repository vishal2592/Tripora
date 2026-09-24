const express = require("express");

const router = express.Router();

const {
  createDestination,
  getAllDestination,
  getSingleDestinationById,
  updateDestination,
} = require("../controllers/destination.controller");

const adminAuth = require("../middleware/adminAuth.middleware");

//get all destinations
router.get("/", getAllDestination);
//get signle destination
router.get("/:id", getSingleDestinationById);
//create destination
router.post("/", adminAuth, createDestination);
//update destination
router.put("/:id", adminAuth, updateDestination);

module.exports = router;
