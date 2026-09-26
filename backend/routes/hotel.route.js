const express = require("express");

const router = express.Router();

const {
  createHotel,
  getAllHotels,
  getSignleHotel,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotel.controller");
const adminAuth = require("../middleware/adminAuth.middleware");
const { uploadHotelImages } = require("../middleware/upload.middleware");
//get all hotels route
router.get("/", getAllHotels);
//get single hotel route
router.get("/:id", getSignleHotel);
//create hotel route
router.post("/", adminAuth, uploadHotelImages, createHotel);
//update hotel route
router.put("/:id", adminAuth, uploadHotelImages, updateHotel);
//delete hotel route
router.delete("/:id", adminAuth, deleteHotel);

module.exports = router;
