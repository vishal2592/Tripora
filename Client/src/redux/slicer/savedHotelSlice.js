import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

// ===============================
// Save Hotel
// ===============================

export const savedHotel = createAsyncThunk(
  "/saved/savedHotel",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post(`/saved-hotels/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Hotel not saved"
      );
    }
  }
);

// ===============================
// Get All Saved Hotels
// ===============================

export const getAllSavedHotel = createAsyncThunk(
  "/saved/getAllSavedHotel",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/saved-hotels");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Saved hotels could not be fetched"
      );
    }
  }
);

// ===============================
// Remove Saved Hotel
// ===============================

export const removeSavedHotel = createAsyncThunk(
  "/saved/removeSavedHotel",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/saved-hotels/${id}`);

      return {
        ...response.data,
        hotelId: id,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Saved hotel could not be removed"
      );
    }
  }
);

// ===============================
// Initial State
// ===============================

const initialState = {
  loading: false,
  success: false,
  error: null,
  saved: null,
  savedData: [],
  message: "",
};

// ===============================
// Slice
// ===============================

const savedSlice = createSlice({
  name: "saved",
  initialState,

  reducers: {
    clearSavedMessage: (state) => {
      state.message = "";
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // =================================
      // Save Hotel
      // =================================

      .addCase(savedHotel.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(savedHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.saved = action.payload.savedHotel;
        state.error = null;

        // Agar savedHotel successfully create hua hai
        // to list me bhi add kar do
        if (action.payload.savedHotel) {
          const alreadyExists = state.savedData.some(
            (item) =>
              item._id === action.payload.savedHotel._id
          );

          if (!alreadyExists) {
            state.savedData.unshift(
              action.payload.savedHotel
            );
          }
        }
      })

      .addCase(savedHotel.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // =================================
      // Get All Saved Hotels
      // =================================

      .addCase(getAllSavedHotel.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(
        getAllSavedHotel.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.message = action.payload.message;
          state.savedData =
            action.payload.savedHotels || [];
          state.error = null;
        }
      )

      .addCase(
        getAllSavedHotel.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
        }
      )

      // =================================
      // Remove Saved Hotel
      // =================================

      .addCase(removeSavedHotel.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(
        removeSavedHotel.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.message = action.payload.message;
          state.error = null;

          // Removed hotel ko Redux list se bhi remove karo
          state.savedData =
            state.savedData.filter(
              (item) =>
                item.hotel !== action.payload.hotelId
            );

          state.saved = null;
        }
      )

      .addCase(
        removeSavedHotel.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearSavedMessage } =
  savedSlice.actions;

export default savedSlice.reducer;