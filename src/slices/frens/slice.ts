import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  referrers: [],
};

const frensSlice = createSlice({
  name: "frens/app",
  initialState,
  reducers: {
    setReferrers(state, { payload }) {
      state.referrers = payload;
    },
  },
});

export const { setReferrers } = frensSlice.actions;
export const frensSelector = (state: RootState) => state["frens/app"];
export default frensSlice.reducer;
