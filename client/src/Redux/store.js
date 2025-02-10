import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/UserSlice";
import themeReducer from "./Slices/ThemeSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
});
