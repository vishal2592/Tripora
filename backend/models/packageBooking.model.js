const mongoose = require("mongoose");
const packageBookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },
    packageDetails: {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      destination: {
        type: String,
        required: true,
        trim: true,
      },

      country: {
        type: String,
        required: true,
        trim: true,
      },

      duration: {
        type: String,
        required: true,
        trim: true,
      },

      image: {
        type: String,
        trim: true,
      },
    },
    travelDate: {
      type: Date,
      required: true,
    },

    travellers: {
      adults: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
      },

      children: {
        type: Number,
        default: 0,
        min: 0,
      },

      infants: {
        type: Number,
        default: 0,
        min: 0,
      },
    },

    passengers: [
      {
        fullName: {
          type: String,
          required: true,
          trim: true,
        },

        age: {
          type: Number,
          required: true,
          min: 0,
        },

        gender: {
          type: String,
          enum: ["Male", "Female", "Other"],
        },

        email: {
          type: String,
          trim: true,
          lowercase: true,
        },
        mobileNumber: {
          type: String,
          trim: true,
        },

        passportNumber: {
          type: String,
          trim: true,
        },
      },
    ],
    pricing: {
      adultPrice: {
        type: Number,
        required: true,
        min: 0,
      },

      childPrice: {
        type: Number,
        default: 0,
        min: 0,
      },

      infantPrice: {
        type: Number,
        default: 0,
        min: 0,
      },

      adultsTotal: {
        type: Number,
        default: 0,
        min: 0,
      },

      childrenTotal: {
        type: Number,
        default: 0,
        min: 0,
      },

      infantsTotal: {
        type: Number,
        default: 0,
        min: 0,
      },

      subtotal: {
        type: Number,
        required: true,
        min: 0,
      },

      taxes: {
        type: Number,
        default: 0,
        min: 0,
      },
      convenienceFee: {
        type: Number,
        default: 0,
        min: 0,
      },

      totalAmount: {
        type: Number,
        required: true,
        min: 0,
      },
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },

    bookingStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
    },

    cancellationReason: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const PackageBooking = mongoose.model("PackageBooking", packageBookingSchema);

module.exports = PackageBooking;
