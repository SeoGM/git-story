import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "./api";

interface AuthState {
  isLoggedIn: boolean;
  user: any | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  status: "idle",
};

// 유저 인증 상태 확인
export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const response = await api.get("/profile");
  return response.data;
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  return await api.get("/api/auth/logout", { withCredentials: true });
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUser.rejected, state => {
        state.status = "failed";
        state.isLoggedIn = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
