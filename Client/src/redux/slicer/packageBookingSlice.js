import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

// =====================================================
// CREATE PACKAGE BOOKING
// POST /api/package-bookings/
// =====================================================

export const createPackageBooking = createAsyncThunk(
  "packageBooking/createPackageBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/package-bookings",
        bookingData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create package booking"
      );
    }
  }
);

// =====================================================
// GET MY PACKAGE BOOKINGS
// GET /api/package-bookings/
// =====================================================

export const getMyPackageBookings = createAsyncThunk(
  "packageBooking/getMyPackageBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        "/package-bookings"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch package bookings"
      );
    }
  }
);

// =====================================================
// GET ALL PACKAGE BOOKINGS - ADMIN
// GET /api/package-bookings/admin/all
// =====================================================

export const getAllPackageBookings = createAsyncThunk(
  "packageBooking/getAllPackageBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        "/package-bookings/all"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch all package bookings"
      );
    }
  }
);

// =====================================================
// GET SINGLE PACKAGE BOOKING
// GET /api/package-bookings/:id
// =====================================================

export const getSinglePackageBooking = createAsyncThunk(
  "packageBooking/getSinglePackageBooking",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/package-bookings/${id}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch package booking"
      );
    }
  }
);

// =====================================================
// CANCEL PACKAGE BOOKING
// PUT /api/package-bookings/:id/cancel
// =====================================================

export const cancelPackageBooking = createAsyncThunk(
  "packageBooking/cancelPackageBooking",
  async (
    { id, cancellationReason },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(
        `/package-bookings/${id}/cancel`,
        {
          cancellationReason,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to cancel package booking"
      );
    }
  }
);


export const adminCancelPackageBooking = createAsyncThunk(
  "packageBooking/adminCancelPackageBooking",
  async (
    { id, cancellationReason },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(
        `/package-bookings/admin/${id}/cancel`,
        {
          cancellationReason,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to cancel package booking"
      );
    }
  }
);


// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  bookings: [],
  booking: null,

  loading: false,
  createLoading: false,
  singleLoading: false,
  cancelLoading: false,

  success: false,

  message: "",
  error: null,
};

// =====================================================
// SLICE
// =====================================================

