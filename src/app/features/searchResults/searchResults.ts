import { RootState } from "@/app/store/store";
import { Product } from "@/app/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface searchResults {
  searchResults: Product[];
}
const initialState: searchResults = { searchResults: [] };
export const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<Product[]>) => {
      state.searchResults = action.payload;
    },
  },
});
export const { setSearchResults } = searchResultsSlice.actions;
export const searchResultsReducer = searchResultsSlice.reducer;
export const searchResultsSelector = (state: RootState) => state.searchResults;
