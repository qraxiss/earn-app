import { combineReducers } from "@reduxjs/toolkit";
import selectedIconReducer from "./selected-icon/slice";
import selectedMenuReducer from "./selected-menu/slice";
import authReducer from "./auth/slice";
import authApi from "./auth/api";
import cardReducer from "./card/slice";
import cardApi from "./card/api";
import xpReducer from "./xp/slice";
import xpApi from "./xp/api";
import stackReducer from "./stack/slice";
import stackApi from "./stack/api";
import taskReducer from "./task/slice";
import taskApi from "./task/api";
import dailyReducer from "./daily/slice";
import dailyApi from "./daily/api";
import frensReducer from "./frens/slice";
import frensApi from "./frens/api";

import leaderBoardApi from "./leader-board/api";

const rootReducer = combineReducers({
  selectedIcon: selectedIconReducer,
  selectedMenu: selectedMenuReducer,
  "auth/app": authReducer,
  "auth/api": authApi.reducer,
  "card/app": cardReducer,
  "card/api": cardApi.reducer,
  "xp/app": xpReducer,
  "xp/api": xpApi.reducer,
  "stack/app": stackReducer,
  "stack/api": stackApi.reducer,
  "task/app": taskReducer,
  "task/api": taskApi.reducer,
  "daily/app": dailyReducer,
  "daily/api": dailyApi.reducer,
  "frens/app": frensReducer,
  "frens/api": frensApi.reducer,
  "leader-board/api": leaderBoardApi.reducer,
});

export default rootReducer;
