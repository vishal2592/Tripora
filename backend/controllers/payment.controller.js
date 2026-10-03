const Payment = require("../models/payment.model");

// Get All Payments - Admin
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("user", "fullName email mobileNumber")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    console.error("Get All Payments Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllPayments,
};
