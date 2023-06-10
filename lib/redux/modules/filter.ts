import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface FiltersState {
  tourTypes?: OptionType[];
  itinerary?: OptionType;
}

const initialState: FiltersState = {};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    reset: () => initialState,
    resetItinerary: (state) => {
      state.itinerary = undefined;
    },
    setTourTypeFilter: (state, action: PayloadAction<OptionType[]>) => {
      state.tourTypes = action.payload;
    },
    removeTourType: (state, action: PayloadAction<OptionType>) => {
      state.tourTypes = state.tourTypes?.filter(
        (option) => option.key !== action.payload.key
      );
    },
    setItineraryFilter: (state, action: PayloadAction<OptionType>) => {
      state.itinerary = action.payload;
    },
    change: (state, action: PayloadAction<FiltersState>) => {
      const { tourTypes, itinerary } = action.payload;
      state.itinerary = itinerary;
      state.tourTypes = tourTypes;
    },
  },
});

export const {
  reset,
  resetItinerary,
  change,
  setTourTypeFilter,
  removeTourType,
  setItineraryFilter,
} = filterSlice.actions;
export const selectWishList = (state: RootState) => state.wishlist;
export default filterSlice.reducer;
