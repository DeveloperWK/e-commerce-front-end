import { RootState } from "@/app/store/store";
import { SearchState } from "@/app/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SearchState = {
  hasSearched: false,
};

export const hasSearchedSlice = createSlice({
  name: "hasSearched",
  initialState,
  reducers: {
    setHasSearched: (state, action: PayloadAction<boolean>) => {
      state.hasSearched = action.payload;
    },
    resetHasSearched: (state) => {
      state.hasSearched = false;
    },
  },
});

export const { setHasSearched, resetHasSearched } = hasSearchedSlice.actions;
export const hasSearchedReducer = hasSearchedSlice.reducer;
export const hasSearchedSelector = (state: RootState) => state.hasSearched;
