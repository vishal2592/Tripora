import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slicer/userSlice";
import adminReducer from "./slicer/adminSlice";
import destinationReducer from "./slicer/destinationSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    destination: destinationReducer,
  },
});

export default store;