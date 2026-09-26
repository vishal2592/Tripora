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

//update hotel booking

const updateHotelBooking = async (req, res) => {
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

    const {
      checkIn,
      checkOut,
      nights,
      guests,
      roomDetails,
      guestDetails,
      taxes,
      totalAmount,
      paymentMethod,
      paymentStatus,
      bookingStatus,
    } = req.body;

    if (checkIn !== undefined) {
      const newCheckIn = new Date(checkIn);

      if (Number.isNaN(newCheckIn.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid check-in date",
        });
      }

      booking.checkIn = newCheckIn;
    }

    if (checkOut !== undefined) {
      const newCheckOut = new Date(checkOut);

      if (Number.isNaN(newCheckOut.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid check-out date",
        });
      }

      booking.checkOut = newCheckOut;
    }

    if (booking.checkIn && booking.checkOut) {
      if (booking.checkOut <= booking.checkIn) {
        return res.status(400).json({
          success: false,
          message: "Check-out date must be after check-in date",
        });
      }
    }

    if (nights !== undefined) {
      const bookingNights = Number(nights);

      if (!Number.isInteger(bookingNights) || bookingNights < 1) {
        return res.status(400).json({
          success: false,
          message: "Nights must be at least 1",
        });
      }

      booking.nights = bookingNights;
    }

    if (guests !== undefined) {
      const bookingGuests = Number(guests);

      if (!Number.isInteger(bookingGuests) || bookingGuests < 1) {
        return res.status(400).json({
          success: false,
          message: "Guests must be at least 1",
        });
      }

      booking.guests = bookingGuests;
    }

    if (roomDetails !== undefined) {
      if (roomDetails.name !== undefined) {
        booking.roomDetails.name = roomDetails.name;
      }

      if (roomDetails.price !== undefined) {
        const roomPrice = Number(roomDetails.price);

        if (Number.isNaN(roomPrice) || roomPrice < 0) {
          return res.status(400).json({
            success: false,
            message: "Invalid room price",
          });
        }

        booking.roomDetails.price = roomPrice;
      }

      if (roomDetails.bed !== undefined) {
        booking.roomDetails.bed = roomDetails.bed;
      }

      if (roomDetails.guests !== undefined) {
        booking.roomDetails.guests = Number(roomDetails.guests);
      }

      if (roomDetails.meal !== undefined) {
        booking.roomDetails.meal = roomDetails.meal;
      }

      if (roomDetails.cancellation !== undefined) {
        booking.roomDetails.cancellation = roomDetails.cancellation;
      }
    }

    if (guestDetails !== undefined) {
      if (guestDetails.firstName !== undefined) {
        booking.guestDetails.firstName = guestDetails.firstName;
      }

      if (guestDetails.lastName !== undefined) {
        booking.guestDetails.lastName = guestDetails.lastName;
      }

      if (guestDetails.email !== undefined) {
        booking.guestDetails.email = guestDetails.email.toLowerCase();
      }

      if (guestDetails.countryCode !== undefined) {
        booking.guestDetails.countryCode = guestDetails.countryCode;
      }

      if (guestDetails.mobile !== undefined) {
        booking.guestDetails.mobile = guestDetails.mobile;
      }

      if (guestDetails.specialRequest !== undefined) {
        booking.guestDetails.specialRequest = guestDetails.specialRequest;
      }
    }

    if (taxes !== undefined) {
      const bookingTaxes = Number(taxes);

      if (Number.isNaN(bookingTaxes) || bookingTaxes < 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid taxes",
        });
      }

      booking.taxes = bookingTaxes;
    }

    if (totalAmount !== undefined) {
      const bookingTotal = Number(totalAmount);

      if (Number.isNaN(bookingTotal) || bookingTotal < 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid total amount",
        });
      }

      booking.totalAmount = bookingTotal;
    }

    if (paymentMethod !== undefined) {
      booking.paymentMethod = paymentMethod;
    }

    if (paymentStatus !== undefined) {
      booking.paymentStatus = paymentStatus;
    }

    if (bookingStatus !== undefined) {
      booking.bookingStatus = bookingStatus;
    }

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Hotel booking updated successfully",
      booking,
    });
  } catch (error) {
    console.error("Update Hotel Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

//cancel hotel booking
const cancelHotelBooking = async (req, res) => {
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

    if (booking.bookingStatus === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Hotel booking is already cancelled",
      });
    }

    if (booking.bookingStatus === "completed") {
      return res.status(400).json({
        success: false,
        message: "Completed booking cannot be cancelled",
      });
    }

    booking.bookingStatus = "cancelled";

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Hotel booking cancelled successfully",
      booking,
    });
  } catch (error) {
    console.error("Cancel Hotel Booking Error:", error);

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
  updateHotelBooking,
  cancelHotelBooking,
};
