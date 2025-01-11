import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TAuth = {
  name: null | object;
  token: null | string;
};

const initialState: TAuth = {
  name: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.token = token;
      state.name = user;
    },
    logout: (state) => {
      state.name = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.name;
