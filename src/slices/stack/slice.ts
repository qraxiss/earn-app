import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: null,
};

const stackSlice = createSlice({
  name: "stack/app",
  initialState,
  reducers: {
    setStatus(state, { payload: status }) {
      state.status = status;
    },
  },
});

export const { setStatus } = stackSlice.actions;
export default stackSlice.reducer;
