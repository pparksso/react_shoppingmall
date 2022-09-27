import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./slice/product";
import loginReducer from "./slice/login";

const store = configureStore({
  reducer: {
    page: pageReducer,
    login: loginReducer,
  },
});
export default store;
