import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

// ================= REGISTER =================

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

// ================= LOGIN =================

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", loginData);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// ================= GET PROFILE =================

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const response = await api.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get profile"
      );
    }
  }
);

// ================= INITIAL STATE =================

const initialState = {
  user: null,
  token: null,

  isAuthenticated: false,

  loading: false,
  error: null,
  success: false,
  message: "",
};

// ================= SLICE =================

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = "";
    },

    clearAuthMessage: (state) => {
      state.error = null;
      state.success = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    // ================= REGISTER =================

    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message =
          action.payload.message || "User registered successfully";
        state.error = null;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });

    // ================= LOGIN =================

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;

        state.user = action.payload.user;
        state.token = action.payload.token;

        state.isAuthenticated = true;

        state.message =
          action.payload.message || "Login successful";

        state.error = null;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.isAuthenticated = false;

        state.error = action.payload;
      });

    // ================= PROFILE =================

    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;
        state.isAuthenticated = true;

        state.error = null;
      })

      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;

        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const {
  logout,
  clearAuthMessage,
} = authSlice.actions;

export default authSlice.reducer;