const packageBookingSlice = createSlice({
  name: "packageBooking",

  initialState,

  reducers: {
    // =================================================
    // CLEAR ERROR
    // =================================================

    clearPackageBookingError: (state) => {
      state.error = null;
    },

    // =================================================
    // CLEAR MESSAGE
    // =================================================

    clearPackageBookingMessage: (state) => {
      state.message = "";
    },

    // =================================================
    // CLEAR COMPLETE STATE
    // =================================================

    clearPackageBookingState: (state) => {
      state.bookings = [];
      state.booking = null;

      state.loading = false;
      state.createLoading = false;
      state.singleLoading = false;
      state.cancelLoading = false;

      state.success = false;

      state.message = "";
      state.error = null;
    },

    // =================================================
    // CLEAR SELECTED BOOKING
    // =================================================

    clearSelectedPackageBooking: (state) => {
      state.booking = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =================================================
      // CREATE PACKAGE BOOKING
      // =================================================

      .addCase(
        createPackageBooking.pending,
        (state) => {
          state.createLoading = true;
          state.loading = true;
          state.success = false;
          state.error = null;
          state.message = "";
        }
      )

      .addCase(
        createPackageBooking.fulfilled,
        (state, action) => {
          state.createLoading = false;
          state.loading = false;

          state.success = true;
          state.error = null;

          state.booking =
            action.payload?.booking || null;

          state.message =
            action.payload?.message ||
            "Package booking created successfully";
        }
      )

      .addCase(
        createPackageBooking.rejected,
        (state, action) => {
          state.createLoading = false;
          state.loading = false;

          state.success = false;

          state.error =
            action.payload ||
            "Failed to create package booking";

          state.message = "";
        }
      )

      // =================================================
      // GET MY PACKAGE BOOKINGS
      // =================================================

      .addCase(
        getMyPackageBookings.pending,
        (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
        }
      )

      .addCase(
        getMyPackageBookings.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;

          state.bookings =
            action.payload?.bookings || [];

          state.message =
            action.payload?.message || "";
        }
      )

      .addCase(
        getMyPackageBookings.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Failed to fetch package bookings";
        }
      )

      // =================================================
      // GET ALL PACKAGE BOOKINGS - ADMIN
      // =================================================

      .addCase(
        getAllPackageBookings.pending,
        (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
        }
      )

      .addCase(
        getAllPackageBookings.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;

          state.bookings =
            action.payload?.bookings || [];

          state.message =
            action.payload?.message || "";
        }
      )

      .addCase(
        getAllPackageBookings.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Failed to fetch all package bookings";
        }
      )

      // =================================================
      // GET SINGLE PACKAGE BOOKING
      // =================================================

      .addCase(
        getSinglePackageBooking.pending,
        (state) => {
          state.singleLoading = true;
          state.error = null;
        }
      )

      .addCase(
        getSinglePackageBooking.fulfilled,
        (state, action) => {
          state.singleLoading = false;
          state.success = true;
          state.error = null;

          state.booking =
            action.payload?.booking || null;

          state.message =
            action.payload?.message || "";
        }
      )

      .addCase(
        getSinglePackageBooking.rejected,
        (state, action) => {
          state.singleLoading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Failed to fetch package booking";
        }
      )

      // =================================================
      // CANCEL PACKAGE BOOKING
      // =================================================

      .addCase(
        cancelPackageBooking.pending,
        (state) => {
          state.cancelLoading = true;
          state.success = false;
          state.error = null;
        }
      )

      .addCase(
        cancelPackageBooking.fulfilled,
        (state, action) => {
          state.cancelLoading = false;
          state.success = true;
          state.error = null;

          const updatedBooking =
            action.payload?.booking;

          // Update selected booking
          state.booking =
            updatedBooking || state.booking;

          // Success message
          state.message =
            action.payload?.message ||
            "Package booking cancelled successfully";

          // Update booking inside bookings list
          if (updatedBooking?._id) {
            const index =
              state.bookings.findIndex(
                (item) =>
                  item._id === updatedBooking._id
              );

            if (index !== -1) {
              state.bookings[index] =
                updatedBooking;
            }
          }
        }
      )

      .addCase(
        cancelPackageBooking.rejected,
        (state, action) => {
          state.cancelLoading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Failed to cancel package booking";
        }
      )

      .addCase(
        adminCancelPackageBooking.pending,
        (state) => {
          state.cancelLoading = true;
          state.success = false;
          state.error = null;
        }
      )

      .addCase(
        adminCancelPackageBooking.fulfilled,
        (state, action) => {
          state.cancelLoading = false;
          state.success = true;
          state.error = null;

          const updatedBooking =
            action.payload?.booking;

          // Update selected booking
          state.booking =
            updatedBooking || state.booking;

          // Success message
          state.message =
            action.payload?.message ||
            "Package booking cancelled successfully";

          // Update booking inside bookings list
          if (updatedBooking?._id) {
            const index =
              state.bookings.findIndex(
                (item) =>
                  item._id === updatedBooking._id
              );

            if (index !== -1) {
              state.bookings[index] =
                updatedBooking;
            }
          }
        }
      )

      .addCase(
        adminCancelPackageBooking.rejected,
        (state, action) => {
          state.cancelLoading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Failed to cancel package booking";
        }
      )
  },
});

// =====================================================
// ACTIONS
// =====================================================

export const {
  clearPackageBookingError,
  clearPackageBookingMessage,
  clearPackageBookingState,
  clearSelectedPackageBooking,
} = packageBookingSlice.actions;

// =====================================================
// REDUCER
// =====================================================

export default packageBookingSlice.reducer;