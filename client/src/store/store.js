import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./slice/product";

const store = configureStore({
  reducer: {
    page: pageReducer,
  },
});
export default store;
