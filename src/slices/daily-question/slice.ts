import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  status: {
    canClaim: false,
    remainTimeForClaim: null,
    daily: null,
  },
  question: {
    answer: null,
    options: [],
    question: null,
  },
};

type status = {
  canClaim: boolean;
  remainTimeForClaim: null | number;
  daily: null | any;
};

type question = {
  options: any[] | unknown[];
  answer: string | null;
  question: string | null;
};

type initialState = {
  status: status;
  question: question;
};

const dailyQuestionSlice = createSlice({
  name: "daily-question/app",
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
    setQuestion(state: initialState, { payload }: PayloadAction<question>) {
      state.question = payload;
    },
  },
});

export const { setDailyStatus, setRemainTimeForClaim, setQuestion } =
  dailyQuestionSlice.actions;
export const dailyQuestionSelector = (state: RootState) =>
  state["daily-question/app"];
export default dailyQuestionSlice.reducer;
