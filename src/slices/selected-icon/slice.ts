// slices/selectedIcon/slice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedIconState {
  icon: string;
}

const initialState: SelectedIconState = {
  icon: "electronics",
};

const selectedIconSlice = createSlice({
  name: "selectedIcon",
  initialState,
  reducers: {
    setIcon: (state, action: PayloadAction<string>) => {
      state.icon = action.payload;
    },
  },
});

export const { setIcon } = selectedIconSlice.actions;
export default selectedIconSlice.reducer;
