import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";

export const store = configureStore({
  reducer: userReducer,
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
