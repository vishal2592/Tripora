const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    mobileNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },
    dob: {
      type: Date,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      trim: true,
    },

    avatar: {
      type: String,
      trim: true,
    },
    preferredDestination: {
      type: String,
      trim: true,
    },

    travelType: {
      type: String,
      trim: true,
    },

    seatPreference: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlegth: 6,
    },
    role: {
      type: String,
      enum: ["user"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
