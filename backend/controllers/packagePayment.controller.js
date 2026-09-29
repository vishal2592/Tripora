const mongoose = require("mongoose");
const PackageBooking = require("../models/packageBooking.model");

const confirmPackagePayment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in token",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await PackageBooking.findOne({
      _id: id,
      user: userId,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Package booking not found",
      });
    }

    if (booking.bookingStatus === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Cancelled booking cannot be paid",
      });
    }

    if (booking.paymentStatus === "Paid") {
      return res.status(400).json({
        success: false,
        message: "Payment is already completed",
      });
    }

    booking.paymentStatus = "Paid";
    booking.bookingStatus = "Confirmed";

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Package payment confirmed successfully",
      booking,
    });
  } catch (error) {
    console.error("Confirm Package Payment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to confirm package payment",
      error: error.message,
    });
  }
};

module.exports = {
  confirmPackagePayment,
};
