import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import orderSlice from "./slices/orderSlice";
import productSlice from "./slices/productSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    users: userSlice,
    products: productSlice,
    cart: cartSlice,
    orders: orderSlice,
  },
});
