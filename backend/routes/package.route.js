const express = require("express");

const router = express.Router();

const {
  createPackage,
  getAllPackages,
  getSinglePackage,
  updatePackage,
  deletePackage,
} = require("../controllers/package.controller");
const { uploadHotelImages } = require("../middleware/upload.middleware");

const adminAuth = require("../middleware/adminAuth.middleware");

router.post("/", adminAuth, uploadHotelImages, createPackage);
router.get("/", getAllPackages);
router.get("/:id", getSinglePackage);
router.put("/:id", adminAuth, updatePackage);
router.delete("/:id", adminAuth, deletePackage);

module.exports = router;
