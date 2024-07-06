import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  tasks: [] as any[],
};

const taskSlice = createSlice({
  name: "task/app",
  initialState,
  reducers: {
    setTasks(state, { payload: tasks }) {
      state.tasks = tasks;
    },
  },
});

export const { setTasks } = taskSlice.actions;
export default taskSlice.reducer;
export const taskSelector = (state: RootState) => state["task/app"].tasks;
