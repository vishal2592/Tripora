
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
// GET ALL HOTEL BOOKINGS
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
// CANCEL HOTEL BOOKING
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

  // =======================================================
  // TEMPORARY BOOKING DATA
  // Used between Hotel Details → Hotel Booking page
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
      const { checkIn, checkOut, nights } = action.payload;

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
    // =======================================================
    // CREATE BOOKING
    // =======================================================

    builder

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
      );

    // =======================================================
    // GET ALL BOOKINGS
    // =======================================================

    builder

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
      );

    // =======================================================
    // GET SINGLE BOOKING
    // =======================================================

    builder

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
      );

    // =======================================================
    // UPDATE BOOKING
    // =======================================================

    builder

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
      );

    // =======================================================
    // CANCEL BOOKING
    // =======================================================

    builder

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

          // Update booking in bookings list
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
