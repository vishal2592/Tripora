import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

/*
|--------------------------------------------------------------------------
| Helper: Convert Hotel Data into FormData
|--------------------------------------------------------------------------
*/

const createHotelFormData = (data) => {
    const formData = new FormData();

    // Basic hotel information
    formData.append("hotelName", data.hotelName || "");
    formData.append("propertyType", data.propertyType || "Hotel");
    formData.append("starRating", data.starRating ?? "");
    formData.append("reviews", data.reviews ?? 0);

    formData.append("email", data.email || "");
    formData.append("phone", data.phone || "");

    formData.append("city", data.city || "");
    formData.append("state", data.state || "");
    formData.append("country", data.country || "India");

    formData.append("address", data.address || "");
    formData.append("pincode", data.pincode || "");

    formData.append("description", data.description || "");

    formData.append("checkIn", data.checkIn || "02:00 PM");
    formData.append("checkOut", data.checkOut || "12:00 PM");

    formData.append("rooms", data.rooms ?? "");
    formData.append("price", data.price ?? "");

    formData.append("status", data.status || "Active");

    /*
    |--------------------------------------------------------------------------
    | Amenities
    |--------------------------------------------------------------------------
    | Backend req.body.amenities mein array receive karega.
    */

    if (Array.isArray(data.amenities)) {
        data.amenities.forEach((amenity) => {
            formData.append("amenities", amenity);
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Images
    |--------------------------------------------------------------------------
    |
    | Backend Multer:
    |
    | image  -> Main image (max 1)
    | images -> Gallery images (max 10)
    |
    */

    if (Array.isArray(data.imageFiles) && data.imageFiles.length > 0) {
        // First image = Main image
        formData.append("image", data.imageFiles[0]);

        // Remaining images = Gallery images
        data.imageFiles.slice(1).forEach((file) => {
            formData.append("images", file);
        });
    }

    return formData;
};

/*
|--------------------------------------------------------------------------
| Create Hotel
|--------------------------------------------------------------------------
*/

export const createHotel = createAsyncThunk(
    "/admin/createHotel",
    async (data, { rejectWithValue }) => {
        try {
            const formData = createHotelFormData(data);

            const response = await api.post("/hotels", formData);

            return response.data;
        } catch (error) {
            console.error("Create Hotel Error:", error);

            return rejectWithValue(
                error.response?.data?.message || "Hotel Not Created"
            );
        }
    }
);

/*
|--------------------------------------------------------------------------
| Get All Hotels
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Get Single Hotel
|--------------------------------------------------------------------------
*/

export const getHotelById = createAsyncThunk(
    "/admin/getHotelById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`/hotels/${id}`);

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    "failed to load Single Hotel"
            );
        }
    }
);

/*
|--------------------------------------------------------------------------
| Update Hotel
|--------------------------------------------------------------------------
*/

export const updateHotel = createAsyncThunk(
    "/admin/updateHotel",
    async ({ id, hotelData }, { rejectWithValue }) => {
        try {
            const formData = createHotelFormData(hotelData);

            const response = await api.put(
                `/hotels/${id}`,
                formData
            );

            return response.data;
        } catch (error) {
            console.error("Update Hotel Error:", error);

            return rejectWithValue(
                error.response?.data?.message || "Hotel Not Updated"
            );
        }
    }
);

/*
|--------------------------------------------------------------------------
| Delete Hotel
|--------------------------------------------------------------------------
*/

export const deleteHotel = createAsyncThunk(
    "/admin/deleteHotel",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/hotels/${id}`);

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    "Hotel deletion failed"
            );
        }
    }
);

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/

const initialState = {
    loading: false,
    success: false,
    error: null,
    message: "",
    hotel: null,
    hotels: [],
};

/*
|--------------------------------------------------------------------------
| Hotel Slice
|--------------------------------------------------------------------------
*/

const hotelSlice = createSlice({
    name: "hotel",
    initialState,

    extraReducers: (builder) => {
        builder

            /*
            |--------------------------------------------------------------------------
            | Create Hotel
            |--------------------------------------------------------------------------
            */

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

            /*
            |--------------------------------------------------------------------------
            | Get All Hotels
            |--------------------------------------------------------------------------
            */

            .addCase(getAllHotel.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })

            .addCase(getAllHotel.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.hotels = action.payload.hotels || [];
                state.error = null;
            })

            .addCase(getAllHotel.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })

            /*
            |--------------------------------------------------------------------------
            | Get Single Hotel
            |--------------------------------------------------------------------------
            */

            .addCase(getHotelById.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })

            .addCase(getHotelById.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message || "";
                state.hotel = action.payload.hotel;
                state.error = null;
            })

            .addCase(getHotelById.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })

            /*
            |--------------------------------------------------------------------------
            | Update Hotel
            |--------------------------------------------------------------------------
            */

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

            /*
            |--------------------------------------------------------------------------
            | Delete Hotel
            |--------------------------------------------------------------------------
            */

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
            });
    },
});

export default hotelSlice.reducer;