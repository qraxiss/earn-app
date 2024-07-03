import { combineReducers } from "@reduxjs/toolkit";
import selectedIconReducer from "./selected-icon/slice";
import selectedMenuReducer from "./selected-menu/slice";
import authReducer from "./auth/slice";
import authApi from "./auth/api";
import cardReducer from "./card/slice";
import cardApi from "./card/api";
import xpReducer from "./xp/slice";
import xpApi from "./xp/api";

const rootReducer = combineReducers({
  selectedIcon: selectedIconReducer,
  selectedMenu: selectedMenuReducer,
  "auth/app": authReducer,
  "auth/api": authApi.reducer,
  "card/app": cardReducer,
  "card/api": cardApi.reducer,
  "xp/app": xpReducer,
  "xp/api": xpApi.reducer,
});

export default rootReducer;
