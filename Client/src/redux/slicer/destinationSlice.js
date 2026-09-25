import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api';

//  create Destination //

export const createDestination = createAsyncThunk(
    "/admin/createDestination",
    async (destinationData, { rejectWithValue }) => {
        try {
            const response = await api.post("/destinations", destinationData);

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Create destination failed"
            );
        }
    }
);

// get All Destination  //

export const getAllDestination = createAsyncThunk(
    "/admin/getAllDestination",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/destinations");

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Fetch all destinations failed"
            );
        }
    }
);

// get Single Destination with the help of id 

export const getSingleDestinationById = createAsyncThunk(
    "/admin/getSingleDestinationById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`/destinations/${id}`)
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Single destination fetch failed"
            );
        }
    }
);


//  update Destination 

export const updateDestination = createAsyncThunk(
    "/admin/updateDestination",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/destinations/${id}`, formData)
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Update destination failed"
            );
        }
    }
);


export const deleteDestination = createAsyncThunk(
    "/admin/deleteDestination",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/destinations/${id}`)
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || " Delete destination failed"
            );
        }
    }
);



const initialState = {
    loading: false,
    error: null,
    success: false,
    message: "",
    destination: null,
    destinations: [],
}


const destinationSlice = createSlice({
    name: "destination",
    initialState,

    extraReducers: (builder) => {
        builder

            // Create Destination - Pending
            .addCase(createDestination.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            // Create Destination - Success
            .addCase(createDestination.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                state.destination = action.payload.destination;
            })

            // Create Destination - Error
            .addCase(createDestination.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });



        builder
            //   get all destination  pending
            .addCase(getAllDestination.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false
            })

            .addCase(getAllDestination.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.destinations = action.payload.destinations;
            })

            .addCase(getAllDestination.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });

        // get Single Destination By Id

        builder

            .addCase(getSingleDestinationById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(getSingleDestinationById.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.destination = action.payload.destination;
            })

            .addCase(getSingleDestinationById.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });

        // Update destination //

        builder

            .addCase(updateDestination.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(updateDestination.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
                state.destination = action.payload.destination;
                state.error = null;
            })

            .addCase(updateDestination.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });

        //  Delete Destination

        builder

            .addCase(deleteDestination.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false
            })

            .addCase(deleteDestination.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })

            .addCase(deleteDestination.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })

    },
});

export default destinationSlice.reducer;