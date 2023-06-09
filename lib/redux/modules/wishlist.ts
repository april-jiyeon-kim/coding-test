import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface WishListState {
  number: number;
}

const initialState: WishListState = {
  number: 0,
};

export const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    increment: (state) => {
      state.number += 1;
    },
    decrement: (state) => {
      state.number -= 1;
    },
  },
});

export const { increment, decrement } = wishListSlice.actions;
export const selectWishList = (state: RootState) => state.wishlist;
export default wishListSlice.reducer;
