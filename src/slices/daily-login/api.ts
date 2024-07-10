import { createApi } from "@reduxjs/toolkit/query/react";
import axiosReduxIntegration from "../../axios/axios-redux-integration";
import config from "../../config";
import earnClient from "../../clients/earn";

import { setDailyStatus, setDays } from "./slice";
import { xp } from "../api";

const dailyApi = createApi({
  reducerPath: "daily-login/api",
  endpoints: (build) => ({
    loginClaim: build.mutation({
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

    loginStatus: build.query({
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

    loginDays: build.query({
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
    baseUrl: config.earnUrl + "/daily/login",
  }),
});

export const { loginClaim, loginStatus, loginDays } = dailyApi.endpoints;
export default dailyApi;
