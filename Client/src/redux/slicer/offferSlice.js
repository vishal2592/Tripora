import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

// =====================================================
// GET ALL OFFERS - ADMIN
// GET /api/offers
// =====================================================

export const getAllOffers = createAsyncThunk(
  "offer/getAllOffers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/offers");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch offers"
      );
    }
  }
);

// =====================================================
// GET CLIENT OFFERS
// GET /api/offers/client
// =====================================================

export const getClientOffers = createAsyncThunk(
  "offer/getClientOffers",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get("/offers/client", {
        params,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch client offers"
      );
    }
  }
);

// =====================================================
// GET SINGLE OFFER
// GET /api/offers/:id
// =====================================================

export const getSingleOffer = createAsyncThunk(
  "offer/getSingleOffer",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/offers/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch offer"
      );
    }
  }
);

// =====================================================
// CREATE OFFER
// POST /api/offers
// =====================================================

export const createOffer = createAsyncThunk(
  "offer/createOffer",
  async (offerData, { rejectWithValue }) => {
    try {
      const response = await api.post("/offers", offerData);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create offer"
      );
    }
  }
);

// =====================================================
// UPDATE OFFER
// PUT /api/offers/:id
// =====================================================

export const updateOffer = createAsyncThunk(
  "offer/updateOffer",
  async ({ id, offerData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/offers/${id}`, offerData);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update offer"
      );
    }
  }
);

// =====================================================
// DELETE OFFER
// DELETE /api/offers/:id
// =====================================================

export const deleteOffer = createAsyncThunk(
  "offer/deleteOffer",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/offers/${id}`);

      return {
        ...response.data,
        id,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete offer"
      );
    }
  }
);

// =====================================================
// TOGGLE OFFER STATUS
// PUT /api/offers/:id/status
// =====================================================

export const toggleOfferStatus = createAsyncThunk(
  "offer/toggleOfferStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.put(`/offers/${id}/status`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update offer status"
      );
    }
  }
);

// =====================================================
// TOGGLE OFFER FEATURED
// PUT /api/offers/:id/featured
// =====================================================

export const toggleOfferFeatured = createAsyncThunk(
  "offer/toggleOfferFeatured",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.put(`/offers/${id}/featured`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update featured status"
      );
    }
  }
);

// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  offers: [],
  clientOffers: [],
  selectedOffer: null,

  loading: false,
  error: null,

  success: false,
  message: "",
};

// =====================================================
// OFFER SLICE
// =====================================================

