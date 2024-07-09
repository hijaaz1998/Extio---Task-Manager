import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import userReducer from "../slices/userSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // persist only the 'user' slice
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
});

export const persistor = persistStore(store); // Export persistor to be used in index.js

export default store;
