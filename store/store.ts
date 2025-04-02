import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice"; // Import the user slice

export const store = configureStore({
  reducer: {
    user: userReducer, // Add user slice to store
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;