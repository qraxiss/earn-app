// slices/selectedmenu/slice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedMenuState {
  menu: string;
}

const initialState: SelectedMenuState = {
  menu: "mine",
};

const selectedMenuSlice = createSlice({
  name: "selectedMenu",
  initialState,
  reducers: {
    setMenu: (state, action: PayloadAction<string>) => {
      state.menu = action.payload;
    },
  },
});

export const { setMenu } = selectedMenuSlice.actions;
export default selectedMenuSlice.reducer;
