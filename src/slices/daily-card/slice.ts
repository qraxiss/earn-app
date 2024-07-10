import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  status: {
    canClaim: false,
    remainTimeForClaim: null,
    daily: null,
    card: {
      name: null,
      image: null,
      id: null,
    },
  },
};

type status = {
  canClaim: boolean;
  remainTimeForClaim: null | number;
  daily: null | any;
  card?: {
    name: string | null;
    image: string | null;
    id: string | null;
  };
};

type initialState = {
  status: status;
};

const dailyCardSlice = createSlice({
  name: "daily-card/app",
  initialState,
  reducers: {
    setDailyStatus(state: initialState, { payload }: PayloadAction<status>) {
      state.status = payload;
    },
    setRemainTimeForClaim(
      state: initialState,
      { payload }: PayloadAction<number>
    ) {
      state.status.remainTimeForClaim = payload;
    },
  },
});

export const { setDailyStatus, setRemainTimeForClaim } = dailyCardSlice.actions;
export const dailyCardSelector = (state: RootState) => state["daily-card/app"];
export default dailyCardSlice.reducer;
