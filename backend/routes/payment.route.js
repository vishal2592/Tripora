const express = require("express");

const router = express.Router();

const { getAllPayments } = require("../controllers/payment.controller");

const adminAuth = require("../middleware/adminAuth.middleware");

// Get all payments - Admin
router.get("/admin/all", adminAuth, getAllPayments);

module.exports = router;
