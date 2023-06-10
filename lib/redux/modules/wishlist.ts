import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface WishListState {
  number: number;
  items: { [id: number]: boolean };
}

const initialState: WishListState = {
  number: 0,
  items: {},
};

export const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (!state.items[id]) {
        state.items[id] = true;
        state.number += 1;
      }
    },
    decrement: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.items[id]) {
        delete state.items[id];
        state.number -= 1;
      }
    },
  },
});

export const { increment, decrement } = wishListSlice.actions;
export const selectWishList = (state: RootState) => state.wishlist;
export default wishListSlice.reducer;
