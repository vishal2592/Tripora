import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

// =========================================================
// CREATE HOTEL BOOKING
// =========================================================

export const createHotelBooking = createAsyncThunk(
  "/hotel-bookings/create",
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/hotel-bookings",
        bookingData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Booking not created"
      );
    }
  }
);

// =========================================================
// CREATE HOTEL RAZORPAY ORDER
// =========================================================

export const createHotelRazorpayOrder = createAsyncThunk(
  "/hotel-bookings/createRazorpayOrder",
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/hotel-bookings/${bookingId}/order`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Razorpay order could not be created"
      );
    }
  }
);

// =========================================================
// VERIFY HOTEL RAZORPAY PAYMENT
// =========================================================

export const verifyHotelRazorpayPayment = createAsyncThunk(
  "/hotel-bookings/verifyRazorpayPayment",
  async ({ bookingId, paymentData }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/hotel-bookings/${bookingId}/verify`,
        paymentData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Payment verification failed"
      );
    }
  }
);

// =========================================================
// HANDLE HOTEL PAYMENT FAILURE
// =========================================================

export const handleHotelPaymentFailure = createAsyncThunk(
  "/hotel-bookings/paymentFailure",
  async (paymentData, { rejectWithValue }) => {
    try {
      const {
        bookingId,
        ...failureData
      } = paymentData;

      const response = await api.post(
        `/hotel-bookings/${bookingId}/failure`,
        failureData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Payment failure could not be processed"
      );
    }
  }
);

// =========================================================
// GET ALL HOTEL BOOKINGS - USER
// =========================================================

export const getAllBooking = createAsyncThunk(
  "/hotel-bookings/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        "/hotel-bookings"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "All booking data could not be fetched"
      );
    }
  }
);

// =========================================================
// GET ALL HOTEL BOOKINGS - ADMIN
// =========================================================

export const getAllHotelBookings = createAsyncThunk(
  "/hotel-bookings/admin/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        "/hotel-bookings/admin/all"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "All hotel bookings could not be fetched"
      );
    }
  }
);

// =========================================================
// ADMIN CANCEL HOTEL BOOKING
// =========================================================

export const adminCancelHotelBooking = createAsyncThunk(
  "/hotel-bookings/admin/cancel",
  async (
    { bookingId, cancellationReason },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(
        `/hotel-bookings/admin/${bookingId}/cancel`,
        {
          cancellationReason:
            cancellationReason ||
            "Cancelled by admin",
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to cancel hotel booking"
      );
    }
  }
);

// =========================================================
// ADMIN DELETE HOTEL BOOKING
// =========================================================

export const adminDeleteHotelBooking = createAsyncThunk(
  "/hotel-bookings/admin/delete",
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/hotel-bookings/admin/${bookingId}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete hotel booking"
      );
    }
  }
);

// =========================================================
// GET SINGLE HOTEL BOOKING
// =========================================================

export const getSingleBookingById = createAsyncThunk(
  "/hotel-bookings/getSingle",
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/hotel-bookings/${bookingId}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Single booking was not found"
      );
    }
  }
);

// =========================================================
// UPDATE HOTEL BOOKING
// =========================================================

export const updateHotelBooking = createAsyncThunk(
  "/hotel-bookings/update",
  async (
    { bookingId, bookingData },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(
        `/hotel-bookings/${bookingId}`,
        bookingData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Hotel booking update failed"
      );
    }
  }
);

// =========================================================
// CANCEL HOTEL BOOKING - USER
// =========================================================

