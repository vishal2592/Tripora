import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slicer/userSlice";
import adminReducer from "./slicer/adminSlice";
import destinationReducer from "./slicer/destinationSlice"
import hotelReducer from './slicer/hotelSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    destination: destinationReducer,
    hotel : hotelReducer,
  },
});

export default store;