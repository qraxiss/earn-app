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

  days: [
    {
      day: 1,
      reward: 20000,
    },
    {
      day: 2,
      reward: 25000,
    },
    {
      day: 3,
      reward: 30000,
    },
    {
      day: 4,
      reward: 40000,
    },
    {
      day: 5,
      reward: 100000,
    },
    {
      day: 6,
      reward: 200000,
    },
    {
      day: 7,
      reward: 500000,
    },
    {
      day: 8,
      reward: 1000000,
    },
    {
      day: 9,
      reward: 5000000,
    },
  ],
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
