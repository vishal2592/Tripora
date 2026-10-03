const HotelBooking = require("../models/hotelBooking.model");
const Hotel = require("../models/hotel.model");
const Payment = require("../models/payment.model");
const razorpay = require("../config/razorpay");
const crypto = require("crypto");

// ======================================================
// CREATE HOTEL BOOKING
// ======================================================

const createHotelBooking = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required",
      });
    }

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

    // ==================================================
    // REQUIRED FIELDS
    // ==================================================

    if (
      !hotelId ||
      !roomDetails ||
      !checkIn ||
      !checkOut ||
      !nights ||
      !guests ||
      !guestDetails
    ) {
      return res.status(400).json({
        success: false,
        message: "Required booking details are missing",
      });
    }

    // ==================================================
    // HOTEL
    // ==================================================

    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    const hotelStatus = String(hotel.status || "")
      .trim()
      .toLowerCase();

    if (hotelStatus !== "active") {
      return res.status(400).json({
        success: false,
        message: "This hotel is currently unavailable",
      });
    }

    // ==================================================
    // GUEST DETAILS
    // ==================================================

    const {
      firstName,
      lastName,
      email,
      countryCode,
      mobile,
      specialRequest,
    } = guestDetails;

    if (!firstName || !lastName || !email || !mobile) {
      return res.status(400).json({
        success: false,
        message: "Guest details are incomplete",
      });
    }

    // ==================================================
    // DATES
    // ==================================================

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    if (
      Number.isNaN(startDate.getTime()) ||
      Number.isNaN(endDate.getTime())
    ) {
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

    // ==================================================
    // NUMERIC VALUES
    // ==================================================

    const roomPrice = Number(roomDetails.price);
    const bookingNights = Number(nights);
    const bookingGuests = Number(guests);

    if (
      Number.isNaN(roomPrice) ||
      Number.isNaN(bookingNights) ||
      Number.isNaN(bookingGuests)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking price or quantity",
      });
    }

    if (
      roomPrice < 0 ||
      !Number.isInteger(bookingNights) ||
      bookingNights < 1 ||
      !Number.isInteger(bookingGuests) ||
      bookingGuests < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking values",
      });
    }

    // ==================================================
    // EXTRA GUEST CALCULATION
    // ==================================================

    const roomCapacity = Number(roomDetails.guests || 2);

    const includedGuests =
      Number.isFinite(roomCapacity) && roomCapacity > 0
        ? roomCapacity
        : 2;

    const extraGuests = Math.max(
      0,
      bookingGuests - includedGuests
    );

    const extraGuestFeePerNight = Math.round(
      roomPrice * 0.1
    );

    const baseRoomTotal =
      roomPrice * bookingNights;

    const extraGuestTotal =
      extraGuests *
      extraGuestFeePerNight *
      bookingNights;

    const calculatedRoomTotal =
      baseRoomTotal + extraGuestTotal;

    // ==================================================
    // TAX CALCULATION
    // ==================================================

    const calculatedTaxes = Math.round(
      calculatedRoomTotal * 0.12
    );

    const calculatedTotalAmount =
      calculatedRoomTotal + calculatedTaxes;

    // ==================================================
    // OPTIONAL FRONTEND TOTAL VALIDATION
    // ==================================================

    if (roomTotal !== undefined) {
      const frontendRoomTotal = Number(roomTotal);

      if (
        Number.isNaN(frontendRoomTotal) ||
        frontendRoomTotal !== calculatedRoomTotal
      ) {
        return res.status(400).json({
          success: false,
          message: "Room amount mismatch",
          expected: calculatedRoomTotal,
          received: frontendRoomTotal,
        });
      }
    }

    if (taxes !== undefined) {
      const frontendTaxes = Number(taxes);

      if (
        Number.isNaN(frontendTaxes) ||
        frontendTaxes !== calculatedTaxes
      ) {
        return res.status(400).json({
          success: false,
          message: "Tax amount mismatch",
          expected: calculatedTaxes,
          received: frontendTaxes,
        });
      }
    }

    if (totalAmount !== undefined) {
      const frontendTotalAmount =
        Number(totalAmount);

      if (
        Number.isNaN(frontendTotalAmount) ||
        frontendTotalAmount !==
          calculatedTotalAmount
      ) {
        return res.status(400).json({
          success: false,
          message: "Booking amount mismatch",
          expected: calculatedTotalAmount,
          received: frontendTotalAmount,
        });
      }
    }

    // ==================================================
    // BOOKING ID
    // ==================================================

    const bookingId = `HTL${Date.now()
      .toString()
      .slice(-8)}`;

    // ==================================================
    // CREATE BOOKING
    // ==================================================

    const booking = await HotelBooking.create({
      bookingId,

      user: userId,

      hotel: hotel._id,

      hotelDetails: {
        name: hotel.hotelName,
        image: hotel.image || "",
        location: `${hotel.city || ""}, ${
          hotel.state || ""
        }`.replace(/,\s*$/, ""),
      },

      roomDetails: {
        name: roomDetails.name,
        price: roomPrice,
        bed: roomDetails.bed || "",
        guests: includedGuests,
        meal: roomDetails.meal || "",
        cancellation:
          roomDetails.cancellation || "",
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
      taxes: calculatedTaxes,
      totalAmount: calculatedTotalAmount,

      paymentMethod: paymentMethod || "razorpay",

      paymentStatus: "pending",
      bookingStatus: "pending",
    });

    return res.status(201).json({
      success: true,
      message: "Hotel booking created successfully",
      booking,
    });
  } catch (error) {
    console.error(
      "Create Hotel Booking Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ======================================================
// GET ALL HOTEL BOOKINGS - ADMIN
// ======================================================

const getAllHotelBookings = async (req, res) => {
  try {
    const bookings = await HotelBooking.find()
      .populate(
        "user",
        "fullName email mobileNumber"
      )
      .populate(
        "hotel",
        "hotelName city state country image"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message:
        "All hotel bookings fetched successfully",
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error(
      "Get All Hotel Bookings Admin Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ======================================================
// GET HOTEL BOOKING BY BOOKING ID - USER
// ======================================================

const getHotelBookingByBookingId = async (
  req,
  res
) => {
  try {
    const userId = req.user?.userId;
    const { bookingId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required",
      });
    }

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required",
      });
    }

    const booking = await HotelBooking.findOne({
      bookingId,
      user: userId,
    });

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
    console.error(
      "Get Hotel Booking Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ======================================================
// UPDATE HOTEL BOOKING - USER
// ======================================================

const updateHotelBooking = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { bookingId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required",
      });
    }

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required",
      });
    }

    const booking = await HotelBooking.findOne({
      bookingId,
      user: userId,
    });

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
      paymentMethod,
    } = req.body;

    // ==================================================
    // DATES
    // ==================================================

    if (checkIn !== undefined) {
      const newCheckIn = new Date(checkIn);

      if (
        Number.isNaN(newCheckIn.getTime())
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid check-in date",
        });
      }

      booking.checkIn = newCheckIn;
    }

    if (checkOut !== undefined) {
      const newCheckOut = new Date(checkOut);

      if (
        Number.isNaN(newCheckOut.getTime())
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid check-out date",
        });
      }

      booking.checkOut = newCheckOut;
    }

    if (
      booking.checkIn >= booking.checkOut
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Check-out date must be after check-in date",
      });
    }

    // ==================================================
    // NIGHTS
    // ==================================================

    if (nights !== undefined) {
      const bookingNights = Number(nights);

      if (
        !Number.isInteger(bookingNights) ||
        bookingNights < 1
      ) {
        return res.status(400).json({
          success: false,
          message: "Nights must be at least 1",
        });
      }

      booking.nights = bookingNights;
    }

    // ==================================================
    // GUESTS
    // ==================================================

    if (guests !== undefined) {
      const bookingGuests = Number(guests);

      if (
        !Number.isInteger(bookingGuests) ||
        bookingGuests < 1
      ) {
        return res.status(400).json({
          success: false,
          message: "Guests must be at least 1",
        });
      }

      booking.guests = bookingGuests;
    }

    // ==================================================
    // ROOM DETAILS
    // ==================================================

    if (roomDetails !== undefined) {
      if (roomDetails.name !== undefined) {
        booking.roomDetails.name =
          roomDetails.name;
      }

      if (roomDetails.price !== undefined) {
        const roomPrice = Number(
          roomDetails.price
        );

        if (
          Number.isNaN(roomPrice) ||
          roomPrice < 0
        ) {
          return res.status(400).json({
            success: false,
            message: "Invalid room price",
          });
        }

        booking.roomDetails.price =
          roomPrice;
      }

      if (roomDetails.bed !== undefined) {
        booking.roomDetails.bed =
          roomDetails.bed;
      }

      if (roomDetails.guests !== undefined) {
        const roomGuests = Number(
          roomDetails.guests
        );

        if (
          !Number.isInteger(roomGuests) ||
          roomGuests < 1
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Invalid room guest capacity",
          });
        }

        booking.roomDetails.guests =
          roomGuests;
      }

      if (roomDetails.meal !== undefined) {
        booking.roomDetails.meal =
          roomDetails.meal;
      }

      if (
        roomDetails.cancellation !== undefined
      ) {
        booking.roomDetails.cancellation =
          roomDetails.cancellation;
      }
    }

    // ==================================================
    // GUEST DETAILS
    // ==================================================

    if (guestDetails !== undefined) {
      if (
        guestDetails.firstName !== undefined
      ) {
        booking.guestDetails.firstName =
          guestDetails.firstName.trim();
      }

      if (
        guestDetails.lastName !== undefined
      ) {
        booking.guestDetails.lastName =
          guestDetails.lastName.trim();
      }

      if (guestDetails.email !== undefined) {
        booking.guestDetails.email =
          guestDetails.email
            .trim()
            .toLowerCase();
      }

      if (
        guestDetails.countryCode !== undefined
      ) {
        booking.guestDetails.countryCode =
          guestDetails.countryCode;
      }

      if (guestDetails.mobile !== undefined) {
        booking.guestDetails.mobile =
          guestDetails.mobile.trim();
      }

      if (
        guestDetails.specialRequest !==
        undefined
      ) {
        booking.guestDetails.specialRequest =
          guestDetails.specialRequest;
      }
    }

    // ==================================================
    // PAYMENT METHOD
    // ==================================================

    if (paymentMethod !== undefined) {
      if (paymentMethod !== "razorpay") {
        return res.status(400).json({
          success: false,
          message:
            "Only Razorpay payment is supported",
        });
      }

      booking.paymentMethod = "razorpay";
    }

    await booking.save();

    return res.status(200).json({
      success: true,
      message:
        "Hotel booking updated successfully",
      booking,
    });
  } catch (error) {
    console.error(
      "Update Hotel Booking Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ======================================================
// CANCEL HOTEL BOOKING - USER
// ======================================================

const cancelHotelBooking = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { bookingId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required",
      });
    }

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required",
      });
    }

    const booking = await HotelBooking.findOne({
      bookingId,
      user: userId,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Hotel booking not found",
      });
    }

    if (
      booking.bookingStatus === "cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Hotel booking is already cancelled",
      });
    }

    if (
      booking.bookingStatus === "completed"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Completed booking cannot be cancelled",
      });
    }

    booking.bookingStatus = "cancelled";

    await booking.save();

    return res.status(200).json({
      success: true,
      message:
        "Hotel booking cancelled successfully",
      booking,
    });
  } catch (error) {
    console.error(
      "Cancel Hotel Booking Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ======================================================
// CANCEL HOTEL BOOKING - ADMIN
// ======================================================

const adminCancelHotelBooking = async (
  req,
  res
) => {
  try {
    const { bookingId } = req.params;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required",
      });
    }

    const booking = await HotelBooking.findOne({
      bookingId,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Hotel booking not found",
      });
    }

    // Already cancelled
    if (
      booking.bookingStatus === "cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Hotel booking is already cancelled",
      });
    }

    // Completed booking
    if (
      booking.bookingStatus === "completed"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Completed booking cannot be cancelled",
      });
    }

    // ==================================================
    // CANCEL BOOKING
    // ==================================================

    booking.bookingStatus = "cancelled";

    await booking.save();

    return res.status(200).json({
      success: true,
      message:
        "Hotel booking cancelled successfully by admin",
      booking,
    });
  } catch (error) {
    console.error(
      "Admin Cancel Hotel Booking Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ======================================================
// DELETE HOTEL BOOKING - ADMIN
// ======================================================

const deleteHotelBooking = async (
  req,
  res
) => {
  try {
    const { bookingId } = req.params;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required",
      });
    }

    const booking = await HotelBooking.findOne({
      bookingId,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Hotel booking not found",
      });
    }

    if (
      booking.bookingStatus === "completed"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Completed booking cannot be deleted",
      });
    }

    await HotelBooking.findOneAndDelete({
      bookingId,
    });

    return res.status(200).json({
      success: true,
      message:
        "Hotel booking deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Hotel Booking Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ======================================================
// CREATE HOTEL RAZORPAY ORDER
// ======================================================

const createHotelRazorpayOrder = async (
  req,
  res
) => {
  try {
    const userId = req.user?.userId;
    const { bookingId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "User ID not found in token",
      });
    }

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required",
      });
    }

    const booking = await HotelBooking.findOne({
      bookingId,
      user: userId,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Hotel booking not found",
      });
    }

    if (
      booking.bookingStatus === "cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Cancelled booking cannot be paid",
      });
    }

    if (
      booking.paymentStatus === "paid"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "This booking has already been paid",
      });
    }

    const totalAmount = Number(
      booking.totalAmount
    );

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking amount",
      });
    }

    // ==================================================
    // CHECK EXISTING PAYMENT
    // ==================================================

    const existingPayment =
      await Payment.findOne({
        booking: booking._id,
        user: userId,
        bookingType: "Hotel",
        status: {
          $in: ["Created", "Pending"],
        },
      }).sort({ createdAt: -1 });

    if (existingPayment) {
      return res.status(200).json({
        success: true,
        message:
          "Existing Razorpay order found",

        razorpayKey:
          process.env.RAZORPAY_KEY_ID,

        order: {
          id: existingPayment.razorpayOrderId,
          amount: Math.round(
            totalAmount * 100
          ),
          currency:
            existingPayment.currency,
          receipt: booking.bookingId,
        },

        payment: {
          id: existingPayment._id,
          bookingId:
            existingPayment.bookingId,
          amount:
            existingPayment.amount,
          status:
            existingPayment.status,
        },

        booking,
      });
    }

    // ==================================================
    // INR TO PAISE
    // ==================================================

    const amountInPaise = Math.round(
      totalAmount * 100
    );

    // ==================================================
    // CREATE RAZORPAY ORDER
    // ==================================================

    const razorpayOrder =
      await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: booking.bookingId,

        notes: {
          bookingId: booking.bookingId,
          bookingType: "Hotel",
          userId: userId.toString(),
        },
      });

    // ==================================================
    // CREATE PAYMENT
    // ==================================================

    const payment = await Payment.create({
      user: userId,
      booking: booking._id,
      bookingId: booking.bookingId,
      bookingType: "Hotel",

      razorpayOrderId:
        razorpayOrder.id,

      amount: totalAmount,

      currency: "INR",

      status: "Created",
    });

    return res.status(201).json({
      success: true,
      message:
        "Hotel Razorpay order created successfully",

      razorpayKey:
        process.env.RAZORPAY_KEY_ID,

      order: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency:
          razorpayOrder.currency,
        receipt:
          razorpayOrder.receipt,
      },

      payment: {
        id: payment._id,
        bookingId:
          payment.bookingId,
        amount: payment.amount,
        status:
          payment.status,
      },

      booking,
    });
  } catch (error) {
    console.error(
      "Create Hotel Razorpay Order Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create hotel Razorpay order",
      error: error.message,
    });
  }
};

