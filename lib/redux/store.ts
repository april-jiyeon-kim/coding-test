import { logger } from "redux-logger";
import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import wishListReducer from "./modules/wishlist";

export const store = configureStore({
  reducer: {
    wishlist: wishListReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
