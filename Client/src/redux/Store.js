import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slicer/userSlice";
import adminReducer from "./slicer/adminSlice";
import destinationReducer from "./slicer/destinationSlice";
import hotelReducer from './slicer/hotelSlice';
import bookingReducer from './slicer/hotelBookingSlice';
import savedReducer from './slicer/savedHotelSlice';
import packageReducer from './slicer/packageSlice'
import offerReducer from './slicer/offferSlice'
import adminUserReducer from './slicer/adminUserSlice'
import packageBookingReducer from './slicer/packageBookingSlice'
import packagePaymentReducer from './slicer/packagePaymentSlice'
import myBookingReducer from './slicer/MyBookingSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    destination: destinationReducer,
    hotel : hotelReducer,
    booking : bookingReducer,
    saved : savedReducer,
    package : packageReducer,
    offer : offerReducer,
    users : adminUserReducer,
    packageBooking : packageBookingReducer,
    packagePayment : packagePaymentReducer,
    myBooking : myBookingReducer,
  },
});

export default store;