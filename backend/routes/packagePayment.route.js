const express = require("express");
const router = express.Router();

const {
  confirmPackagePayment,
} = require("../controllers/packagePayment.controller");

const authMiddleware = require("../middleware/auth.middleware");

// Confirm package payment
router.put("/:id/confirm", authMiddleware, confirmPackagePayment);

module.exports = router;
