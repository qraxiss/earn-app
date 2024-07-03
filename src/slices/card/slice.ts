import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  data: [] as any[],
  loading: false,
  error: null,
};

const cardSlice = createSlice({
  name: "card/app",
  initialState,
  reducers: {
    updateCardsData(state, { payload }: PayloadAction<any[]>) {
      state.data = payload;
    },
    buyCardStart(state) {
      state.loading = true;
      state.error = null;
    },
    buyCardSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    buyCardFailure(state, { payload: error }: PayloadAction<any>) {
      state.loading = false;
      state.error = error;
    },
    upgradeCardStart(state) {
      state.loading = true;
      state.error = null;
    },
    upgradeCardSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    upgradeCardFailure(state, { payload: error }: PayloadAction<any>) {
      state.loading = false;
      state.error = error;
    },
  },
});

export const {
  buyCardFailure,
  buyCardStart,
  buyCardSuccess,
  upgradeCardFailure,
  upgradeCardStart,
  upgradeCardSuccess,
} = cardSlice.actions;
export default cardSlice.reducer;
