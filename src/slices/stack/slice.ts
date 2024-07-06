import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: {} as any,
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
  },
});

export const { setStatus, setPastTime, setRemainTime } = stackSlice.actions;
export default stackSlice.reducer;
