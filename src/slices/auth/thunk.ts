import {
  loginStart,
  loginFailure,
  loginSucess,
  logoutFailure,
  logoutStart,
  logoutSucess,
} from "./slice";
import { login as loginEarn, logout } from "../../api/earn/client";
import { login as loginAuth } from "../../api/auth/client";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (_, { dispatch }) => {
    try {
      dispatch(loginStart());
      const { jwt } = await loginAuth();
      const {
        data: { success },
      } = await loginEarn(jwt);
      console.log(success);
      if (success) {
        dispatch(
          loginSucess({
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
      } = await logout();

      if (status) {
        dispatch(logoutSucess());
      } else {
        dispatch(logoutFailure("Logout failed!"));
      }
    } catch (error: any) {
      dispatch(logoutFailure(error.message));
    }
  }
);
