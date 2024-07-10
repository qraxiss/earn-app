import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  status: {
    canClaim: false,
    remainTimeForClaim: null,
    daily: null,
  },
};

type status = {
  canClaim: boolean;
  remainTimeForClaim: null | number;
  daily: null | any;
};

type initialState = {
  status: status;
};

const dailyQuestionSlice = createSlice({
  name: "daily/app",
  initialState,
  reducers: {
    setDailyStatus(state: initialState, { payload }: PayloadAction<status>) {
      state.status = payload;
    },
    setRemainTimeForClaim(
      state: initialState,
      { payload }: PayloadAction<number>
    ) {
      state.status.remainTimeForClaim = payload;
    },
  },
});

export const { setDailyStatus, setRemainTimeForClaim } =
  dailyQuestionSlice.actions;
export const dailySelector = (state: RootState) => state["daily-question/app"];
export default dailyQuestionSlice.reducer;
