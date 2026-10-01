import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

// ===============================
// ADMIN LOGIN
// ===============================
export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/login", loginData);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Admin login failed"
      );
    }
  }
);

// ===============================
// GET ADMIN PROFILE
// ===============================
export const getAdminProfile = createAsyncThunk(
  "admin/getAdminProfile",
  async (_, { rejectWithValue }) => {
    try {
      // Token localStorage se directly lo
      const token = localStorage.getItem("triporaAdminToken");

      if (!token) {
        return rejectWithValue("Admin token not found");
      }

      const response = await api.get("/admin/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to get admin profile"
      );
    }
  }
);

// ===============================
// INITIAL STATE
// ===============================
const initialState = {
  admin: null,

  // Refresh ke baad token preserve rahega
  token: localStorage.getItem("triporaAdminToken") || null,

  // Token available hai to initially authenticated
  isAuthenticated: !!localStorage.getItem("triporaAdminToken"),

  // Refresh ke time PrivateRoute ko wait karayega
  authInitialized: false,

  loading: false,
  error: null,
  success: false,
  message: "",
};

// ===============================
// ADMIN SLICE
// ===============================
const adminSlice = createSlice({
  name: "admin",

  initialState,

  reducers: {
    logoutAdmin: (state) => {
      state.admin = null;
      state.token = null;
      state.isAuthenticated = false;
      state.authInitialized = true;

      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = "";

      // Admin token remove
      localStorage.removeItem("triporaAdminToken");
    },

    clearAdminMessage: (state) => {
      state.error = null;
      state.success = false;
      state.message = "";
    },

    // ===============================
    // AUTH INITIALIZED
    // ===============================
    setAdminAuthInitialized: (state) => {
      state.authInitialized = true;
    },
  },

  extraReducers: (builder) => {
    // ===============================
    // ADMIN LOGIN
    // ===============================
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.admin = action.payload.admin;
        state.token = action.payload.token;

        state.isAuthenticated = true;
        state.authInitialized = true;

        localStorage.setItem(
          "triporaAdminToken",
          action.payload.token
        );

        state.message =
          action.payload.message || "Admin login successful";

        state.error = null;
      })

      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        state.admin = null;
        state.token = null;
        state.isAuthenticated = false;
        state.authInitialized = true;

        state.error = action.payload;
      });

    // ===============================
    // GET ADMIN PROFILE
    // ===============================
    builder
      .addCase(getAdminProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAdminProfile.fulfilled, (state, action) => {
        state.loading = false;

        state.admin = action.payload.admin;
        state.token =
          localStorage.getItem("triporaAdminToken");

        state.isAuthenticated = true;
        state.authInitialized = true;

        state.error = null;
      })

      .addCase(getAdminProfile.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;

        state.admin = null;
        state.token = null;
        state.isAuthenticated = false;
        state.authInitialized = true;

        localStorage.removeItem("triporaAdminToken");
      });
  },
});

// ===============================
// EXPORT ACTIONS
// ===============================
export const {
  logoutAdmin,
  clearAdminMessage,
  setAdminAuthInitialized,
} = adminSlice.actions;

export default adminSlice.reducer;