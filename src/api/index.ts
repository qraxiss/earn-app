import { combineReducers } from "@reduxjs/toolkit";
import authApi from "./earn/auth";

const apiReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
});

export default apiReducer;
