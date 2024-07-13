import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  open: false,
};

const notificationSlice = createSlice({
  name: "notification/app",
  initialState,
  reducers: {
    open(state) {
      if (!state.open) {
        state.open = true;
      }
    },

    close(state) {
      if (state.open) {
        state.open = false;
      }
    },
  },
});

export const { open, close } = notificationSlice.actions;
export default notificationSlice.reducer;
export const notificationSelector = (state: RootState) => {
  return state["notification/app"].open;
};
