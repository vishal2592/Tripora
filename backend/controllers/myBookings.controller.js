const HotelBooking = require("../models/hotelBooking.model");
const PackageBooking = require("../models/packageBooking.model");

// GET MY BOOKINGS
const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.userId;

    // ================= HOTEL BOOKINGS =================

    const hotelBookings = await HotelBooking.find({
      user: userId,
    }).sort({ createdAt: -1 });

    const normalizedHotelBookings = hotelBookings.map((booking) => ({
      _id: booking._id,

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

    // ================= PACKAGE BOOKINGS =================

    const packageBookings = await PackageBooking.find({
      user: userId,
    }).sort({ createdAt: -1 });

    const normalizedPackageBookings = packageBookings.map((booking) => ({
      _id: booking._id,

      bookingId: booking.bookingId,

      bookingType: "package",

      status: booking.bookingStatus,

      paymentStatus: booking.paymentStatus,

      package: {
        id: booking.package,
        name: booking.packageDetails?.name || "",
        destination: booking.packageDetails?.destination || "",
        country: booking.packageDetails?.country || "",
        duration: booking.packageDetails?.duration || "",
        image: booking.packageDetails?.image || "",
      },

      travelDate: booking.travelDate,

      travellers: {
        adults: booking.travellers?.adults || 0,
        children: booking.travellers?.children || 0,
        infants: booking.travellers?.infants || 0,
      },

      passengers: booking.passengers || [],

      pricing: {
        adultPrice: booking.pricing?.adultPrice || 0,
        childPrice: booking.pricing?.childPrice || 0,
        infantPrice: booking.pricing?.infantPrice || 0,
        adultsTotal: booking.pricing?.adultsTotal || 0,
        childrenTotal: booking.pricing?.childrenTotal || 0,
        infantsTotal: booking.pricing?.infantsTotal || 0,
        subtotal: booking.pricing?.subtotal || 0,
        taxes: booking.pricing?.taxes || 0,
        convenienceFee: booking.pricing?.convenienceFee || 0,
        totalAmount: booking.pricing?.totalAmount || 0,
      },

      createdAt: booking.createdAt,
    }));

    // ================= COMBINE BOOKINGS =================

    const bookings = [
      ...normalizedHotelBookings,
      ...normalizedPackageBookings,
    ].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // ================= SUMMARY =================

    const totalTrips = bookings.length;

    const upcoming = bookings.filter(
      (booking) =>
        booking.status?.toLowerCase() === "confirmed" ||
        booking.status?.toLowerCase() === "pending"
    ).length;

    const completed = bookings.filter(
      (booking) =>
        booking.status?.toLowerCase() === "completed"
    ).length;

    const cancelled = bookings.filter(
      (booking) =>
        booking.status?.toLowerCase() === "cancelled"
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