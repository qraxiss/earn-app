import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  status: {} as any,
  earnedXp: 0,
};

const stackSlice = createSlice({
  name: "stack/app",
  initialState,
  reducers: {
    setStatus(state, { payload: status }) {
      state.status = status;
    },
    setRemainTime(state, { payload: time }) {
      state.status.remainTime = time;
    },
    setPastTime(state, { payload: time }) {
      state.status.pastTime = time;
    },
    setEarnedXp(state, { payload: xp }) {
      state.earnedXp = xp;
    },
  },
});

export const { setStatus, setPastTime, setRemainTime, setEarnedXp } =
  stackSlice.actions;
export default stackSlice.reducer;
export const stackSelector = (state: RootState) => state["stack/app"];
