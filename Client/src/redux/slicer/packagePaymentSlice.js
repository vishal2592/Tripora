import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

// =====================================================
// CREATE RAZORPAY ORDER
// POST /api/package-payment/:id/order
// =====================================================

export const createPackageRazorpayOrder = createAsyncThunk(
  "packagePayment/createPackageRazorpayOrder",
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/package-payments/${bookingId}/order`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create Razorpay order"
      );
    }
  }
);

// =====================================================
// VERIFY RAZORPAY PAYMENT
// POST /api/package-payment/:id/verify
// =====================================================

export const verifyPackageRazorpayPayment = createAsyncThunk(
  "packagePayment/verifyPackageRazorpayPayment",
  async (
    {
      bookingId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        `/package-payments/${bookingId}/verify`,
        {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Payment verification failed"
      );
    }
  }
);

// =====================================================
// HANDLE PAYMENT FAILURE
// POST /api/package-payment/:id/failure
// =====================================================

export const handlePackagePaymentFailure = createAsyncThunk(
  "packagePayments/handlePackagePaymentFailure",
  async (
    {
      bookingId,
      razorpay_order_id,
      razorpay_payment_id,
      reason,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        `/package-payment/${bookingId}/failure`,
        {
          razorpay_order_id,
          razorpay_payment_id,
          reason,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update payment status"
      );
    }
  }
);

// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  order: null,
  payment: null,
  booking: null,

  loading: false,
  orderLoading: false,
  verifyLoading: false,
  failureLoading: false,

  success: false,

  message: "",
  error: null,
};

// =====================================================
// SLICE
// =====================================================

const packagePaymentSlice = createSlice({
  name: "packagePayment",

  initialState,

  reducers: {
    clearPackagePaymentError: (state) => {
      state.error = null;
    },

    clearPackagePaymentMessage: (state) => {
      state.message = "";
    },

    clearPackagePaymentState: (state) => {
      state.order = null;
      state.payment = null;
      state.booking = null;

      state.loading = false;
      state.orderLoading = false;
      state.verifyLoading = false;
      state.failureLoading = false;

      state.success = false;

      state.message = "";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // =================================================
    // CREATE RAZORPAY ORDER
    // =================================================

    builder
      .addCase(
        createPackageRazorpayOrder.pending,
        (state) => {
          state.orderLoading = true;
          state.loading = true;
          state.error = null;
          state.message = "";
        }
      )

      .addCase(
        createPackageRazorpayOrder.fulfilled,
        (state, action) => {
          state.orderLoading = false;
          state.loading = false;
          state.error = null;

          /*
           * Backend response expected:
           *
           * {
           *   success: true,
           *   order: {...},
           *   payment: {...},
           *   booking: {...}
           * }
           */

          state.order = action.payload.order || null;

          state.payment =
            action.payload.payment || null;

          state.booking =
            action.payload.booking || null;

          state.message =
            action.payload.message ||
            "Razorpay order created successfully";
        }
      )

      .addCase(
        createPackageRazorpayOrder.rejected,
        (state, action) => {
          state.orderLoading = false;
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to create Razorpay order";
        }
      );

    // =================================================
    // VERIFY PAYMENT
    // =================================================

    builder
      .addCase(
        verifyPackageRazorpayPayment.pending,
        (state) => {
          state.verifyLoading = true;
          state.loading = true;
          state.success = false;
          state.error = null;
          state.message = "";
        }
      )

      .addCase(
        verifyPackageRazorpayPayment.fulfilled,
        (state, action) => {
          state.verifyLoading = false;
          state.loading = false;

          state.success = true;
          state.error = null;

          state.payment =
            action.payload.payment ||
            state.payment;

          state.booking =
            action.payload.booking ||
            state.booking;

          state.message =
            action.payload.message ||
            "Payment verified successfully";
        }
      )

      .addCase(
        verifyPackageRazorpayPayment.rejected,
        (state, action) => {
          state.verifyLoading = false;
          state.loading = false;

          state.success = false;

          state.error =
            action.payload ||
            "Payment verification failed";
        }
      );

    // =================================================
    // PAYMENT FAILURE
    // =================================================

    builder
      .addCase(
        handlePackagePaymentFailure.pending,
        (state) => {
          state.failureLoading = true;
          state.error = null;
        }
      )

      .addCase(
        handlePackagePaymentFailure.fulfilled,
        (state, action) => {
          state.failureLoading = false;
          state.error = null;

          state.payment =
            action.payload.payment ||
            state.payment;

          state.booking =
            action.payload.booking ||
            state.booking;

          state.message =
            action.payload.message ||
            "Payment failed";
        }
      )

      .addCase(
        handlePackagePaymentFailure.rejected,
        (state, action) => {
          state.failureLoading = false;

          state.error =
            action.payload ||
            "Failed to update payment status";
        }
      );
  },
});

// =====================================================
// ACTIONS
// =====================================================

export const {
  clearPackagePaymentError,
  clearPackagePaymentMessage,
  clearPackagePaymentState,
} = packagePaymentSlice.actions;

// =====================================================
// REDUCER
// =====================================================

export default packagePaymentSlice.reducer;