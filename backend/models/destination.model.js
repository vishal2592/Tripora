const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },

    region: {
      type: String,
      required: true,
      trim: true,
    },
    destinationType: {
      type: String,
      enum: ["Domestic", "International", "Honeymoon", "Adventure", "Luxury"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    packagesCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    hotelsCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    flightsCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    bestTimeToVisit: {
      type: String,
      trim: true,
    },

    image: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },

    highlights: {
      type: [String],
      default: [],
    },

    isPopular: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;
