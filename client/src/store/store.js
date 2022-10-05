import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";
import pageReducer from "./slice/product";
import loginReducer from "./slice/login";
import kakaopayReducer from "./slice/kakaopay";

const persistConfig = {
  key: "root",
  version: 1,
  storage: storageSession,
  // whitelist: ["kakaopay"],
};

const rootReducer = combineReducers({
  page: pageReducer,
  login: loginReducer,
  kakaopay: kakaopayReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
