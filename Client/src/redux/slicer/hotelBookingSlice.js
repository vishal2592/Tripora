import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

// =========================================================
// CREATE HOTEL BOOKING
// =========================================================

export const createHotelBooking = createAsyncThunk(
    "/hotel-bookings/create",
    async (bookingData, { rejectWithValue }) => {
        try {
            const response = await api.post(
                "/hotel-bookings",
                bookingData
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Booking Not Created"
            );
        }
    }
);


// =========================================================
// GET ALL HOTEL BOOKINGS
// =========================================================

export const getAllBooking = createAsyncThunk(
    "/hotel-bookings/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(
                "/hotel-bookings"
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "All Booking Data Are Not Fetched"
            );
        }
    }
);


// =========================================================
// GET SINGLE HOTEL BOOKING
// =========================================================

export const getSingleBookingById = createAsyncThunk(
    "/hotel-bookings/getSingle",
    async (bookingId, { rejectWithValue }) => {
        try {
            const response = await api.get(
                `/hotel-bookings/${bookingId}`
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Single booking was not found"
            );
        }
    }
);

export const cancelBooking = createAsyncThunk(
    "/admin/cancelBooking",
    async(id, {rejectWtihVal}) =>{
        try {
            const respone = await api.delete(`/hotels/${id}`)
            return response.data;
        } catch (error) {
            return rejectWtihValue(
                error.response?.data?.message || "Hotel Cacellation are failed"
            );
        }
    }
);


// =========================================================
// INITIAL STATE
// =========================================================

const initialState = {
    loading: false,
    success: false,
    error: null,
    message: "",
    booking: null,
    bookings: [],
};


// =========================================================
// BOOKING SLICE
// =========================================================

const bookingSlice = createSlice({
    name: "booking",
    initialState,

    extraReducers: (builder) => {

        // =====================================================
        // CREATE BOOKING
        // =====================================================

        builder
            .addCase(
                createHotelBooking.pending,
                (state) => {
                    state.loading = true;
                    state.success = false;
                    state.error = null;
                }
            )

            .addCase(
                createHotelBooking.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.success = true;

                    state.message =
                        action.payload.message;

                    state.booking =
                        action.payload.booking;

                    state.error = null;
                }
            )

            .addCase(
                createHotelBooking.rejected,
                (state, action) => {
                    state.loading = false;
                    state.success = false;
                    state.error = action.payload;
                }
            );


        // =====================================================
        // GET ALL BOOKINGS
        // =====================================================

        builder
            .addCase(
                getAllBooking.pending,
                (state) => {
                    state.loading = false;
                    state.success = false;
                    state.error = null;
                }
            )

            .addCase(
                getAllBooking.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.success = true;

                    state.bookings =
                        action.payload.bookings;

                    state.error = null;
                }
            )

            .addCase(
                getAllBooking.rejected,
                (state, action) => {
                    state.loading = false;
                    state.success = false;
                    state.error = action.payload;
                }
            );


        // =====================================================
        // GET SINGLE BOOKING
        // =====================================================

        builder
            .addCase(
                getSingleBookingById.pending,
                (state) => {
                    state.loading = true;
                    state.success = false;
                    state.error = null;
                }
            )

            .addCase(
                getSingleBookingById.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.success = true;

                    state.booking =
                        action.payload.booking;

                    state.error = null;
                }
            )

            .addCase(
                getSingleBookingById.rejected,
                (state, action) => {
                    state.loading = false;
                    state.success = false;
                    state.error = action.payload;
                }
            )

            // extraReducers for cancelBooking //

        .addCase(cancelBooking.pending, (state) =>{
            state.loading = true;
            state.success = false;
            state.error = null;
        })

        .addCase(cancelBooking.fulfilled, (state,action) =>{
            state.loading = false;
            state.success = false;
            state.booking = action.payload.booking;
            state.error = null;
        })

        .addCase(cancelBooking.rejected, (state,action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;

        })
    },
});

export default bookingSlice.reducer;