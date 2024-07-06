import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  data: {
    point: 0,
    earn: 0,
  },
};

const xpSlice = createSlice({
  name: "xp/app",
  initialState,
  reducers: {
    setPoint(state, { payload: point }) {
      state.data.point = point;
    },

    setXp(state, { payload: data }) {
      state.data = data;
    },
  },
});

export const { setPoint, setXp } = xpSlice.actions;
export default xpSlice.reducer;
export const xpSelector = (state: RootState) => state["xp/app"].data;
