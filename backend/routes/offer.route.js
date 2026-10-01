const express = require("express");

const router = express.Router();

const {
  createOffer,
  getAllOffers,
  getClientOffers,
  getSingleOffer,
  updateOffer,
  deleteOffer,
  toggleOfferStatus,
  toggleOfferFeatured,
} = require("../controllers/offer.controller");

const adminAuth = require("../middleware/adminAuth.middleware");
const { uploadImage } = require("../middleware/upload.middleware");

//get client offer
router.get("/client", getClientOffers);
//get all offers
router.get("/", getAllOffers);
// get single offer
router.get("/:id", getSingleOffer);
//create offer
router.post("/", adminAuth, uploadImage, createOffer);
//update offer
router.put("/:id", adminAuth, uploadImage, updateOffer);
router.delete("/:id", adminAuth, deleteOffer);
// Toggle Offer Status
router.put("/:id/status", adminAuth, toggleOfferStatus);
router.put("/:id/featured", adminAuth, toggleOfferFeatured);

module.exports = router;
