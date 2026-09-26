const mongoose = require("mongoose");

const savedHotelSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },

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

      price: {
        type: Number,
        min: 0,
      },

      rating: {
        type: Number,
        min: 0,
        max: 5,
      },
    },
  },
  {
    timestamps: true,
  },
);

savedHotelSchema.index({ user: 1, hotel: 1 }, { unique: true });

const SavedHotel = mongoose.model("SavedHotel", savedHotelSchema);

module.exports = SavedHotel;
