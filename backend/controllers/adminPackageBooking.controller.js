const mongoose = require("mongoose");
const PackageBooking = require("../models/packageBooking.model");

const getAllPackageBookings = async (req, res) => {
  try {
    const bookings = await PackageBooking.find()
      .populate("user", "fullName email mobileNumber")
      .populate("package", "name country duration days nights price image")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Get All Package Bookings Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch package bookings",
      error: error.message,
    });
  }
};

const getSinglePackageBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await PackageBooking.findById(id)
      .populate("user", "fullName email mobileNumber")
      .populate(
        "package",
        "name destination country duration days nights price image description highlights",
      );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Package booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("Get Single Package Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch package booking",
      error: error.message,
    });
  }
};

const updatePackageBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { bookingStatus, paymentStatus, cancellationReason } = req.body;

    // Validate booking ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    // At least one field is required
    if (
      bookingStatus === undefined &&
      paymentStatus === undefined &&
      cancellationReason === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "bookingStatus, paymentStatus or cancellationReason is required",
      });
    }

    // Validate booking status
    const allowedBookingStatuses = [
      "Pending",
      "Confirmed",
      "Cancelled",
      "Completed",
    ];

    if (
      bookingStatus !== undefined &&
      !allowedBookingStatuses.includes(bookingStatus)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid bookingStatus. Allowed values: Pending, Confirmed, Cancelled, Completed",
      });
    }

    // Validate payment status
    const allowedPaymentStatuses = ["Pending", "Paid", "Failed", "Refunded"];

    if (
      paymentStatus !== undefined &&
      !allowedPaymentStatuses.includes(paymentStatus)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid paymentStatus. Allowed values: Pending, Paid, Failed, Refunded",
      });
    }

    // Find booking
    const booking = await PackageBooking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Package booking not found",
      });
    }

    // Update fields only if provided
    if (bookingStatus !== undefined) {
      booking.bookingStatus = bookingStatus;
    }

    if (paymentStatus !== undefined) {
      booking.paymentStatus = paymentStatus;
    }

    if (cancellationReason !== undefined) {
      booking.cancellationReason = cancellationReason;
    }

    await booking.save();

    // Populate updated booking
    await booking.populate("user", "fullName email mobileNumber");

    await booking.populate(
      "package",
      "name destination country duration days nights price image description highlights",
    );

    return res.status(200).json({
      success: true,
      message: "Package booking updated successfully",
      booking,
    });
  } catch (error) {
    console.error("Update Package Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update package booking",
      error: error.message,
    });
  }
};

module.exports = {
  getAllPackageBookings,
  getSinglePackageBooking,
  updatePackageBooking,
};
