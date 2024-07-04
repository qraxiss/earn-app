import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
const initialState = {
  data: {
    logged: false,
    user: null,
    jwt: null,
  },
  loading: false,
  error: null,
};

type user = {
  username: string;
};

type initialState = {
  data: {
    logged: boolean;
    user: null | user;
    jwt: null | string;
  };
  loading: boolean;
  error: null | string;
};

const authSlice = createSlice({
  name: "auth/app",
  initialState,
  reducers: {
    loginStart(state: initialState) {
      state.loading = true;
      state.error = null;
    },
    loginFailure(state: initialState, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    loginSuccess(
      state: initialState,
      { payload: { jwt, user } }: PayloadAction<any>
    ) {
      state.data.logged = true;
      state.loading = false;
      state.data.user = user;
      state.data.jwt = jwt;
    },
    logoutStart(state: initialState) {
      state.loading = true;
      state.error = null;
    },
    logoutFailure(state: initialState, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutSuccess(state: initialState) {
      state.data.logged = false;
      state.loading = false;
      state.data.user = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutFailure,
  logoutStart,
  logoutSuccess,
} = authSlice.actions;

export const authSelector = (state: RootState) => state["auth/app"];

export default authSlice.reducer;
