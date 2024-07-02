import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import rootReducer from "../slices";
import apiReducer from "../api";

export const store = configureStore({
  reducer: combineReducers({
    app: rootReducer,
    api: apiReducer,
  }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
