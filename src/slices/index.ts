import { combineReducers } from "@reduxjs/toolkit";
import selectedIconReducer from "./selected-icon/slice";
import selectedMenuReducer from "./selected-menu/slice";

const rootReducer = combineReducers({
  selectedIcon: selectedIconReducer,
  selectedMenu: selectedMenuReducer,
});

export default rootReducer;