const offerSlice = createSlice({
  name: "offer",
  initialState,

  reducers: {
    // Clear error
    clearOfferError: (state) => {
      state.error = null;
    },

    // Clear success
    clearOfferSuccess: (state) => {
      state.success = false;
      state.message = "";
    },

    // Clear selected offer
    clearSelectedOffer: (state) => {
      state.selectedOffer = null;
    },

    // Reset complete offer state
    resetOfferState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = "";
      state.selectedOffer = null;
    },
  },

  extraReducers: (builder) => {
    // =================================================
    // GET ALL OFFERS
    // =================================================

    builder
      .addCase(getAllOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = action.payload.offers || [];
        state.message = action.payload.message || "";
      })

      .addCase(getAllOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =================================================
    // GET CLIENT OFFERS
    // =================================================

    builder
      .addCase(getClientOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getClientOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.clientOffers = action.payload.offers || [];
        state.message = action.payload.message || "";
      })

      .addCase(getClientOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =================================================
    // GET SINGLE OFFER
    // =================================================

    builder
      .addCase(getSingleOffer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getSingleOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOffer = action.payload.offer || null;
        state.message = action.payload.message || "";
      })

      .addCase(getSingleOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =================================================
    // CREATE OFFER
    // =================================================

    builder
      .addCase(createOffer.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(createOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message =
          action.payload.message || "Offer created successfully";

        if (action.payload.offer) {
          state.offers.unshift(action.payload.offer);
        }
      })

      .addCase(createOffer.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });

    // =================================================
    // UPDATE OFFER
    // =================================================

    builder
      .addCase(updateOffer.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(updateOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message =
          action.payload.message || "Offer updated successfully";

        const updatedOffer = action.payload.offer;

        if (updatedOffer) {
          // Update admin offers
          const index = state.offers.findIndex(
            (offer) =>
              String(offer._id) === String(updatedOffer._id)
          );

          if (index !== -1) {
            state.offers[index] = updatedOffer;
          }

          // Update client offers
          const clientIndex = state.clientOffers.findIndex(
            (offer) =>
              String(offer._id) === String(updatedOffer._id)
          );

          if (clientIndex !== -1) {
            state.clientOffers[clientIndex] = updatedOffer;
          }

          // Update selected offer
          if (
            state.selectedOffer &&
            String(state.selectedOffer._id) ===
              String(updatedOffer._id)
          ) {
            state.selectedOffer = updatedOffer;
          }
        }
      })

      .addCase(updateOffer.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });

    // =================================================
    // DELETE OFFER
    // =================================================

    builder
      .addCase(deleteOffer.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(deleteOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message =
          action.payload.message || "Offer deleted successfully";

        const deletedId = action.payload.id;

        state.offers = state.offers.filter(
          (offer) => String(offer._id) !== String(deletedId)
        );

        state.clientOffers = state.clientOffers.filter(
          (offer) => String(offer._id) !== String(deletedId)
        );

        if (
          state.selectedOffer &&
          String(state.selectedOffer._id) === String(deletedId)
        ) {
          state.selectedOffer = null;
        }
      })

      .addCase(deleteOffer.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });

    // =================================================
    // TOGGLE STATUS
    // =================================================

    builder
      .addCase(toggleOfferStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(toggleOfferStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message =
          action.payload.message || "Offer status updated";

        const updatedOffer = action.payload.offer;

        if (updatedOffer) {
          const index = state.offers.findIndex(
            (offer) =>
              String(offer._id) === String(updatedOffer.id)
          );

          if (index !== -1) {
            state.offers[index].status = updatedOffer.status;
          }

          const clientIndex = state.clientOffers.findIndex(
            (offer) =>
              String(offer._id) === String(updatedOffer.id)
          );

          if (clientIndex !== -1) {
            state.clientOffers[clientIndex].status =
              updatedOffer.status;
          }

          if (
            state.selectedOffer &&
            String(state.selectedOffer._id) ===
              String(updatedOffer.id)
          ) {
            state.selectedOffer.status = updatedOffer.status;
          }
        }
      })

      .addCase(toggleOfferStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =================================================
    // TOGGLE FEATURED
    // =================================================

    builder
      .addCase(toggleOfferFeatured.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(toggleOfferFeatured.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message =
          action.payload.message || "Featured status updated";

        const updatedOffer = action.payload.offer;

        if (updatedOffer) {
          const index = state.offers.findIndex(
            (offer) =>
              String(offer._id) === String(updatedOffer.id)
          );

          if (index !== -1) {
            state.offers[index].featured =
              updatedOffer.featured;
          }

          const clientIndex = state.clientOffers.findIndex(
            (offer) =>
              String(offer._id) === String(updatedOffer.id)
          );

          if (clientIndex !== -1) {
            state.clientOffers[clientIndex].featured =
              updatedOffer.featured;
          }

          if (
            state.selectedOffer &&
            String(state.selectedOffer._id) ===
              String(updatedOffer.id)
          ) {
            state.selectedOffer.featured =
              updatedOffer.featured;
          }
        }
      })

      .addCase(toggleOfferFeatured.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// =====================================================
// EXPORT REDUCERS
// =====================================================

export const {
  clearOfferError,
  clearOfferSuccess,
  clearSelectedOffer,
  resetOfferState,
} = offerSlice.actions;

export default offerSlice.reducer;