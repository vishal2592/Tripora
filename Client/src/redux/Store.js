import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slicer/userSlice";
import adminReducer from "./slicer/adminSlice";
import destinationReducer from "./slicer/destinationSlice";
import hotelReducer from './slicer/hotelSlice';
import bookingReducer from './slicer/hotelBookingSlice';
import savedReducer from './slicer/savedHotelSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    destination: destinationReducer,
    hotel : hotelReducer,
    booking : bookingReducer,
    saved : savedReducer,
  },
});

export default store;