export const cancelBooking = createAsyncThunk(
  "/hotel-bookings/cancel",
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/hotel-bookings/${bookingId}/cancel`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Hotel cancellation failed"
      );
    }
  }
);

// =========================================================
// INITIAL STATE
// =========================================================

const initialState = {
  // API states
  loading: false,
  success: false,
  error: null,
  message: "",

  // Booking returned from backend
  booking: null,

  // All bookings
  bookings: [],

  // Total count
  count: 0,

  // Razorpay order
  razorpayOrder: null,

  // Razorpay payment
  payment: null,

  // =======================================================
  // TEMPORARY BOOKING DATA
  // =======================================================

  selectedHotel: null,

  roomDetails: null,

  checkIn: "",

  checkOut: "",

  nights: 0,

  guests: 1,

  guestDetails: {
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    mobile: "",
    specialRequest: "",
  },

  roomTotal: 0,

  taxes: 0,

  totalAmount: 0,

  paymentMethod: "upi",
};

// =========================================================
// BOOKING SLICE
// =========================================================

const bookingSlice = createSlice({
  name: "booking",

  initialState,

  reducers: {
    // =======================================================
    // SET SELECTED HOTEL
    // =======================================================

    setSelectedHotel: (state, action) => {
      state.selectedHotel = action.payload;
    },

    // =======================================================
    // SET ROOM DETAILS
    // =======================================================

    setRoomDetails: (state, action) => {
      state.roomDetails = action.payload;
    },

    // =======================================================
    // SET BOOKING DATES
    // =======================================================

    setBookingDates: (state, action) => {
      const {
        checkIn,
        checkOut,
        nights,
      } = action.payload;

      state.checkIn = checkIn;
      state.checkOut = checkOut;

      if (nights !== undefined) {
        state.nights = nights;
      }
    },

    // =======================================================
    // SET NIGHTS
    // =======================================================

    setNights: (state, action) => {
      state.nights = action.payload;
    },

    // =======================================================
    // SET GUESTS
    // =======================================================

    setGuests: (state, action) => {
      state.guests = action.payload;
    },

    // =======================================================
    // SET GUEST DETAILS
    // =======================================================

    setGuestDetails: (state, action) => {
      state.guestDetails = {
        ...state.guestDetails,
        ...action.payload,
      };
    },

    // =======================================================
    // SET ROOM TOTAL
    // =======================================================

    setRoomTotal: (state, action) => {
      state.roomTotal = action.payload;
    },

    // =======================================================
    // SET TAXES
    // =======================================================

    setTaxes: (state, action) => {
      state.taxes = action.payload;
    },

    // =======================================================
    // SET TOTAL AMOUNT
    // =======================================================

    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },

    // =======================================================
    // SET PAYMENT METHOD
    // =======================================================

    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },

    // =======================================================
    // SET COMPLETE BOOKING DATA
    // =======================================================

    setBookingData: (state, action) => {
      const data = action.payload;

      state.selectedHotel =
        data.selectedHotel ??
        state.selectedHotel;

      state.roomDetails =
        data.roomDetails ??
        state.roomDetails;

      state.checkIn =
        data.checkIn ??
        state.checkIn;

      state.checkOut =
        data.checkOut ??
        state.checkOut;

      state.nights =
        data.nights ??
        state.nights;

      state.guests =
        data.guests ??
        state.guests;

      state.guestDetails = {
        ...state.guestDetails,
        ...(data.guestDetails || {}),
      };

      state.roomTotal =
        data.roomTotal ??
        state.roomTotal;

      state.taxes =
        data.taxes ??
        state.taxes;

      state.totalAmount =
        data.totalAmount ??
        state.totalAmount;

      state.paymentMethod =
        data.paymentMethod ??
        state.paymentMethod;
    },

    // =======================================================
    // CLEAR TEMPORARY BOOKING DATA
    // =======================================================

    clearBookingData: (state) => {
      state.selectedHotel = null;
      state.roomDetails = null;

      state.checkIn = "";
      state.checkOut = "";

      state.nights = 0;
      state.guests = 1;

      state.guestDetails = {
        firstName: "",
        lastName: "",
        email: "",
        countryCode: "+91",
        mobile: "",
        specialRequest: "",
      };

      state.roomTotal = 0;
      state.taxes = 0;
      state.totalAmount = 0;

      state.paymentMethod = "upi";

      state.razorpayOrder = null;
      state.payment = null;
    },

    // =======================================================
    // CLEAR API STATE
    // =======================================================

    clearBookingStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = "";
    },
  },

  // =========================================================
  // EXTRA REDUCERS
  // =========================================================

  extraReducers: (builder) => {
    builder

      // =====================================================
      // CREATE BOOKING
      // =====================================================

      .addCase(
        createHotelBooking.pending,
        (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
          state.message = "";
        }
      )

      .addCase(
        createHotelBooking.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.message =
            action.payload.message || "";

          state.booking =
            action.payload.booking || null;

          state.error = null;
        }
      )

      .addCase(
        createHotelBooking.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Booking creation failed";
        }
      )

      // =====================================================
      // CREATE RAZORPAY ORDER
      // =====================================================

      .addCase(
        createHotelRazorpayOrder.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.message = "";
        }
      )

      .addCase(
        createHotelRazorpayOrder.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;

          state.message =
            action.payload.message || "";

          state.razorpayOrder =
            action.payload.order || null;

          state.payment =
            action.payload.payment || null;

          if (action.payload.booking) {
            state.booking =
              action.payload.booking;
          }
        }
      )

      .addCase(
        createHotelRazorpayOrder.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Razorpay order creation failed";
        }
      )

      // =====================================================
      // VERIFY RAZORPAY PAYMENT
      // =====================================================

      .addCase(
        verifyHotelRazorpayPayment.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.message = "";
        }
      )

      .addCase(
        verifyHotelRazorpayPayment.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;

          state.message =
            action.payload.message || "";

          state.payment =
            action.payload.payment ||
            state.payment;

          state.booking =
            action.payload.booking ||
            state.booking;
        }
      )

      .addCase(
        verifyHotelRazorpayPayment.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Payment verification failed";
        }
      )

      // =====================================================
      // PAYMENT FAILURE
      // =====================================================

      .addCase(
        handleHotelPaymentFailure.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        handleHotelPaymentFailure.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.message =
            action.payload.message || "";

          state.payment =
            action.payload.payment ||
            state.payment;

          state.booking =
            action.payload.booking ||
            state.booking;

          state.error = null;
        }
      )

      .addCase(
        handleHotelPaymentFailure.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Payment failure handling failed";
        }
      )

      // =====================================================
      // GET ALL BOOKINGS - USER
      // =====================================================

      .addCase(
        getAllBooking.pending,
        (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
        }
      )

      .addCase(
        getAllBooking.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.bookings =
            action.payload.bookings || [];

          state.count =
            action.payload.count ||
            action.payload.bookings?.length ||
            0;

          state.message =
            action.payload.message || "";

          state.error = null;
        }
      )

      .addCase(
        getAllBooking.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Failed to fetch bookings";
        }
      )

      // =====================================================
      // GET ALL HOTEL BOOKINGS - ADMIN
      // =====================================================

      .addCase(
        getAllHotelBookings.pending,
        (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
          state.message = "";
        }
      )

      .addCase(
        getAllHotelBookings.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;

          state.bookings =
            action.payload.bookings || [];

          state.count =
            action.payload.count ||
            action.payload.bookings?.length ||
            0;

          state.message =
            action.payload.message || "";
        }
      )

      .addCase(
        getAllHotelBookings.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Failed to fetch hotel bookings";
        }
      )

      // =====================================================
      // ADMIN CANCEL HOTEL BOOKING
      // =====================================================

      .addCase(
        adminCancelHotelBooking.pending,
        (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
          state.message = "";
        }
      )

      .addCase(
        adminCancelHotelBooking.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;

          state.message =
            action.payload.message ||
            "Hotel booking cancelled successfully";

          const updatedBooking =
            action.payload.booking;

          if (updatedBooking) {
            state.booking = updatedBooking;

            state.bookings =
              state.bookings.map((item) =>
                item.bookingId ===
                updatedBooking.bookingId
                  ? updatedBooking
                  : item
              );
          }
        }
      )

      .addCase(
        adminCancelHotelBooking.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Failed to cancel hotel booking";
        }
      )

      // =====================================================
      // ADMIN DELETE HOTEL BOOKING
      // =====================================================

      .addCase(
        adminDeleteHotelBooking.pending,
        (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
          state.message = "";
        }
      )

      .addCase(
        adminDeleteHotelBooking.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;

          state.message =
            action.payload.message ||
            "Hotel booking deleted successfully";

          // Backend can return deleted booking
          const deletedBooking =
            action.payload.booking;

          if (deletedBooking?.bookingId) {
            state.bookings =
              state.bookings.filter(
                (item) =>
                  item.bookingId !==
                  deletedBooking.bookingId
              );
          } else {
            // If backend only returns success/message,
            // refresh should be done from component.
          }

          state.count =
            state.bookings.length;
        }
      )

      .addCase(
        adminDeleteHotelBooking.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Failed to delete hotel booking";
        }
      )

      // =====================================================
      // GET SINGLE BOOKING
      // =====================================================

      .addCase(
        getSingleBookingById.pending,
        (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
        }
      )

      .addCase(
        getSingleBookingById.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.booking =
            action.payload.booking || null;

          state.message =
            action.payload.message || "";

          state.error = null;
        }
      )

      .addCase(
        getSingleBookingById.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Failed to fetch booking";
        }
      )

      // =====================================================
      // UPDATE BOOKING
      // =====================================================

      .addCase(
        updateHotelBooking.pending,
        (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
        }
      )

      .addCase(
        updateHotelBooking.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.booking =
            action.payload.booking ||
            state.booking;

          state.message =
            action.payload.message || "";

          state.error = null;
        }
      )

      .addCase(
        updateHotelBooking.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Booking update failed";
        }
      )

      // =====================================================
      // CANCEL BOOKING - USER
      // =====================================================

      .addCase(
        cancelBooking.pending,
        (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
        }
      )

      .addCase(
        cancelBooking.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.booking =
            action.payload.booking ||
            state.booking;

          state.message =
            action.payload.message || "";

          state.error = null;

          if (action.payload.booking) {
            const updatedBooking =
              action.payload.booking;

            state.bookings =
              state.bookings.map((item) =>
                item.bookingId ===
                updatedBooking.bookingId
                  ? updatedBooking
                  : item
              );
          }
        }
      )

      .addCase(
        cancelBooking.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Hotel cancellation failed";
        }
      );
  },
});

// =========================================================
// EXPORT ACTIONS
// =========================================================

export const {
  setSelectedHotel,
  setRoomDetails,
  setBookingDates,
  setNights,
  setGuests,
  setGuestDetails,
  setRoomTotal,
  setTaxes,
  setTotalAmount,
  setPaymentMethod,
  setBookingData,
  clearBookingData,
  clearBookingStatus,
} = bookingSlice.actions;

// =========================================================
// EXPORT REDUCER
// =========================================================

export default bookingSlice.reducer;