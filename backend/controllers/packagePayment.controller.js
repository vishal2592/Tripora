const mongoose = require("mongoose");
const PackageBooking = require("../models/packageBooking.model");
const Payment = require("../models/payment.model");
const razorpay = require("../config/razorpay");
const crypto = require("crypto");

const createPackageRazorpayOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in token",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await PackageBooking.findOne({
      _id: id,
      user: userId,
    });

    console.log("PACKAGE BOOKING:", booking);
    console.log(
      "PACKAGE BOOKING PRICING:",
      booking?.pricing
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Package booking not found",
      });
    }

    if (booking.bookingStatus === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Cancelled booking cannot be paid",
      });
    }

    // Already paid booking ko dobara payment nahi karwana
    if (booking.paymentStatus === "Paid") {
      return res.status(400).json({
        success: false,
        message: "Payment is already completed",
      });
    }

    const totalAmount = booking.pricing.totalAmount;

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking amount",
      });
    }

    const amountInPaise = Math.round(
      totalAmount * 100
    );

    // ==========================================
    // CREATE RAZORPAY ORDER
    // ==========================================

    const razorpayOrder =
      await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: booking.bookingId,

        notes: {
          bookingId: booking.bookingId,
          bookingType: "Package",
          userId: userId.toString(),
        },
      });

    // ==========================================
    // CREATE PAYMENT RECORD
    // ==========================================

    const payment = await Payment.create({
      user: userId,
      booking: booking._id,
      bookingId: booking.bookingId,
      bookingType: "Package",
      razorpayOrderId: razorpayOrder.id,
      amount: totalAmount,
      currency: "INR",
      status: "Created",
    });

    // ==========================================
    // SEND RESPONSE
    // ==========================================

    return res.status(201).json({
      success: true,
      message: "Razorpay order created successfully",

      // IMPORTANT:
      // Sirf PUBLIC Razorpay Key ID frontend ko bhejna hai.
      // Secret key kabhi frontend ko nahi bhejni.
      razorpayKey: process.env.RAZORPAY_KEY_ID,

      order: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        receipt: razorpayOrder.receipt,
      },

      payment: {
        id: payment._id,
        bookingId: payment.bookingId,
        amount: payment.amount,
        status: payment.status,
      },

      // Agar frontend ko booking details chahiye
      // to booking bhi response mein bhej sakte ho.
      booking,
    });
  } catch (error) {
    console.error(
      "Create Package Razorpay Order Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
      error: error.message,
    });
  }
};

const verifyPackageRazorpayPayment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // User ID check
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in token",
      });
    }

    // Booking ID validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    // Required Razorpay fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message:
          "razorpay_order_id, razorpay_payment_id and razorpay_signature are required",
      });
    }

    // Find package booking
    const booking = await PackageBooking.findOne({
      _id: id,
      user: userId,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Package booking not found",
      });
    }

    // Cancelled booking
    if (booking.bookingStatus === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Cancelled booking cannot be paid",
      });
    }

    // Already paid
    if (booking.paymentStatus === "Paid") {
      return res.status(400).json({
        success: false,
        message: "Payment is already completed",
      });
    }

    // Find payment record
    const payment = await Payment.findOne({
      booking: booking._id,
      user: userId,
      bookingType: "Package",
      razorpayOrderId: razorpay_order_id,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found",
      });
    }

    // Create signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // Compare signatures
    if (generatedSignature !== razorpay_signature) {
      payment.status = "Failed";
      payment.failureReason = "Invalid Razorpay signature";
      await payment.save();

      return res.status(400).json({
        success: false,
        message: "Invalid Razorpay payment signature",
      });
    }

    // Payment verified successfully
    payment.razorpayPaymentId = razorpay_payment_id;
    payment.razorpaySignature = razorpay_signature;
    payment.status = "Paid";
    payment.paidAt = new Date();

    await payment.save();

    // Update package booking
    booking.paymentStatus = "Paid";
    booking.bookingStatus = "Confirmed";

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Razorpay payment verified successfully",

      booking: {
        id: booking._id,
        bookingId: booking.bookingId,
        paymentStatus: booking.paymentStatus,
        bookingStatus: booking.bookingStatus,
      },

      payment: {
        id: payment._id,
        razorpayOrderId: payment.razorpayOrderId,
        razorpayPaymentId: payment.razorpayPaymentId,
        status: payment.status,
        paidAt: payment.paidAt,
      },
    });
  } catch (error) {
    console.error("Verify Package Razorpay Payment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to verify Razorpay payment",
      error: error.message,
    });
  }
};

