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

//get all hotels route
router.get("/", getAllHotels);
//get single hotel route
router.get("/:id", getSignleHotel);
//create hotel route
router.post("/", adminAuth, createHotel);
//update hotel route
router.put("/:id", adminAuth, updateHotel);
//delete hotel route
router.delete("/:id", adminAuth, deleteHotel);

module.exports = router;