// ======================================================
// VERIFY HOTEL RAZORPAY PAYMENT
// ======================================================

const verifyHotelRazorpayPayment = async (
  req,
  res
) => {
  try {
    const userId = req.user?.userId;
    const { bookingId } = req.params;

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "User ID not found in token",
      });
    }

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required",
      });
    }

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message:
          "razorpay_order_id, razorpay_payment_id and razorpay_signature are required",
      });
    }

    const booking = await HotelBooking.findOne({
      bookingId,
      user: userId,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Hotel booking not found",
      });
    }

    if (
      booking.bookingStatus === "cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Cancelled booking cannot be paid",
      });
    }

    const payment = await Payment.findOne({
      booking: booking._id,
      user: userId,
      bookingType: "Hotel",
      razorpayOrderId:
        razorpay_order_id,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found",
      });
    }

    // ==================================================
    // AMOUNT CHECK
    // ==================================================

    if (
      Number(payment.amount) !==
      Number(booking.totalAmount)
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment amount mismatch",
      });
    }

    // ==================================================
    // IDEMPOTENCY
    // ==================================================

    if (payment.status === "Paid") {
      if (
        payment.razorpayPaymentId ===
        razorpay_payment_id
      ) {
        return res.status(200).json({
          success: true,
          message:
            "Hotel payment already completed successfully",

          booking: {
            id: booking._id,
            bookingId:
              booking.bookingId,
            paymentStatus:
              booking.paymentStatus,
            bookingStatus:
              booking.bookingStatus,
          },

          payment: {
            id: payment._id,
            razorpayOrderId:
              payment.razorpayOrderId,
            razorpayPaymentId:
              payment.razorpayPaymentId,
            status: payment.status,
            paidAt: payment.paidAt,
          },
        });
      }

      return res.status(400).json({
        success: false,
        message:
          "This payment order has already been completed",
      });
    }

    // ==================================================
    // SIGNATURE
    // ==================================================

    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET
        )
        .update(
          `${razorpay_order_id}|${razorpay_payment_id}`
        )
        .digest("hex");

    if (
      generatedSignature !==
      razorpay_signature
    ) {
      payment.status = "Failed";
      payment.failureReason =
        "Invalid Razorpay signature";

      await payment.save();

      return res.status(400).json({
        success: false,
        message:
          "Invalid Razorpay payment signature",
      });
    }

    // ==================================================
    // PAYMENT SUCCESS
    // ==================================================

    payment.razorpayPaymentId =
      razorpay_payment_id;

    payment.razorpaySignature =
      razorpay_signature;

    payment.status = "Paid";
    payment.paidAt = new Date();
    payment.failureReason = undefined;

    await payment.save();

    // ==================================================
    // BOOKING CONFIRM
    // ==================================================

    booking.paymentStatus = "paid";
    booking.bookingStatus = "confirmed";

    await booking.save();

    return res.status(200).json({
      success: true,
      message:
        "Hotel Razorpay payment verified successfully",

      booking: {
        id: booking._id,
        bookingId:
          booking.bookingId,
        paymentStatus:
          booking.paymentStatus,
        bookingStatus:
          booking.bookingStatus,
      },

      payment: {
        id: payment._id,
        razorpayOrderId:
          payment.razorpayOrderId,
        razorpayPaymentId:
          payment.razorpayPaymentId,
        status: payment.status,
        paidAt: payment.paidAt,
      },
    });
  } catch (error) {
    console.error(
      "Verify Hotel Razorpay Payment Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to verify hotel Razorpay payment",
      error: error.message,
    });
  }
};

