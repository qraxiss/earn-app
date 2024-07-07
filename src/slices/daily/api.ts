import { createApi } from "@reduxjs/toolkit/query/react";
import axiosReduxIntegration from "../../axios/axios-redux-integration";
import config from "../../config";
import earnClient from "../../clients/earn";

import { setDailyStatus, setDays } from "./slice";
import { xp } from "../api";

const dailyApi = createApi({
  reducerPath: "daily/api",
  endpoints: (build) => ({
    claim: build.mutation({
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

    status: build.query({
      query: () => ({
        url: "/status",
        method: "get",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data: status } = await queryFulfilled;
        dispatch(setDailyStatus(status));
        dispatch(xp.initiate({})).refetch();
      },
    }),

    days: build.query({
      query: () => ({
        url: "/days",
        method: "get",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data: days } = await queryFulfilled;
        dispatch(setDays(days));
      },
    }),
  }),
  baseQuery: axiosReduxIntegration({ client: earnClient })({
    baseUrl: config.earnUrl + "/daily",
  }),
});

export const { useClaimMutation, useStatusQuery } = dailyApi;
export const {
  claim: dailyClaim,
  status: dailyStatus,
  days,
} = dailyApi.endpoints;
export default dailyApi;
