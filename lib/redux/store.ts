import { logger } from "redux-logger";
import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import wishListReducer from "./modules/wishlist";
import filterReducer from "./modules/filter";

export const store = configureStore({
  reducer: {
    wishlist: wishListReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
