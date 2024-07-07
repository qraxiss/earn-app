import { createApi } from "@reduxjs/toolkit/query/react";
import axiosReduxIntegration from "../../axios/axios-redux-integration";
import earnClient from "../../clients/earn";
import config from "../../config";
import { setTasks } from "./slice";
import { xp } from "../xp/api";
const taskApi = createApi({
  reducerPath: "task/api",
  baseQuery: axiosReduxIntegration({ client: earnClient })({
    baseUrl: config.earnUrl + "/task",
  }),
  endpoints: (build) => ({
    claim: build.mutation({
      query: ({ taskId }) => ({
        url: "/claim",
        method: "post",
        data: { taskId },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data: tasks } = await queryFulfilled;
        dispatch(setTasks(tasks));
        await dispatch(xp.initiate({})).refetch();
      },
    }),

    status: build.query({
      query: () => ({ url: "/status", method: "get" }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data: tasks } = await queryFulfilled;
        dispatch(setTasks(tasks));
        await dispatch(xp.initiate({})).refetch();
      },
    }),
  }),
});

export default taskApi;
export const { useClaimMutation, useStatusQuery } = taskApi;
export const { status: taskStatus, claim: taskClaim } = taskApi.endpoints;
