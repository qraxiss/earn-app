import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../slices";
import apiMiddlewares from "../slices/middlewares";

export const store = configureStore({
  reducer: rootReducer,

  devTools: true,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(...apiMiddlewares) as ReturnType<
      typeof getDefaultMiddleware
    >;
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
