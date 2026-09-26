const express = require("express");

const router = express.Router();

const {
  saveHotel,
  getSavedHotels,
  removeSavedHotel,
} = require("../controllers/savedHotel.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.get("/", authMiddleware, getSavedHotels);
router.post("/:hotelId", authMiddleware, saveHotel);
router.delete("/:hotelId", authMiddleware, removeSavedHotel);

module.exports = router;
