import {
  loginStart,
  loginFailure,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
} from "./slice";
import { login as loginEarn, logout } from "../../slices/api";
import { login as loginAuth } from "../../clients/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginAsync = createAsyncThunk(
  "auth/app/login",
  async (_, { dispatch }) => {
    try {
      dispatch(loginStart());
      const { jwt } = await loginAuth();
      dispatch(
        loginSuccess({
          user: {
            username: "qraxiss",
          },
          jwt,
        })
      );
    } catch (error: any) {
      dispatch(loginFailure(error?.message));
    }
  }
);

export const logoutAsync = createAsyncThunk(
  "auht/app/logout",
  async (_, { dispatch }) => {
    try {
      dispatch(logoutStart());
      const { data } = await dispatch(logout.initiate({}));

      if (data.error) {
        dispatch(logoutFailure(data.error.data));
      } else {
        dispatch(logoutSuccess());
      }
    } catch (error: any) {
      dispatch(logoutFailure(error.message));
    }
  }
);
