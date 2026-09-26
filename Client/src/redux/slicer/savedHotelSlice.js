import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";
import { getAllHotel } from "./hotelSlice";

// save hotel //

export const savedHotel = createAsyncThunk(
    "/admin/savedHotel",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.post(`/saved-hotels/${id}`)
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || " Hotel Not Saved "
            );
        }
    }
);

                // get All savedHotel //

export const getAllSavedHotel = createAsyncThunk(
    "/admin/getAllSavedHotel",
    async(_, {rejectWithValue}) =>{
        try {
            const response = await api.get("/saved-hotels")
            return response.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "All saved data are not found"
            );
        }
    }
);

export const removeSavedHotel = createAsyncThunk(
    "/admin/removeSavedHotel",
    async(id, {rejectWithValue}) => {
        try {
            const response = await api.delete(`/saved-hotels/${id}`)
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "SavedHotel Not removed"
            );
        }
    }
);


const initialState = {
    loading : false,
    success : false,
    error : null,
    saved : null,
    savedData : [],
    message : " ",
}


const savedSlice = createSlice({
    name : "saved",
    initialState,

    extraReducers : (builder) =>{
        builder 

        // extraReducers for savedHotel 

    .addCase(savedHotel.pending, (state) =>{
        state.loading = true;
        state.success = false;
        state.error = null;
    })

    .addCase(savedHotel.fulfilled, (state,action) =>{
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.saved = action.payload.saved;
        state.error = null;
    })

    .addCase(savedHotel.rejected, (state,action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
    })

    // extraReducers for getAllHotel //

    .addCase(getAllSavedHotel.pending, (state) =>{
        state.loading = true;
        state.success = false;
        state.error = null;
    })

    .addCase(getAllSavedHotel.fulfilled, (state,action) => {
        state.loading = false;
        state.success = true;
        state.messsage = action.payload.message;
        state.savedData = action.payload.savedData;
        state.error = null; 
    })

    .addCase(getAllSavedHotel.rejected, (state,action) =>{
        state.loading = false;
        state.success = false;
        state.error = action.payload;
    })


            // extraReducers for remove saved hotel //

    .addCase(removeSavedHotel.pending, (state) =>{
        state.loading = true;
        state.success = false;
        state.error = null;
    })

    .addCase(removeSavedHotel.fulfilled, (state,action) =>{
        state.loading = false;
        state.success = true;
        state.saved = action.payload.saved;
        state.error = null;
    })

    .addCase(removeSavedHotel.rejected, (state,action) =>{
        state.loading = false;
        state.success = false;
        state.error = action.payload;
    })



    }
});

export default savedSlice.reducer;