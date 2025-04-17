import { RootState } from "@/app/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface cartCounter {
  cartCounter: number;
}
const initialState: cartCounter = { cartCounter: 0 };
export const cartCounterSlice = createSlice({
  name: "cartCounter",
  initialState,
  reducers: {
    setCartCounter: (state, action: PayloadAction<number>) => {
      state.cartCounter = action.payload;
    },
  },
});
export const { setCartCounter } = cartCounterSlice.actions;
export const cartCounterReducer = cartCounterSlice.reducer;
export const cartCounterSelector = (state: RootState) => state.cartCounter;
