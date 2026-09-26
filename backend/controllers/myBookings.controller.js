const HotelBooking = require("../models/hotelBooking.model");

// GET MY BOOKINGS

const getMyBookings = async (req, res) => {
  try {
    // Logged-in user ID from JWT
    const userId = req.user.userId;

    // Get user's hotel bookings
    const hotelBookings = await HotelBooking.find({
      user: userId,
    }).sort({ createdAt: -1 });

    // Normalize hotel bookings
    const bookings = hotelBookings.map((booking) => ({
      bookingId: booking.bookingId,

      bookingType: "hotel",

      status: booking.bookingStatus,

      paymentStatus: booking.paymentStatus,

      hotel: {
        id: booking.hotel,
        name: booking.hotelDetails?.name || "",
        image: booking.hotelDetails?.image || "",
        location: booking.hotelDetails?.location || "",
      },

      room: {
        name: booking.roomDetails?.name || "",
        price: booking.roomDetails?.price || 0,
        bed: booking.roomDetails?.bed || "",
        guests: booking.roomDetails?.guests || 0,
        meal: booking.roomDetails?.meal || "",
        cancellation: booking.roomDetails?.cancellation || "",
      },

      checkIn: booking.checkIn,
      checkOut: booking.checkOut,

      nights: booking.nights,
      guests: booking.guests,

      guestDetails: booking.guestDetails,

      roomTotal: booking.roomTotal,
      taxes: booking.taxes,
      totalAmount: booking.totalAmount,

      paymentMethod: booking.paymentMethod,

      createdAt: booking.createdAt,
    }));

    // Calculate summary
    const totalTrips = bookings.length;

    const upcoming = bookings.filter(
      (booking) =>
        booking.status === "confirmed" || booking.status === "pending",
    ).length;

    const completed = bookings.filter(
      (booking) => booking.status === "completed",
    ).length;

    const cancelled = bookings.filter(
      (booking) => booking.status === "cancelled",
    ).length;

    return res.status(200).json({
      success: true,

      summary: {
        totalTrips,
        upcoming,
        completed,
        cancelled,
      },

      count: bookings.length,

      bookings,
    });
  } catch (error) {
    console.error("Get My Bookings Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getMyBookings,
};
