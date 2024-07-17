import { createApi } from "@reduxjs/toolkit/query/react";
import axiosReduxIntegration from "../../axios/axios-redux-integration";
import config from "../../config";
import earnClient from "../../clients/earn";
import { xp } from "../api";
import { setDailyStatus, setQuestion } from "./slice";

const dailyQuestionApi = createApi({
  reducerPath: "daily-question/api",
  endpoints: (build) => ({
    questionClaim: build.mutation({
      query: () => ({
        url: "/claim",
        method: "post",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data: status } = await queryFulfilled;
        dispatch(setDailyStatus(status));
        dispatch(xp.initiate({})).refetch();
      },
    }),

    questionStatus: build.query({
      query: () => ({
        url: "/status",
        method: "get",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data: status } = await queryFulfilled;
        dispatch(setDailyStatus(status));
        // dispatch(xp.initiate({})).refetch();
      },
    }),

    question: build.query({
      query: () => ({
        url: "/",
        method: "get",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setQuestion(data));
      },
    }),
  }),
  baseQuery: axiosReduxIntegration({ client: earnClient })({
    baseUrl: config.earnUrl + "/daily/question",
  }),
});

export default dailyQuestionApi;
export const { question, questionClaim, questionStatus } =
  dailyQuestionApi.endpoints;