const handlePackagePaymentFailure = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const { razorpay_payment_id, razorpay_order_id, reason } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in token",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await PackageBooking.findOne({
      _id: id,
      user: userId,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Package booking not found",
      });
    }

    const payment = await Payment.findOne({
      booking: booking._id,
      user: userId,
      bookingType: "Package",
      razorpayOrderId: razorpay_order_id,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found",
      });
    }

    // Already paid payment ko failed nahi karna
    if (payment.status === "Paid") {
      return res.status(400).json({
        success: false,
        message: "Paid payment cannot be marked as failed",
      });
    }

    payment.razorpayPaymentId =
      razorpay_payment_id || payment.razorpayPaymentId;

    payment.status = "Failed";

    payment.failureReason = reason || "Razorpay payment failed";

    await payment.save();

    // Booking ko cancelled nahi karna
    // Payment fail hone par booking Pending rahegi
    booking.paymentStatus = "Failed";
    booking.bookingStatus = "Pending";

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Package payment failure recorded successfully",

      booking: {
        id: booking._id,
        bookingId: booking.bookingId,
        paymentStatus: booking.paymentStatus,
        bookingStatus: booking.bookingStatus,
      },

      payment: {
        id: payment._id,
        razorpayOrderId: payment.razorpayOrderId,
        razorpayPaymentId: payment.razorpayPaymentId,
        status: payment.status,
        failureReason: payment.failureReason,
      },
    });
  } catch (error) {
    console.error("Package Payment Failure Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to record payment failure",
      error: error.message,
    });
  }
};

