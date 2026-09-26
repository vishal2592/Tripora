const HotelBooking = require("../models/hotelBooking.model");
const Hotel = require("../models/hotel.model");

const createHotelBooking = async (req, res) => {
  try {
    const {
      hotelId,
      hotelDetails,
      roomDetails,
      checkIn,
      checkOut,
      nights,
      guests,
      guestDetails,
      roomTotal,
      taxes,
      totalAmount,
      paymentMethod,
    } = req.body;

    // check reuired fields
    if (
      !hotelId ||
      !roomDetails ||
      !checkIn ||
      !checkOut ||
      !nights ||
      !guests ||
      !guestDetails ||
      roomTotal === undefined ||
      taxes === undefined ||
      totalAmount === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Required booking details are missing",
      });
    }

    // Check hotel exists
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    // Guest details validation
    const { firstName, lastName, email, countryCode, mobile, specialRequest } =
      guestDetails;

    if (!firstName || !lastName || !email || !mobile) {
      return res.status(400).json({
        success: false,
        message: "Guest details are incomplete",
      });
    }

    // Validate dates
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid check-in or check-out date",
      });
    }

    if (endDate <= startDate) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date",
      });
    }

    // Validate numeric values
    const roomPrice = Number(roomDetails.price);
    const bookingNights = Number(nights);
    const bookingGuests = Number(guests);
    const bookingTaxes = Number(taxes);

    if (
      Number.isNaN(roomPrice) ||
      Number.isNaN(bookingNights) ||
      Number.isNaN(bookingGuests) ||
      Number.isNaN(bookingTaxes)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking price or quantity",
      });
    }

    if (
      roomPrice < 0 ||
      bookingNights < 1 ||
      bookingGuests < 1 ||
      bookingTaxes < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking values",
      });
    }

    // Calculate room total on backend
    const calculatedRoomTotal = roomPrice * bookingNights;

    // Calculate final amount on backend
    const calculatedTotalAmount = calculatedRoomTotal + bookingTaxes;

    // Check frontend total
    const frontendTotalAmount = Number(totalAmount);

    if (
      Number.isNaN(frontendTotalAmount) ||
      frontendTotalAmount !== calculatedTotalAmount
    ) {
      return res.status(400).json({
        success: false,
        message: "Booking amount mismatch",
      });
    }

    // Generate booking ID
    const bookingId = `HTL${Date.now().toString().slice(-8)}`;

    // Create booking
    const booking = await HotelBooking.create({
      bookingId,

      // If JWT middleware is used later,
      // req.user.userId can be stored here.
      user: req.user?.userId || null,

      hotel: hotel._id,

      hotelDetails: {
        name: hotel.hotelName,
        image: hotel.image || "",
        location: `${hotel.city || ""}, ${hotel.state || ""}`.replace(
          /,\s*$/,
          "",
        ),
      },

      roomDetails: {
        name: roomDetails.name,
        price: roomPrice,
        bed: roomDetails.bed || "",
        guests: Number(roomDetails.guests || bookingGuests),
        meal: roomDetails.meal || "",
        cancellation: roomDetails.cancellation || "",
      },

      checkIn: startDate,
      checkOut: endDate,

      nights: bookingNights,
      guests: bookingGuests,

      guestDetails: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        countryCode: countryCode || "+91",
        mobile: mobile.trim(),
        specialRequest: specialRequest || "",
      },

      roomTotal: calculatedRoomTotal,
      taxes: bookingTaxes,
      totalAmount: calculatedTotalAmount,

      paymentMethod: paymentMethod || "upi",

      paymentStatus: "pending",

      bookingStatus: "pending",
    });

    return res.status(201).json({
      success: true,
      message: "Hotel booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Create Hotel Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

//get all hotel bookings

const getAllHotelBookings = async (req, res) => {
  try {
    const bookings = await HotelBooking.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Hotel bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    console.error("Get All Hotel Booking Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

//get hotel bookins by id
const getHotelBookingByBookingId = async (req, res) => {
  try {
    const { bookingId } = req.params;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required",
      });
    }

    const booking = await HotelBooking.findOne({ bookingId });
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Hotel booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Hotel booking fetched successfully",
      booking,
    });
  } catch (error) {
    console.error("Get Hotel Booking Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
module.exports = {
  createHotelBooking,
  getHotelBookingByBookingId,
  getAllHotelBookings,
};
