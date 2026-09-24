import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slicer/userSlice";
import adminReducer from "./slicer/adminSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
  },
});

export default store;