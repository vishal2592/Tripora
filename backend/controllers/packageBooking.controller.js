const mongoose = require("mongoose");
const PackageBooking = require("../models/packageBooking.model");
const Package = require("../models/package.model");
const Destination = require("../models/destination.model");

// Create Package Booking
const createPackageBooking = async (req, res) => {
  try {
    // Logged-in user ID from JWT middleware
    const userId = req.user.userId;

    const { packageId, travelDate, adults, children, infants, passengers } =
      req.body;

    // Required fields

    if (!packageId || !travelDate || !adults || !passengers) {
      return res.status(400).json({
        success: false,
        message: "packageId, travelDate, adults and passengers are required",
      });
    }

    // Validate Package ID

    if (!mongoose.Types.ObjectId.isValid(packageId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid package ID",
      });
    }

    // Find Package

    const packageData = await Package.findById(packageId).populate(
      "destination",
      "name country",
    );

    if (!packageData) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    // Check Package Status

    if (packageData.status !== "Active") {
      return res.status(400).json({
        success: false,
        message: "This package is currently inactive",
      });
    }

    // Traveller counts

    const adultCount = Number(adults);
    const childCount = children ? Number(children) : 0;
    const infantCount = infants ? Number(infants) : 0;

    if (isNaN(adultCount) || adultCount < 1) {
      return res.status(400).json({
        success: false,
        message: "At least 1 adult is required",
      });
    }

    if (isNaN(childCount) || childCount < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid children count",
      });
    }

    if (isNaN(infantCount) || infantCount < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid infants count",
      });
    }

    // Passenger validation

    if (!Array.isArray(passengers)) {
      return res.status(400).json({
        success: false,
        message: "Passengers must be an array",
      });
    }

    const totalTravellers = adultCount + childCount + infantCount;

    if (passengers.length !== totalTravellers) {
      return res.status(400).json({
        success: false,
        message: `Passenger details required for all ${totalTravellers} travellers`,
      });
    }

    for (const passenger of passengers) {
      if (!passenger.fullName || passenger.age === undefined) {
        return res.status(400).json({
          success: false,
          message: "Each passenger must have fullName and age",
        });
      }
    }

    // Travel Date validation

    const selectedTravelDate = new Date(travelDate);

    if (isNaN(selectedTravelDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid travel date",
      });
    }

    // Package Pricing

    const adultPrice = Number(packageData.price);

    const childPrice = adultPrice * 0.7;

    const infantPrice = adultPrice * 0.25;

    const adultsTotal = adultPrice * adultCount;

    const childrenTotal = childPrice * childCount;

    const infantsTotal = infantPrice * infantCount;

    const subtotal = adultsTotal + childrenTotal + infantsTotal;

    // 5% Tax
    const taxes = subtotal * 0.05;

    // Fixed convenience fee
    const convenienceFee = 299;

    const totalAmount = subtotal + taxes + convenienceFee;

    // Generate Booking ID

    const bookingId =
      "TRP" + Date.now() + Math.floor(100 + Math.random() * 900);

    // Package Snapshot

    const destinationName = packageData.destination?.name || "";

    // Create Booking

    const booking = await PackageBooking.create({
      bookingId,

      user: userId,

      package: packageData._id,

      packageDetails: {
        name: packageData.name,
        destination: destinationName,
        country: packageData.country,
        duration: packageData.duration,
        image: packageData.image,
      },

      travelDate: selectedTravelDate,

      travellers: {
        adults: adultCount,
        children: childCount,
        infants: infantCount,
      },

      passengers,

      pricing: {
        adultPrice,
        childPrice,
        infantPrice,

        adultsTotal,
        childrenTotal,
        infantsTotal,

        subtotal,
        taxes,
        convenienceFee,
        totalAmount,
      },

      paymentStatus: "Pending",

      bookingStatus: "Pending",
    });

    // Increase Package Booking Count

    await Package.findByIdAndUpdate(packageData._id, {
      $inc: {
        bookings: 1,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Package booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Create Package Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// get logged-in user's pacjage bookin
const getMyPackageBooking = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in token",
      });
    }

    const bookings = await PackageBooking.find({ user: userId })
      .populate(
        "package",
        "name destination country duration days nights price image",
      )
      .sort({ createdAt: -1 });

    //success response
    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Get My Package Bookings Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch package bookings",
      error: error.message,
    });
  }
};

//get single package booking
const getSinglePackageBooking = async (req, res) => {
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
    }).populate(
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

const cancelPackageBooking = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const { cancellationReason } = req.body;

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
        message: "Package booking is already cancelled",
      });
    }

    if (booking.bookingStatus === "Completed") {
      return res.status(400).json({
        success: false,
        message: "Completed booking cannot be cancelled",
      });
    }

    booking.bookingStatus = "Cancelled";

    if (cancellationReason) {
      booking.cancellationReason = cancellationReason.trim();
    }

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Package booking cancelled successfully",
      booking,
    });
  } catch (error) {
    console.error("Cancel Package Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to cancel package booking",
      error: error.message,
    });
  }
};
module.exports = {
  createPackageBooking,
  getMyPackageBooking,
  getSinglePackageBooking,
  cancelPackageBooking,
};
