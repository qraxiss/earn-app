import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  loading: false,
  error: null,
};

const xpSlice = createSlice({
  name: "xp/app",
  initialState,
  reducers: {},
});

export const {} = xpSlice.actions;
export default xpSlice.reducer;
