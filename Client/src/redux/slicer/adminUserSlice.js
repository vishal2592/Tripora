import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

// =====================================================
// GET ALL USERS
// GET /api/admin/users
// =====================================================

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/users");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch users"
      );
    }
  }
);

// =====================================================
// GET SINGLE USER
// GET /api/admin/users/:id
// =====================================================

export const getSingleUser = createAsyncThunk(
  "users/getSingleUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/users/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch user"
      );
    }
  }
);

// =====================================================
// CREATE USER
// POST /api/admin/users
// =====================================================

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/users", userData);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create user"
      );
    }
  }
);

// =====================================================
// UPDATE USER
// PUT /api/admin/users/:id
// =====================================================

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/admin/users/${id}`,
        userData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update user"
      );
    }
  }
);

// =====================================================
// TOGGLE USER STATUS
// PUT /api/admin/users/:id/status
// =====================================================

export const toggleUserStatus = createAsyncThunk(
  "users/toggleUserStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/admin/users/${id}/status`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update user status"
      );
    }
  }
);

// =====================================================
// TOGGLE USER VERIFICATION
// PUT /api/admin/users/:id/verification
// =====================================================

export const toggleUserVerification = createAsyncThunk(
  "users/toggleUserVerification",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/admin/users/${id}/verification`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update verification"
      );
    }
  }
);

// =====================================================
// DELETE USER
// DELETE /api/admin/users/:id
// =====================================================

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/admin/users/${id}`
      );

      return {
        ...response.data,
        deletedId: id,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete user"
      );
    }
  }
);

// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  users: [],
  selectedUser: null,

  // Loading states
  loading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  statusLoading: false,
  verificationLoading: false,

  // API state
  error: null,
  success: false,
  message: "",
};

// =====================================================
// SLICE
// =====================================================

const adminUserSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    // Clear API message/error
    clearUserMessage: (state) => {
      state.error = null;
      state.message = "";
      state.success = false;
    },

    // Clear selected user
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =================================================
      // GET ALL USERS
      // =================================================

      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.users = action.payload?.users || [];

        state.message =
          action.payload?.message || "";
      })

      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.payload;
      })

      // =================================================
      // GET SINGLE USER
      // =================================================

      .addCase(getSingleUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.selectedUser =
          action.payload?.user || null;
      })

      .addCase(getSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.selectedUser = null;
      })

      // =================================================
      // CREATE USER
      // =================================================

      .addCase(createUser.pending, (state) => {
        state.createLoading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(createUser.fulfilled, (state, action) => {
        state.createLoading = false;
        state.success = true;
        state.error = null;

        state.message =
          action.payload?.message ||
          "User created successfully";

        if (action.payload?.user) {
          state.users.unshift({
            ...action.payload.user,
          });
        }
      })

      .addCase(createUser.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
        state.success = false;
      })

      // =================================================
      // UPDATE USER
      // =================================================

      .addCase(updateUser.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.success = true;
        state.error = null;

        state.message =
          action.payload?.message ||
          "User updated successfully";

        const updatedUser = action.payload?.user;

        if (updatedUser) {
          const index = state.users.findIndex(
            (user) =>
              String(user._id) ===
              String(updatedUser.id)
          );

          if (index !== -1) {
            state.users[index] = {
              ...state.users[index],
              ...updatedUser,
              _id:
                state.users[index]._id ||
                updatedUser.id,
            };
          }

          // Update selected user also
          if (
            state.selectedUser &&
            String(state.selectedUser._id) ===
              String(updatedUser.id)
          ) {
            state.selectedUser = {
              ...state.selectedUser,
              ...updatedUser,
              _id:
                state.selectedUser._id ||
                updatedUser.id,
            };
          }
        }
      })

      .addCase(updateUser.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
        state.success = false;
      })

      // =================================================
      // TOGGLE USER STATUS
      // =================================================

      .addCase(toggleUserStatus.pending, (state) => {
        state.statusLoading = true;
        state.error = null;
      })

      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        state.statusLoading = false;
        state.error = null;
        state.success = true;

        state.message =
          action.payload?.message ||
          "User status updated successfully";

        const updatedUser = action.payload?.user;

        if (updatedUser) {
          const index = state.users.findIndex(
            (user) =>
              String(user._id) ===
              String(updatedUser.id)
          );

          if (index !== -1) {
            state.users[index] = {
              ...state.users[index],
              ...updatedUser,
              _id:
                state.users[index]._id ||
                updatedUser.id,
            };
          }

          // Update selected user
          if (
            state.selectedUser &&
            String(state.selectedUser._id) ===
              String(updatedUser.id)
          ) {
            state.selectedUser = {
              ...state.selectedUser,
              ...updatedUser,
              _id:
                state.selectedUser._id ||
                updatedUser.id,
            };
          }
        }
      })

      .addCase(toggleUserStatus.rejected, (state, action) => {
        state.statusLoading = false;
        state.error = action.payload;
        state.success = false;
      })

      // =================================================
      // TOGGLE USER VERIFICATION
      // =================================================

      .addCase(
        toggleUserVerification.pending,
        (state) => {
          state.verificationLoading = true;
          state.error = null;
        }
      )

      .addCase(
        toggleUserVerification.fulfilled,
        (state, action) => {
          state.verificationLoading = false;
          state.error = null;
          state.success = true;

          state.message =
            action.payload?.message ||
            "Verification status updated successfully";

          const updatedUser =
            action.payload?.user;

          if (updatedUser) {
            const index = state.users.findIndex(
              (user) =>
                String(user._id) ===
                String(updatedUser.id)
            );

            if (index !== -1) {
              state.users[index] = {
                ...state.users[index],
                ...updatedUser,
                _id:
                  state.users[index]._id ||
                  updatedUser.id,
              };
            }

            // Update selected user
            if (
              state.selectedUser &&
              String(state.selectedUser._id) ===
                String(updatedUser.id)
            ) {
              state.selectedUser = {
                ...state.selectedUser,
                ...updatedUser,
                _id:
                  state.selectedUser._id ||
                  updatedUser.id,
              };
            }
          }
        }
      )

      .addCase(
        toggleUserVerification.rejected,
        (state, action) => {
          state.verificationLoading = false;
          state.error = action.payload;
          state.success = false;
        }
      )

      // =================================================
      // DELETE USER
      // =================================================

      .addCase(deleteUser.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.error = null;
        state.success = true;

        state.message =
          action.payload?.message ||
          "User deleted successfully";

        state.users = state.users.filter(
          (user) =>
            String(user._id) !==
            String(action.payload.deletedId)
        );

        // Clear selected user if deleted
        if (
          state.selectedUser &&
          String(state.selectedUser._id) ===
            String(action.payload.deletedId)
        ) {
          state.selectedUser = null;
        }
      })

      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

// =====================================================
// ACTIONS
// =====================================================

export const {
  clearUserMessage,
  clearSelectedUser,
} = adminUserSlice.actions;

// =====================================================
// REDUCER
// =====================================================

export default adminUserSlice.reducer;