const handleRazorpayWebhook = async (req, res) => {
  try {
    console.log("\n========== RAZORPAY WEBHOOK START ==========");

    // 1. Webhook signature
    const webhookSignature = req.headers["x-razorpay-signature"];

    console.log("Webhook Signature Received:", webhookSignature ? "YES" : "NO");

    if (!webhookSignature) {
      console.log("❌ Webhook signature missing");

      return res.status(400).json({
        success: false,
        message: "Razorpay webhook signature is missing",
      });
    }

    console.log("Webhook Body Is Buffer:", Buffer.isBuffer(req.body));
    console.log(
      "Webhook Secret Loaded:",
      process.env.RAZORPAY_WEBHOOK_SECRET ? "YES" : "NO",
    );
    console.log(
      "Webhook Secret Length:",
      process.env.RAZORPAY_WEBHOOK_SECRET
        ? process.env.RAZORPAY_WEBHOOK_SECRET.length
        : 0,
    );
    // 2. Generate expected signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(req.body)
      .digest("hex");

    console.log("Webhook Signature Verification Started");

    // 3. Verify signature
    if (expectedSignature !== webhookSignature) {
      console.log("❌ Invalid webhook signature");

      return res.status(400).json({
        success: false,
        message: "Invalid Razorpay webhook signature",
      });
    }

    console.log("✅ Webhook signature verified");

    // 4. Parse webhook body
    const event = JSON.parse(req.body.toString());

    console.log("Webhook Event:", event.event);

    // ==========================================
    // PAYMENT FAILED
    // ==========================================

    if (event.event === "payment.failed") {
      const paymentEntity = event.payload?.payment?.entity;

      if (!paymentEntity) {
        console.log("❌ Payment entity missing");

        return res.status(400).json({
          success: false,
          message: "Payment data not found in webhook",
        });
      }

      const razorpayOrderId = paymentEntity.order_id;
      const razorpayPaymentId = paymentEntity.id;

      console.log("Payment Failed Webhook:");
      console.log("Razorpay Order ID:", razorpayOrderId);
      console.log("Razorpay Payment ID:", razorpayPaymentId);

      const payment = await Payment.findOne({
        razorpayOrderId,
        bookingType: "Package",
      });

      if (!payment) {
        console.log("❌ Payment record not found:", razorpayOrderId);

        return res.status(200).json({
          success: true,
          message: "Webhook received but payment record not found",
        });
      }

      if (payment.status === "Paid") {
        console.log("⚠️ Payment already marked as Paid");

        return res.status(200).json({
          success: true,
          message: "Payment is already marked as Paid",
        });
      }

      payment.razorpayPaymentId =
        razorpayPaymentId || payment.razorpayPaymentId;

      payment.status = "Failed";

      payment.failureReason =
        paymentEntity.error_description ||
        paymentEntity.error_reason ||
        "Razorpay payment failed";

      await payment.save();

      await PackageBooking.findByIdAndUpdate(payment.booking, {
        paymentStatus: "Failed",
        bookingStatus: "Pending",
      });

      console.log("❌ Package payment marked as Failed:", payment.bookingId);
    }

    // ==========================================
    // PAYMENT CAPTURED
    // ==========================================

    if (event.event === "payment.captured") {
      const paymentEntity = event.payload?.payment?.entity;

      if (!paymentEntity) {
        console.log("❌ Payment entity missing");

        return res.status(400).json({
          success: false,
          message: "Payment data not found in webhook",
        });
      }

      const razorpayOrderId = paymentEntity.order_id;
      const razorpayPaymentId = paymentEntity.id;

      console.log("Payment Captured Webhook:");
      console.log("Razorpay Order ID:", razorpayOrderId);
      console.log("Razorpay Payment ID:", razorpayPaymentId);

      const payment = await Payment.findOne({
        razorpayOrderId,
        bookingType: "Package",
      });

      if (!payment) {
        console.log("❌ Payment record not found:", razorpayOrderId);

        return res.status(200).json({
          success: true,
          message: "Webhook received but payment record not found",
        });
      }

      console.log("Payment Record Found:");
      console.log("Payment MongoDB ID:", payment._id);
      console.log("Booking ID:", payment.bookingId);
      console.log("Current Payment Status:", payment.status);

      if (payment.status === "Paid") {
        console.log("⚠️ Payment already marked as Paid");

        return res.status(200).json({
          success: true,
          message: "Payment is already marked as Paid",
        });
      }

      payment.razorpayPaymentId =
        razorpayPaymentId || payment.razorpayPaymentId;

      payment.status = "Paid";
      payment.paidAt = new Date();

      await payment.save();

      console.log("✅ Payment MongoDB updated to Paid");

      const updatedBooking = await PackageBooking.findByIdAndUpdate(
        payment.booking,
        {
          paymentStatus: "Paid",
          bookingStatus: "Confirmed",
        },
        { new: true },
      );

      console.log("✅ Package Booking updated:");
      console.log("Booking ID:", payment.bookingId);
      console.log("Payment Status:", updatedBooking?.paymentStatus);
      console.log("Booking Status:", updatedBooking?.bookingStatus);
    }

    console.log("========== RAZORPAY WEBHOOK END ==========\n");

    return res.status(200).json({
      success: true,
      message: "Webhook processed successfully",
    });
  } catch (error) {
    console.error("❌ Razorpay Webhook Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to process Razorpay webhook",
      error: error.message,
    });
  }
};
const confirmPackagePayment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in token",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await PackageBooking.findOne({
      _id: id,
      user: userId,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Package booking not found",
      });
    }

    if (booking.bookingStatus === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Cancelled booking cannot be paid",
      });
    }

    if (booking.paymentStatus === "Paid") {
      return res.status(400).json({
        success: false,
        message: "Payment is already completed",
      });
    }

    booking.paymentStatus = "Paid";
    booking.bookingStatus = "Confirmed";

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Package payment confirmed successfully",
      booking,
    });
  } catch (error) {
    console.error("Confirm Package Payment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to confirm package payment",
      error: error.message,
    });
  }
};

module.exports = {
  confirmPackagePayment,
  createPackageRazorpayOrder,
  verifyPackageRazorpayPayment,
  handlePackagePaymentFailure,
  handleRazorpayWebhook,
};