// ======================================================
// HANDLE HOTEL PAYMENT FAILURE
// ======================================================

const handleHotelPaymentFailure = async (
  req,
  res
) => {
  try {
    const userId = req.user?.userId;
    const { bookingId } = req.params;

    const {
      razorpay_payment_id,
      razorpay_order_id,
      reason,
    } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "User ID not found in token",
      });
    }

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required",
      });
    }

    const booking = await HotelBooking.findOne({
      bookingId,
      user: userId,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Hotel booking not found",
      });
    }

    if (
      booking.paymentStatus === "paid"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Paid booking cannot be marked as failed",
      });
    }

    if (!razorpay_order_id) {
      return res.status(400).json({
        success: false,
        message:
          "Razorpay order ID is required",
      });
    }

    const payment = await Payment.findOne({
      booking: booking._id,
      user: userId,
      bookingType: "Hotel",
      razorpayOrderId:
        razorpay_order_id,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found",
      });
    }

    if (payment.status === "Paid") {
      return res.status(400).json({
        success: false,
        message:
          "Paid payment cannot be marked as failed",
      });
    }

    payment.razorpayPaymentId =
      razorpay_payment_id ||
      payment.razorpayPaymentId;

    payment.status = "Failed";

    payment.failureReason =
      reason || "Razorpay payment failed";

    await payment.save();

    booking.paymentStatus = "failed";
    booking.bookingStatus = "pending";

    await booking.save();

    return res.status(200).json({
      success: true,
      message:
        "Hotel payment failure recorded successfully",

      booking: {
        id: booking._id,
        bookingId:
          booking.bookingId,
        paymentStatus:
          booking.paymentStatus,
        bookingStatus:
          booking.bookingStatus,
      },

      payment: {
        id: payment._id,
        razorpayOrderId:
          payment.razorpayOrderId,
        razorpayPaymentId:
          payment.razorpayPaymentId,
        status: payment.status,
        failureReason:
          payment.failureReason,
      },
    });
  } catch (error) {
    console.error(
      "Hotel Payment Failure Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to record hotel payment failure",
      error: error.message,
    });
  }
};

