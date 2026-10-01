const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: String,
      required: true,
      trim: true,
    },

    days: {
      type: Number,
      required: true,
      min: 1,
    },

    nights: {
      type: Number,
      required: true,
      min: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviews: {
      type: Number,
      default: 0,
      min: 0,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    oldPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    bookings: {
      type: Number,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    // =========================
    // MAIN / COVER IMAGE
    // =========================

    image: {
      type: String,
      trim: true,
    },

    imageDeleteUrl: {
      type: String,
      trim: true,
    },

    // =========================
    // MULTIPLE GALLERY IMAGES
    // =========================

    images: [
      {
        url: {
          type: String,
          trim: true,
        },

        deleteUrl: {
          type: String,
          trim: true,
        },
      },
    ],

    description: {
      type: String,
      trim: true,
    },

    highlights: {
      type: [String],
      default: [],
    },

    inclusions: {
      type: [String],
      default: [],
    },

    exclusions: {
      type: [String],
      default: [],
    },

    // =========================
    // ITINERARY
    // =========================

    itinerary: [
      {
        day: {
          type: Number,
          min: 1,
        },

        title: {
          type: String,
          trim: true,
        },

        description: {
          type: String,
          trim: true,
        },

        activities: {
          type: [String],
          default: [],
        },
      },
    ],

    // =========================
    // HOTEL
    // =========================

    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      default: null,
    },

    // =========================
    // FLIGHTS
    // =========================

    flights: {
      departure: {
        airline: {
          type: String,
          trim: true,
        },

        flight: {
          type: String,
          trim: true,
        },

        from: {
          type: String,
          trim: true,
        },

        fromCode: {
          type: String,
          trim: true,
        },

        fromTime: {
          type: String,
          trim: true,
        },

        to: {
          type: String,
          trim: true,
        },

        toCode: {
          type: String,
          trim: true,
        },

        toTime: {
          type: String,
          trim: true,
        },

        duration: {
          type: String,
          trim: true,
        },
      },

      return: {
        airline: {
          type: String,
          trim: true,
        },

        flight: {
          type: String,
          trim: true,
        },

        from: {
          type: String,
          trim: true,
        },

        fromCode: {
          type: String,
          trim: true,
        },

        fromTime: {
          type: String,
          trim: true,
        },

        to: {
          type: String,
          trim: true,
        },

        toCode: {
          type: String,
          trim: true,
        },

        toTime: {
          type: String,
          trim: true,
        },

        duration: {
          type: String,
          trim: true,
        },
      },
    },

    // =========================
    // IMPORTANT INFO
    // =========================

    importantInfo: {
      type: [String],
      default: [],
    },

    // =========================
    // CANCELLATION
    // =========================

    cancellation: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;