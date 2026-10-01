import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

// ======================================================
// CREATE PACKAGE
// POST /api/packages
// ======================================================

export const createPackage = createAsyncThunk(
  "package/createPackage",
  async (packageData, { rejectWithValue }) => {
    try {
      const response = await api.post("/packages", packageData);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create package",
      );
    }
  },
);

// ======================================================
// GET ALL PACKAGES
// GET /api/packages
// ======================================================

export const getAllPackages = createAsyncThunk(
  "package/getAllPackages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/packages");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch packages",
      );
    }
  },
);

// ======================================================
// GET SINGLE PACKAGE
// GET /api/packages/:id
// ======================================================

export const getPackageById = createAsyncThunk(
  "package/getPackageById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/packages/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch package",
      );
    }
  },
);

// ======================================================
// UPDATE PACKAGE
// PUT /api/packages/:id
// ======================================================

export const updatePackage = createAsyncThunk(
  "package/updatePackage",
  async ({ id, packageData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/packages/${id}`,
        packageData,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update package",
      );
    }
  },
);

// ======================================================
// DELETE PACKAGE
// DELETE /api/packages/:id
// ======================================================

export const deletePackage = createAsyncThunk(
  "package/deletePackage",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/packages/${id}`);

      return {
        ...response.data,
        id,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete package",
      );
    }
  },
);

// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {
  packages: [],
  package: null,

  loading: false,
  singleLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  error: null,
  success: false,
  message: "",
};

// ======================================================
// SLICE
// ======================================================

const packageSlice = createSlice({
  name: "package",
  initialState,

  reducers: {
    clearPackageError: (state) => {
      state.error = null;
    },

    clearPackageMessage: (state) => {
      state.message = "";
      state.success = false;
    },

    clearSelectedPackage: (state) => {
      state.package = null;
    },

    resetPackageState: (state) => {
      state.loading = false;
      state.singleLoading = false;
      state.createLoading = false;
      state.updateLoading = false;
      state.deleteLoading = false;

      state.error = null;
      state.success = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

      // ==================================================
      // GET ALL PACKAGES
      // ==================================================

      .addCase(getAllPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllPackages.fulfilled, (state, action) => {
        state.loading = false;

        state.packages =
          action.payload?.packages || [];

        state.error = null;
      })

      .addCase(getAllPackages.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;

        state.packages = [];
      })

      // ==================================================
      // GET SINGLE PACKAGE
      // ==================================================

      .addCase(getPackageById.pending, (state) => {
        state.singleLoading = true;
        state.error = null;
      })

      .addCase(getPackageById.fulfilled, (state, action) => {
        state.singleLoading = false;

        state.package =
          action.payload?.package || null;

        state.error = null;
      })

      .addCase(getPackageById.rejected, (state, action) => {
        state.singleLoading = false;

        state.error = action.payload;

        state.package = null;
      })

      // ==================================================
      // CREATE PACKAGE
      // ==================================================

      .addCase(createPackage.pending, (state) => {
        state.createLoading = true;
        state.error = null;
        state.success = false;
        state.message = "";
      })

      .addCase(createPackage.fulfilled, (state, action) => {
        state.createLoading = false;

        state.success = true;

        state.message =
          action.payload?.message ||
          "Package created successfully";

        if (action.payload?.package) {
          state.packages.unshift(
            action.payload.package,
          );
        }

        state.error = null;
      })

      .addCase(createPackage.rejected, (state, action) => {
        state.createLoading = false;

        state.success = false;

        state.error = action.payload;

        state.message = "";
      })

      // ==================================================
      // UPDATE PACKAGE
      // ==================================================

      .addCase(updatePackage.pending, (state) => {
        state.updateLoading = true;

        state.error = null;
        state.success = false;
        state.message = "";
      })

      .addCase(updatePackage.fulfilled, (state, action) => {
        state.updateLoading = false;

        state.success = true;

        state.message =
          action.payload?.message ||
          "Package updated successfully";

        const updatedPackage =
          action.payload?.package;

        if (updatedPackage?._id) {
          const index =
            state.packages.findIndex(
              (item) =>
                item._id === updatedPackage._id,
            );

          if (index !== -1) {
            state.packages[index] =
              updatedPackage;
          }

          state.package = updatedPackage;
        }

        state.error = null;
      })

      .addCase(updatePackage.rejected, (state, action) => {
        state.updateLoading = false;

        state.success = false;

        state.error = action.payload;

        state.message = "";
      })

      // ==================================================
      // DELETE PACKAGE
      // ==================================================

      .addCase(deletePackage.pending, (state) => {
        state.deleteLoading = true;

        state.error = null;
        state.success = false;
        state.message = "";
      })

      .addCase(deletePackage.fulfilled, (state, action) => {
        state.deleteLoading = false;

        state.success = true;

        state.message =
          action.payload?.message ||
          "Package deleted successfully";

        const deletedId =
          action.payload?.id;

        state.packages =
          state.packages.filter(
            (item) =>
              item._id !== deletedId,
          );

        if (
          state.package?._id === deletedId
        ) {
          state.package = null;
        }

        state.error = null;
      })

      .addCase(deletePackage.rejected, (state, action) => {
        state.deleteLoading = false;

        state.success = false;

        state.error = action.payload;

        state.message = "";
      });
  },
});

// ======================================================
// REDUCERS
// ======================================================

export const {
  clearPackageError,
  clearPackageMessage,
  clearSelectedPackage,
  resetPackageState,
} = packageSlice.actions;

// ======================================================
// EXPORT REDUCER
// ======================================================

export default packageSlice.reducer;