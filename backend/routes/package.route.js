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

// CREATE PACKAGE
router.post("/", adminAuth, uploadHotelImages, createPackage);

// GET ALL PACKAGES
router.get("/", getAllPackages);

// GET SINGLE PACKAGE
router.get("/:id", getSinglePackage);

// UPDATE PACKAGE
router.put("/:id", adminAuth, uploadHotelImages, updatePackage);

// DELETE PACKAGE
router.delete("/:id", adminAuth, deletePackage);

module.exports = router;