import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./slice/product";
import loginReducer from "./slice/login";
import cartReducer from "./slice/cart";

const store = configureStore({
  reducer: {
    page: pageReducer,
    login: loginReducer,
    cart: cartReducer,
  },
});
export default store;
