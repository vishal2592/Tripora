import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

// =====================================================
// REGISTER
// =====================================================

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", userData);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// =====================================================
// LOGIN
// =====================================================

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", loginData);

      // Save token
      if (response.data?.token) {
        localStorage.setItem("triporaToken", response.data.token);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// =====================================================
// GET PROFILE
// =====================================================

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/profile");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get profile"
      );
    }
  }
);

// =====================================================
// UPDATE PROFILE
// =====================================================

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await api.put(
        "/auth/profile",
        profileData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update profile"
      );
    }
  }
);

// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  // User
  user: null,

  // Authentication
  token: localStorage.getItem("triporaToken") || null,

  isAuthenticated: !!localStorage.getItem("triporaToken"),

  // Important for refresh
  authInitialized: false,

  // General auth state
  loading: false,
  error: null,
  success: false,
  message: "",

  // ===================================================
  // UPDATE PROFILE STATE
  // ===================================================

  updateProfileLoading: false,
  updateProfileSuccess: false,
  updateProfileError: null,
  updateProfileMessage: "",
};

// =====================================================
// AUTH SLICE
// =====================================================

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    // =================================================
    // LOGOUT
    // =================================================

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.authInitialized = true;

      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = "";

      // Reset update profile state
      state.updateProfileLoading = false;
      state.updateProfileSuccess = false;
      state.updateProfileError = null;
      state.updateProfileMessage = "";

      localStorage.removeItem("triporaToken");
    },

    // =================================================
    // CLEAR AUTH MESSAGE
    // =================================================

    clearAuthMessage: (state) => {
      state.error = null;
      state.success = false;
      state.message = "";
    },

    // =================================================
    // AUTH INITIALIZED
    // =================================================

    setAuthInitialized: (state) => {
      state.authInitialized = true;
    },

    // =================================================
    // CLEAR UPDATE PROFILE STATE
    // =================================================

    clearUpdateProfileState: (state) => {
      state.updateProfileLoading = false;
      state.updateProfileSuccess = false;
      state.updateProfileError = null;
      state.updateProfileMessage = "";
    },
  },

  // ===================================================
  // EXTRA REDUCERS
  // ===================================================

  extraReducers: (builder) => {
    // =================================================
    // REGISTER
    // =================================================

    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = "";
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.message =
          action.payload?.message ||
          "User registered successfully";

        state.error = null;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        state.error =
          action.payload || "Registration failed";

        state.message = "";
      });

    // =================================================
    // LOGIN
    // =================================================

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = "";
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.user = action.payload?.user || null;
        state.token = action.payload?.token || null;

        state.isAuthenticated = true;
        state.authInitialized = true;

        state.message =
          action.payload?.message ||
          "Login successful";

        state.error = null;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.authInitialized = true;

        state.error =
          action.payload || "Login failed";

        state.message = "";

        localStorage.removeItem("triporaToken");
      });

    // =================================================
    // GET PROFILE
    // =================================================

    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload?.user || null;

        state.isAuthenticated = true;
        state.authInitialized = true;

        state.token =
          localStorage.getItem("triporaToken");

        state.error = null;
      })

      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload || "Failed to get profile";

        state.user = null;
        state.token = null;

        state.isAuthenticated = false;
        state.authInitialized = true;

        localStorage.removeItem("triporaToken");
      });

    // =================================================
    // UPDATE PROFILE
    // =================================================

    builder
      .addCase(updateProfile.pending, (state) => {
        state.updateProfileLoading = true;

        state.updateProfileSuccess = false;

        state.updateProfileError = null;

        state.updateProfileMessage = "";
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updateProfileLoading = false;

        state.updateProfileSuccess = true;

        state.updateProfileError = null;

        state.updateProfileMessage =
          action.payload?.message ||
          "Profile updated successfully";

        // Update user data immediately
        if (action.payload?.user) {
          state.user = action.payload.user;
        }
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.updateProfileLoading = false;

        state.updateProfileSuccess = false;

        state.updateProfileError =
          action.payload ||
          "Failed to update profile";

        state.updateProfileMessage = "";
      });
  },
});

// =====================================================
// ACTIONS
// =====================================================

export const {
  logout,
  clearAuthMessage,
  setAuthInitialized,
  clearUpdateProfileState,
} = authSlice.actions;

// =====================================================
// REDUCER
// =====================================================

export default authSlice.reducer;