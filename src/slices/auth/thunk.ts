import {
  loginStart,
  loginFailure,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
} from "./slice";
import { login as loginEarn, logout } from "../../api/earn/auth";
import { login as loginAuth } from "../../api/auth/client";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (_, { dispatch }) => {
    try {
      dispatch(loginStart());
      const { jwt } = await loginAuth();
      const data = await dispatch(loginEarn.initiate({ jwt }));
      console.log("data", data);
      const {
        data: { status },
      } = data;

      if (status == true) {
        dispatch(
          loginSuccess({
            username: "qraxiss",
          })
        );
      } else {
        loginFailure("Login failed.");
      }
    } catch (error: any) {
      loginFailure(error.message);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  "auht/logout",
  async (_, { dispatch }) => {
    try {
      dispatch(logoutStart());
      const {
        data: { status },
      } = await dispatch(logout.initiate({}));

      if (status == true) {
        dispatch(logoutSuccess());
      } else {
        dispatch(logoutFailure("Logout failed!"));
      }
    } catch (error: any) {
      dispatch(logoutFailure(error.message));
    }
  }
);
