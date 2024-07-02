import { combineReducers } from "@reduxjs/toolkit";
import selectedIconReducer from "./selected-icon/slice";
import selectedMenuReducer from "./selected-menu/slice";
import authReducer from "./auth/slice";

const rootReducer = combineReducers({
  selectedIcon: selectedIconReducer,
  selectedMenu: selectedMenuReducer,
  auth: authReducer,
});

export default rootReducer;
