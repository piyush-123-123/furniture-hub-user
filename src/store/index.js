import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import addressReducer from "./addressSlice";
import orderSlice from "./orderSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    address: addressReducer,
    order:orderSlice
  },
});

export default store;