// ======================================================
// RAZORPAY WEBHOOK
// ======================================================

const handleHotelPaymentWebhook = async (
  req,
  res
) => {
  try {
    const webhookSignature =
      req.headers["x-razorpay-signature"];

    if (!webhookSignature) {
      return res.status(400).json({
        success: false,
        message:
          "Razorpay webhook signature missing",
      });
    }

    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_WEBHOOK_SECRET
        )
        .update(req.body)
        .digest("hex");

    if (
      expectedSignature !==
      webhookSignature
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid Razorpay webhook signature",
      });
    }

    const eventData = JSON.parse(
      req.body.toString()
    );

    const event = eventData.event;

    console.log(
      "Hotel Razorpay Webhook Event:",
      event
    );

    // ==================================================
    // PAYMENT FAILED
    // ==================================================

    if (event === "payment.failed") {
      const paymentEntity =
        eventData.payload?.payment?.entity;

      if (!paymentEntity) {
        return res.status(400).json({
          success: false,
          message:
            "Payment data not found",
        });
      }

      const razorpayOrderId =
        paymentEntity.order_id;

      const razorpayPaymentId =
        paymentEntity.id;

      const failureReason =
        paymentEntity.error_description ||
        paymentEntity.error_reason ||
        "Razorpay payment failed";

      const payment =
        await Payment.findOne({
          razorpayOrderId,
          bookingType: "Hotel",
        });

      if (!payment) {
        return res.status(200).json({
          success: true,
          message:
            "Webhook received, payment record not found",
        });
      }

      if (payment.status === "Paid") {
        return res.status(200).json({
          success: true,
          message:
            "Payment already marked as paid",
        });
      }

      payment.razorpayPaymentId =
        razorpayPaymentId;

      payment.status = "Failed";

      payment.failureReason =
        failureReason;

      await payment.save();

      const booking =
        await HotelBooking.findById(
          payment.booking
        );

      if (booking) {
        booking.paymentStatus = "failed";
        booking.bookingStatus = "pending";

        await booking.save();
      }
    }

    // ==================================================
    // PAYMENT CAPTURED
    // ==================================================

    if (event === "payment.captured") {
      const paymentEntity =
        eventData.payload?.payment?.entity;

      if (!paymentEntity) {
        return res.status(400).json({
          success: false,
          message:
            "Payment data not found",
        });
      }

      const razorpayOrderId =
        paymentEntity.order_id;

      const razorpayPaymentId =
        paymentEntity.id;

      const payment =
        await Payment.findOne({
          razorpayOrderId,
          bookingType: "Hotel",
        });

      if (!payment) {
        return res.status(200).json({
          success: true,
          message:
            "Webhook received, payment record not found",
        });
      }

      if (payment.status === "Paid") {
        return res.status(200).json({
          success: true,
          message:
            "Payment already processed",
        });
      }

      // ==================================================
      // AMOUNT CHECK
      // ==================================================

      const webhookAmount =
        Number(paymentEntity.amount);

      const expectedAmount =
        Math.round(
          Number(payment.amount) * 100
        );

      if (
        webhookAmount !== expectedAmount
      ) {
        console.error(
          "Hotel Razorpay webhook amount mismatch",
          {
            expectedAmount,
            webhookAmount,
            razorpayOrderId,
          }
        );

        return res.status(400).json({
          success: false,
          message:
            "Webhook payment amount mismatch",
        });
      }

      payment.razorpayPaymentId =
        razorpayPaymentId;

      payment.status = "Paid";

      payment.paidAt = new Date();

      payment.failureReason =
        undefined;

      await payment.save();

      const booking =
        await HotelBooking.findById(
          payment.booking
        );

      if (booking) {
        booking.paymentStatus = "paid";
        booking.bookingStatus = "confirmed";

        await booking.save();
      }
    }

    return res.status(200).json({
      success: true,
      message:
        "Hotel webhook processed successfully",
    });
  } catch (error) {
    console.error(
      "Hotel Payment Webhook Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Hotel webhook processing failed",
      error: error.message,
    });
  }
};

// ======================================================
// EXPORTS
// ======================================================

module.exports = {
  // User
  createHotelBooking,
  getHotelBookingByBookingId,
  updateHotelBooking,
  cancelHotelBooking,

  // Admin
  getAllHotelBookings,
  adminCancelHotelBooking,
  deleteHotelBooking,

  // Razorpay
  createHotelRazorpayOrder,
  verifyHotelRazorpayPayment,
  handleHotelPaymentFailure,
  handleHotelPaymentWebhook,
};