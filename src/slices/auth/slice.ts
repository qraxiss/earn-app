import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  data: {
    logged: false,
    user: null,
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
  };
  loading: boolean;
  error: null | string;
};

const authSlice = createSlice({
  name: "auth",
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
    loginSuccess(state: initialState, action: PayloadAction<user>) {
      state.data.logged = true;
      state.loading = false;
      state.data.user = action.payload;
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
export default authSlice.reducer;
