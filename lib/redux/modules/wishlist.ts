import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Item {
  id: number;
  title: string;
}

export interface WishListState {
  number: number;
  items: { [id: string]: Item };
}

const initialState: WishListState = {
  number: 0,
  items: {},
};

export const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<Item>) => {
      const newItem = action.payload;
      const existingItem = state.items[newItem.id];
      if (!existingItem) {
        state.items[newItem.id] = newItem;
        state.number += 1;
      }
    },
    decrement: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const existingItem = state.items[id];
      if (existingItem) {
        delete state.items[id];
        state.number -= 1;
      }
    },
  },
});

export const { increment, decrement } = wishListSlice.actions;
export const selectWishList = (state: RootState) => state.wishlist;
export default wishListSlice.reducer;
