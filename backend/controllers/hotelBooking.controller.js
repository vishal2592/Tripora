const HotelBooking = require("../models/hotelBooking.model");
const Hotel = require("../models/hotel.model");
const Payment = require("../models/payment.model");
const razorpay = require("../config/razorpay");
const crypto = require("crypto");
const createHotelBooking = async (req, res) => {
  try {
    // ==========================================
    // GET LOGGED-IN USER ID FROM JWT
    // ==========================================

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

    // ==========================================
    // CHECK REQUIRED FIELDS
    // ==========================================

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

    // ==========================================
    // CHECK HOTEL EXISTS
    // ==========================================

    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    // ==========================================
    // GUEST DETAILS VALIDATION
    // ==========================================

    const { firstName, lastName, email, countryCode, mobile, specialRequest } =
      guestDetails;

    if (!firstName || !lastName || !email || !mobile) {
      return res.status(400).json({
        success: false,
        message: "Guest details are incomplete",
      });
    }

    // ==========================================
    // VALIDATE DATES
    // ==========================================

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

    // ==========================================
    // VALIDATE NUMERIC VALUES
    // ==========================================

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

    // ==========================================
    // CALCULATE ROOM TOTAL ON BACKEND
    // ==========================================

    const calculatedRoomTotal = roomPrice * bookingNights;

    // ==========================================
    // CALCULATE FINAL AMOUNT ON BACKEND
    // ==========================================

    const calculatedTotalAmount = calculatedRoomTotal + bookingTaxes;

    // ==========================================
    // CHECK FRONTEND TOTAL
    // ==========================================

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

    // ==========================================
    // GENERATE BOOKING ID
    // ==========================================

    const bookingId = `HTL${Date.now().toString().slice(-8)}`;

    // ==========================================
    // CREATE HOTEL BOOKING
    // ==========================================

    const booking = await HotelBooking.create({
      bookingId,

      // Logged-in user's MongoDB ObjectId
      user: userId,

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

    // ==========================================
    // RESPONSE
    // ==========================================

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

// Delete hotel booking
const deleteHotelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Check booking ID
    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required",
      });
    }

    // Find booking
    const booking = await HotelBooking.findOne({ bookingId });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Hotel booking not found",
      });
    }

    // Prevent deleting completed booking
    if (booking.bookingStatus === "completed") {
      return res.status(400).json({
        success: false,
        message: "Completed booking cannot be deleted",
      });
    }

    // Delete booking
    await HotelBooking.findOneAndDelete({ bookingId });

    return res.status(200).json({
      success: true,
      message: "Hotel booking deleted successfully",
    });
  } catch (error) {
    console.error("Delete Hotel Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ==========================================
// CREATE HOTEL RAZORPAY ORDER
// ==========================================

const createHotelRazorpayOrder = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { bookingId } = req.params;

    // ==========================================
    // USER ID CHECK
    // ==========================================

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in token",
      });
    }

    // ==========================================
    // BOOKING ID CHECK
    // ==========================================

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required",
      });
    }

    // ==========================================
    // FIND HOTEL BOOKING
    // ==========================================

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

    // ==========================================
    // CANCELLED BOOKING CHECK
    // ==========================================

    if (booking.bookingStatus === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Cancelled booking cannot be paid",
      });
    }

    // ==========================================
    // AMOUNT FROM DATABASE
    // ==========================================

    const totalAmount = Number(booking.totalAmount);

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking amount",
      });
    }

    // ==========================================
    // CONVERT INR TO PAISE
    // ==========================================

    const amountInPaise = Math.round(totalAmount * 100);

    // ==========================================
    // CREATE RAZORPAY ORDER
    // ==========================================

    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: booking.bookingId,
      notes: {
        bookingId: booking.bookingId,
        bookingType: "Hotel",
        userId: userId.toString(),
      },
    });

    // ==========================================
    // CREATE PAYMENT RECORD
    // ==========================================

    const payment = await Payment.create({
      user: userId,
      booking: booking._id,
      bookingId: booking.bookingId,
      bookingType: "Hotel",
      razorpayOrderId: razorpayOrder.id,
      amount: totalAmount,
      currency: "INR",
      status: "Created",
    });

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(201).json({
      success: true,
      message: "Hotel Razorpay order created successfully",

      // Only PUBLIC Razorpay Key ID
      razorpayKey: process.env.RAZORPAY_KEY_ID,

      order: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        receipt: razorpayOrder.receipt,
      },

      payment: {
        id: payment._id,
        bookingId: payment.bookingId,
        amount: payment.amount,
        status: payment.status,
      },

      booking,
    });
  } catch (error) {
    console.error("Create Hotel Razorpay Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create hotel Razorpay order",
      error: error.message,
    });
  }
};

