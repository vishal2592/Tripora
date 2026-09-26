import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

// Create Hotel

export const createHotel = createAsyncThunk(
    "/admin/createHotel",
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post("/hotels", data);

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Hotel Not Created"
            );
        }
    }
);

// Get All Hotels

export const getAllHotel = createAsyncThunk(
    "/admin/getAllHotel",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/hotels");

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Not found All Hotel"
            );
        }
    }
);

            // getSingleHotel with the help of id //

export const getHotelById = createAsyncThunk(
    "/admin/geteHotelById",
    async(id, {rejectWithValue}) =>{
        try {
            const response = await api.get(`/hotels/${id}`)
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Single Hotel are not Found"
            );
        }
    }
);
    

// Update hotel //

export const updateHotel = createAsyncThunk(
    "/admin/updateHotel",
    async ({ id, hotelData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/hotels/${id}`, hotelData)
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Hotel Not Updated"
            );
        }
    }
);

// DeleteHotel  //

export const deleteHotel = createAsyncThunk(
    "/admin/deleteHotel",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/hotels/${id}`)
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "hotels deletation are failed"
            );
        }
    }
);

const initialState = {
    loading: false,
    success: false,
    error: null,
    message: "",
    hotel: null,
    hotels: [],
};

const hotelSlice = createSlice({
    name: "hotel",
    initialState,

    extraReducers: (builder) => {
        builder

            // Create Hotel

            .addCase(createHotel.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })

            .addCase(createHotel.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                state.hotel = action.payload.hotel;
                state.error = null;
            })

            .addCase(createHotel.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })

            // Get All Hotels

            .addCase(getAllHotel.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })

            .addCase(getAllHotel.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.hotels = action.payload.hotels;
                state.error = null;
            })

            .addCase(getAllHotel.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })

            // extraReducers for getHotelById //

            .addCase(getHotelById.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })

            .addCase(getHotelById.fulfilled, (state,action) => {
                state.loading = false,
                state.success = true;
                state.message = action.payload.message;
                state.hotel = action.payload.hotel;
                state.error = null;
            })

            .addCase(getHotelById.rejected, (state,action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload
            })

            //  ExtraReducer For updateHotel //

            .addCase(updateHotel.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })

            .addCase(updateHotel.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                state.hotel = action.payload.hotel;
                state.error = null;
            })

            .addCase(updateHotel.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })


            // Delete Hotel

            .addCase(deleteHotel.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })

            .addCase(deleteHotel.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                state.error = null;
            })

            .addCase(deleteHotel.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })
    },
});

export default hotelSlice.reducer;