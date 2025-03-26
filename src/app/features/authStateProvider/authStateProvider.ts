import { RootState } from "@/app/store/store";
import { User } from "@/app/types/types";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@/app/utility/storageUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: User = {
  isAuthenticated: !!getLocalStorage("token"),
  role: getLocalStorage("role") || undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{ token: string; role: string }>) => {
      const { token, role } = action.payload;
      setLocalStorage("token", token);
      setLocalStorage("role", role);
      state.isAuthenticated = true;
      state.role = role;
    },
    signOut: (state) => {
      removeLocalStorage("token");
      removeLocalStorage("role");
      state.isAuthenticated = false;
      state.role = undefined;
    },
  },
});
export const { signIn, signOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const authSelector = (state: RootState) => state.auth;