// ==========================================
// VERIFY HOTEL RAZORPAY PAYMENT
// ==========================================

// ==========================================
// VERIFY HOTEL RAZORPAY PAYMENT
// ==========================================

const verifyHotelRazorpayPayment = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { bookingId } = req.params;

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // ==========================================
    // USER ID CHECK
    // ==========================================

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in token",
      });
    }

    // ==========================================
    // BOOKING ID CHECK
    // ==========================================

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required",
      });
    }

    // ==========================================
    // RAZORPAY FIELDS CHECK
    // ==========================================

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message:
          "razorpay_order_id, razorpay_payment_id and razorpay_signature are required",
      });
    }

    // ==========================================
    // FIND HOTEL BOOKING
    // ==========================================

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

    // ==========================================
    // CANCELLED BOOKING CHECK
    // ==========================================

    if (booking.bookingStatus === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Cancelled booking cannot be paid",
      });
    }

    // ==========================================
    // FIND PAYMENT RECORD
    // ==========================================

    const payment = await Payment.findOne({
      booking: booking._id,
      user: userId,
      bookingType: "Hotel",
      razorpayOrderId: razorpay_order_id,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found",
      });
    }

    // ==========================================
    // IDEMPOTENT PAYMENT CHECK
    // ==========================================

    if (payment.status === "Paid") {
      // Same payment already processed
      // by webhook or previous verify request
      if (payment.razorpayPaymentId === razorpay_payment_id) {
        return res.status(200).json({
          success: true,
          message: "Hotel payment already completed successfully",

          booking: {
            id: booking._id,
            bookingId: booking.bookingId,
            paymentStatus: booking.paymentStatus,
            bookingStatus: booking.bookingStatus,
          },

          payment: {
            id: payment._id,
            razorpayOrderId: payment.razorpayOrderId,
            razorpayPaymentId: payment.razorpayPaymentId,
            status: payment.status,
            paidAt: payment.paidAt,
          },
        });
      }

      // Different payment ID for
      // an already paid order
      return res.status(400).json({
        success: false,
        message: "This payment order has already been completed",
      });
    }

    // ==========================================
    // GENERATE RAZORPAY SIGNATURE
    // ==========================================

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // ==========================================
    // VERIFY SIGNATURE
    // ==========================================

    if (generatedSignature !== razorpay_signature) {
      payment.status = "Failed";
      payment.failureReason = "Invalid Razorpay signature";

      await payment.save();

      return res.status(400).json({
        success: false,
        message: "Invalid Razorpay payment signature",
      });
    }

    // ==========================================
    // PAYMENT VERIFIED
    // ==========================================

    payment.razorpayPaymentId = razorpay_payment_id;

    payment.razorpaySignature = razorpay_signature;

    payment.status = "Paid";
    payment.paidAt = new Date();

    await payment.save();

    // ==========================================
    // UPDATE HOTEL BOOKING
    // ==========================================

    booking.paymentStatus = "paid";
    booking.bookingStatus = "confirmed";

    await booking.save();

    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,
      message: "Hotel Razorpay payment verified successfully",

      booking: {
        id: booking._id,
        bookingId: booking.bookingId,
        paymentStatus: booking.paymentStatus,
        bookingStatus: booking.bookingStatus,
      },

      payment: {
        id: payment._id,
        razorpayOrderId: payment.razorpayOrderId,
        razorpayPaymentId: payment.razorpayPaymentId,
        status: payment.status,
        paidAt: payment.paidAt,
      },
    });
  } catch (error) {
    console.error("Verify Hotel Razorpay Payment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to verify hotel Razorpay payment",
      error: error.message,
    });
  }
};

// ==========================================
// HANDLE HOTEL RAZORPAY PAYMENT FAILURE
// ==========================================

