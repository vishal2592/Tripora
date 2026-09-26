const mongoose = require("mongoose");

const hotelBookingSchema = new mongoose.Schema(
  {
    // Unique booking ID
    bookingId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // User who made the booking
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Hotel reference
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },

    // Hotel snapshot
    hotelDetails: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      image: {
        type: String,
        trim: true,
      },
      location: {
        type: String,
        trim: true,
      },
    },

    // Selected room snapshot
    roomDetails: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      bed: {
        type: String,
        trim: true,
      },
      guests: {
        type: Number,
        min: 1,
      },
      meal: {
        type: String,
        trim: true,
      },
      cancellation: {
        type: String,
        trim: true,
      },
    },

    // Booking dates
    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    nights: {
      type: Number,
      required: true,
      min: 1,
    },

    // Number of guests
    guests: {
      type: Number,
      required: true,
      min: 1,
    },

    // Primary guest details
    guestDetails: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },

      lastName: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },

      countryCode: {
        type: String,
        default: "+91",
        trim: true,
      },

      mobile: {
        type: String,
        required: true,
        trim: true,
      },

      specialRequest: {
        type: String,
        trim: true,
        default: "",
      },
    },

    // Pricing
    roomTotal: {
      type: Number,
      required: true,
      min: 0,
    },

    taxes: {
      type: Number,
      required: true,
      min: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    // Payment
    paymentMethod: {
      type: String,
      enum: ["upi", "card", "netbanking", "wallet"],
      default: "upi",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    // Booking status
    bookingStatus: {
      type: String,
      enum: ["confirmed", "pending", "cancelled", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const HotelBooking = mongoose.model("HotelBooking", hotelBookingSchema);

module.exports = HotelBooking;
