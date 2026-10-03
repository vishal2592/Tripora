import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

// ======================================================
// GET MY BOOKINGS
// GET /api/bookings/my-bookings
// ======================================================

export const getMyBookings = createAsyncThunk(
  "myBooking/getMyBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/bookings/my-bookings");

      return response.data;
    } catch (error) {
      console.error("Fetch My Bookings Error:", error);

      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to load your bookings"
      );
    }
  }
);

// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {
  bookings: [],

  summary: {
    totalTrips: 0,
    upcoming: 0,
    completed: 0,
    cancelled: 0,
  },

  count: 0,

  loading: false,
  error: null,

  success: false,
};

// ======================================================
// SLICE
// ======================================================

const myBookingSlice = createSlice({
  name: "myBooking",

  initialState,

  reducers: {
    // Clear error
    clearMyBookingError: (state) => {
      state.error = null;
    },

    // Clear success
    clearMyBookingSuccess: (state) => {
      state.success = false;
    },

    // Reset complete My Booking state
    resetMyBookings: (state) => {
      state.bookings = [];

      state.summary = {
        totalTrips: 0,
        upcoming: 0,
        completed: 0,
        cancelled: 0,
      };

      state.count = 0;

      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },

  // ====================================================
  // ASYNC THUNK REDUCERS
  // ====================================================

  extraReducers: (builder) => {
    builder

      // -----------------------------------------------
      // PENDING
      // -----------------------------------------------

      .addCase(getMyBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      // -----------------------------------------------
      // SUCCESS
      // -----------------------------------------------

      .addCase(getMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.bookings = action.payload?.bookings || [];

        state.count = action.payload?.count || 0;

        state.summary = {
          totalTrips:
            action.payload?.summary?.totalTrips || 0,

          upcoming:
            action.payload?.summary?.upcoming || 0,

          completed:
            action.payload?.summary?.completed || 0,

          cancelled:
            action.payload?.summary?.cancelled || 0,
        };
      })

      // -----------------------------------------------
      // ERROR
      // -----------------------------------------------

      .addCase(getMyBookings.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        state.error =
          action.payload || "Failed to load bookings";

        state.bookings = [];

        state.count = 0;

        state.summary = {
          totalTrips: 0,
          upcoming: 0,
          completed: 0,
          cancelled: 0,
        };
      });
  },
});

// ======================================================
// EXPORT REDUCERS
// ======================================================

export const {
  clearMyBookingError,
  clearMyBookingSuccess,
  resetMyBookings,
} = myBookingSlice.actions;

// ======================================================
// EXPORT REDUCER
// ======================================================

export default myBookingSlice.reducer;