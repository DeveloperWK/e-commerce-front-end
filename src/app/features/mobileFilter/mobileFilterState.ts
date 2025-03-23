import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

// Create a slice
export const mobileFilterVisibleSlice = createSlice({
  name: "mobileFilterVisible",
  initialState: false, // Initial state is a boolean
  reducers: {
    // Reducer to toggle the state
    toggleMobileFilterVisible: (state) => !state,
  },
});

// Export the action creator
export const { toggleMobileFilterVisible } = mobileFilterVisibleSlice.actions;

// Export the reducer
export const mobileFilterVisibleReducer = mobileFilterVisibleSlice.reducer;

// Selector to get the mobileFilterVisible state
export const selectMobileFilterVisible = (state: RootState) =>
  state.mobileFilterVisible;
