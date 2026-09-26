const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    hotelName: {
      type: String,
      required: true,
      trim: true,
    },

    propertyType: {
      type: String,
      required: true,
      enum: ["Hotel", "Villa", "Resort", "Apartment", "Hostel"],
      default: "Hotel",
    },

    starRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 4,
    },

    reviews: {
      type: Number,
      default: 0,
      min: 0,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
      default: "India",
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    checkIn: {
      type: String,
      default: "02:00 PM",
      trim: true,
    },

    checkOut: {
      type: String,
      default: "12:00 PM",
      trim: true,
    },

    rooms: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    amenities: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    image: {
      type: String,
      trim: true,
    },

    imageDeleteUrl: {
      type: String,
      trim: true,
    },

    images: {
      type: [String],
      default: [],
    },

    imageDeleteUrls: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
