import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  status: {
    canClaim: false,
    streak: false,
    remainTimeForSaveStreak: null,
    remainTimeForClaim: null,
    daily: {
      day: null,
    },
  },

  days: [],
};

type status = {
  canClaim: boolean;
  streak: boolean;
  remainTimeForSaveStreak: null | number;
  remainTimeForClaim: null | number;
  daily: {
    day: null | number;
  };
};

type day = {
  day: number;
  reward: number;
};

type initialState = {
  status: status;
  days: day[];
};

const dailySlice = createSlice({
  name: "daily-login/app",
  initialState,
  reducers: {
    setDailyStatus(state: initialState, { payload }: PayloadAction<status>) {
      state.status = payload;
    },
    setDays(state: initialState, { payload }: PayloadAction<day[]>) {
      state.days = payload;
    },
    setRemainTimeForClaim(
      state: initialState,
      { payload }: PayloadAction<number>
    ) {
      state.status.remainTimeForClaim = payload;
    },
  },
});

export const { setDailyStatus, setDays, setRemainTimeForClaim } =
  dailySlice.actions;
export const dailySelector = (state: RootState) => state["daily-login/app"];
export default dailySlice.reducer;
