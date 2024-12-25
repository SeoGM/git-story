import { createSlice } from "@reduxjs/toolkit";
import { UserProfile } from "./types";

interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
