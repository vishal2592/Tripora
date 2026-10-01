const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    // User who made the payment
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // MongoDB booking _id
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    // Human readable booking ID
    // Example: TRP1790667763162147
    bookingId: {
      type: String,
      required: true,
      trim: true,
    },

    // Hotel or Package
    bookingType: {
      type: String,
      required: true,
      enum: ["Hotel", "Package"],
    },

    // Razorpay Order ID
    razorpayOrderId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // Razorpay Payment ID
    razorpayPaymentId: {
      type: String,
      trim: true,
    },

    // Razorpay payment signature
    razorpaySignature: {
      type: String,
      trim: true,
    },

    // Payment amount in INR
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "INR",
      uppercase: true,
      trim: true,
    },

    // Payment method returned/selected
    paymentMethod: {
      type: String,
      enum: [
        "UPI",
        "Credit Card",
        "Debit Card",
        "Net Banking",
        "Wallet",
        "Other",
      ],
      default: "Other",
    },

    status: {
      type: String,
      enum: ["Created", "Pending", "Paid", "Failed", "Refunded"],
      default: "Created",
    },

    failureReason: {
      type: String,
      trim: true,
    },

    refundStatus: {
      type: String,
      enum: ["Not Requested", "Pending", "Completed", "Failed"],
      default: "Not Requested",
    },

    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Payment", paymentSchema);
