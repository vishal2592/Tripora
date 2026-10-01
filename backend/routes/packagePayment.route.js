const express = require("express");
const router = express.Router();

const {
  createPackageRazorpayOrder,
  verifyPackageRazorpayPayment,
  handlePackagePaymentFailure,
  handleRazorpayWebhook,
  confirmPackagePayment,
} = require("../controllers/packagePayment.controller");

const authMiddleware = require("../middleware/auth.middleware");
router.post("/webhook", handleRazorpayWebhook);
// Create Razorpay order
router.post("/:id/order", authMiddleware, createPackageRazorpayOrder);
router.post("/:id/verify", authMiddleware, verifyPackageRazorpayPayment);
// Confirm package payment

router.post("/:id/failure", authMiddleware, handlePackagePaymentFailure);

router.put("/:id/confirm", authMiddleware, confirmPackagePayment);

module.exports = router;
