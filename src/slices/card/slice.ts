import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  data: [] as any[],
};

const cardSlice = createSlice({
  name: "card/app",
  initialState,
  reducers: {
    setCardsData(state, { payload: data }: PayloadAction<any[]>) {
      state.data = data;
    },
  },
});

export const { setCardsData } = cardSlice.actions;
export default cardSlice.reducer;
export const cardsSelector = (state: RootState) => state["card/app"].data;