const handleHotelPaymentFailure = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { bookingId } = req.params;

    const { razorpay_payment_id, razorpay_order_id, reason } = req.body;

    // ==========================================
    // USER ID CHECK
    // ==========================================

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in token",
      });
    }

    // ==========================================
    // BOOKING ID CHECK
    // ==========================================

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required",
      });
    }

    // ==========================================
    // FIND HOTEL BOOKING
    // ==========================================

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

    // ==========================================
    // ALREADY PAID CHECK
    // ==========================================

    if (booking.paymentStatus === "paid") {
      return res.status(400).json({
        success: false,
        message: "Paid booking cannot be marked as failed",
      });
    }

    // ==========================================
    // FIND PAYMENT RECORD
    // ==========================================

    const payment = await Payment.findOne({
      booking: booking._id,
      user: userId,
      bookingType: "Hotel",
      razorpayOrderId: razorpay_order_id,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found",
      });
    }

    // ==========================================
    // ALREADY PAID PAYMENT CHECK
    // ==========================================

    if (payment.status === "Paid") {
      return res.status(400).json({
        success: false,
        message: "Paid payment cannot be marked as failed",
      });
    }

    // ==========================================
    // UPDATE PAYMENT
    // ==========================================

    payment.razorpayPaymentId =
      razorpay_payment_id || payment.razorpayPaymentId;

    payment.status = "Failed";

    payment.failureReason = reason || "Razorpay payment failed";

    await payment.save();

    // ==========================================
    // UPDATE HOTEL BOOKING
    // ==========================================

    booking.paymentStatus = "failed";
    booking.bookingStatus = "pending";

    await booking.save();

    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,
      message: "Hotel payment failure recorded successfully",

      booking: {
        id: booking._id,
        bookingId: booking.bookingId,
        paymentStatus: booking.paymentStatus,
        bookingStatus: booking.bookingStatus,
      },

      payment: {
        id: payment._id,
        razorpayOrderId: payment.razorpayOrderId,
        razorpayPaymentId: payment.razorpayPaymentId,
        status: payment.status,
        failureReason: payment.failureReason,
      },
    });
  } catch (error) {
    console.error("Hotel Payment Failure Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to record hotel payment failure",
      error: error.message,
    });
  }
};

const handleHotelPaymentWebhook = async (req, res) => {
  try {
    const webhookSignature = req.headers["x-razorpay-signature"];

    if (!webhookSignature) {
      return res.status(400).json({
        success: false,
        message: "Razorpay webhook signature missing",
      });
    }

    // Verify Razorpay webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(req.body)
      .digest("hex");

    if (expectedSignature !== webhookSignature) {
      return res.status(400).json({
        success: false,
        message: "Invalid Razorpay webhook signature",
      });
    }

    // Raw body ko JSON me convert karo
    const eventData = JSON.parse(req.body.toString());

    const event = eventData.event;

    console.log("Hotel Razorpay Webhook Event:", event);

    // ------------------------------------------------
    // PAYMENT FAILED
    // ------------------------------------------------

    if (event === "payment.failed") {
      const paymentEntity = eventData.payload?.payment?.entity;

      if (!paymentEntity) {
        return res.status(400).json({
          success: false,
          message: "Payment data not found",
        });
      }

      const razorpayOrderId = paymentEntity.order_id;
      const razorpayPaymentId = paymentEntity.id;

      const failureReason =
        paymentEntity.error_description ||
        paymentEntity.error_reason ||
        "Razorpay payment failed";

      const payment = await Payment.findOne({
        razorpayOrderId,
        bookingType: "Hotel",
      });

      if (!payment) {
        console.log("Hotel payment record not found:", razorpayOrderId);

        return res.status(200).json({
          success: true,
          message: "Webhook received, payment record not found",
        });
      }

      payment.razorpayPaymentId = razorpayPaymentId;
      payment.status = "Failed";
      payment.failureReason = failureReason;

      await payment.save();

      const booking = await HotelBooking.findById(payment.booking);

      if (booking) {
        booking.paymentStatus = "failed";
        booking.bookingStatus = "pending";

        await booking.save();
      }

      console.log("Hotel payment marked as Failed:", razorpayPaymentId);
    }

    // ------------------------------------------------
    // PAYMENT CAPTURED
    // ------------------------------------------------

    if (event === "payment.captured") {
      const paymentEntity = eventData.payload?.payment?.entity;

      if (!paymentEntity) {
        return res.status(400).json({
          success: false,
          message: "Payment data not found",
        });
      }

      const razorpayOrderId = paymentEntity.order_id;
      const razorpayPaymentId = paymentEntity.id;

      const payment = await Payment.findOne({
        razorpayOrderId,
        bookingType: "Hotel",
      });

      if (!payment) {
        console.log("Hotel payment record not found:", razorpayOrderId);

        return res.status(200).json({
          success: true,
          message: "Webhook received, payment record not found",
        });
      }

      payment.razorpayPaymentId = razorpayPaymentId;
      payment.status = "Paid";
      payment.paidAt = new Date();
      payment.failureReason = undefined;

      await payment.save();

      const booking = await HotelBooking.findById(payment.booking);

      if (booking) {
        booking.paymentStatus = "paid";
        booking.bookingStatus = "confirmed";

        await booking.save();
      }

      console.log("Hotel payment marked as Paid:", razorpayPaymentId);
    }

    return res.status(200).json({
      success: true,
      message: "Hotel webhook processed successfully",
    });
  } catch (error) {
    console.error("Hotel Payment Webhook Error:", error);

    return res.status(500).json({
      success: false,
      message: "Hotel webhook processing failed",
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
  deleteHotelBooking,
  //razorpay
  createHotelRazorpayOrder,
  verifyHotelRazorpayPayment,
  handleHotelPaymentFailure,
  handleHotelPaymentWebhook,
};
