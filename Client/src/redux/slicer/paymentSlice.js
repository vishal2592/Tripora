import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

// ================= GET ALL PAYMENTS =================

export const getAllPayments = createAsyncThunk(
  "payment/getAllPayments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/payments/admin/all");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch payments"
      );
    }
  }
);

// ================= INITIAL STATE =================

const initialState = {
  payments: [],
  count: 0,
  loading: false,
  success: false,
  error: null,
  message: "",
};

// ================= PAYMENT SLICE =================

const paymentSlice = createSlice({
  name: "payment",

  initialState,

  reducers: {
    clearPaymentError: (state) => {
      state.error = null;
    },

    clearPaymentMessage: (state) => {
      state.message = "";
    },

    resetPaymentState: (state) => {
      state.payments = [];
      state.count = 0;
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= GET ALL PAYMENTS =================

      .addCase(
        getAllPayments.pending,
        (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
          state.message = "";
        }
      )

      .addCase(
        getAllPayments.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;

          state.payments =
            action.payload.payments || [];

          state.count =
            action.payload.count ||
            action.payload.payments?.length ||
            0;

          state.message =
            action.payload.message || "";
        }
      )

      .addCase(
        getAllPayments.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            "Failed to fetch payments";
        }
      );
  },
});

// ================= ACTIONS =================

export const {
  clearPaymentError,
  clearPaymentMessage,
  resetPaymentState,
} = paymentSlice.actions;

// ================= REDUCER =================

export default paymentSlice.reducer;