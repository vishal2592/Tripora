const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Flight", "Hotel", "Package", "Train", "Bus", "Cab"],
      trim: "true",
    },

    discountType: {
      type: String,
      required: true,
      enum: ["UP TO", "FLAT"],
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },

    couponCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      unique: true,
    },

    image: {
      type: String,
      trim: true,
    },

    imageDeleteUrl: {
      type: String,
      trim: true,
    },
    validFrom: {
      type: Date,
      required: true,
    },

    validUntil: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    usage: {
      type: Number,
      default: 0,
      min: 0,
    },

    limit: {
      type: Number,
      default: 500,
      min: 0,
    },
  },

  { timestamps: true },
);

module.exports = mongoose.model("Offer", offerSchema);
