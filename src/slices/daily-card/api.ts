import { createApi } from "@reduxjs/toolkit/query/react";
import axiosReduxIntegration from "../../axios/axios-redux-integration";
import config from "../../config";
import earnClient from "../../clients/earn";

import { setDailyStatus } from "./slice";
import { xp } from "../api";

const dailyCardApi = createApi({
  reducerPath: "daily-card/api",
  endpoints: (build) => ({
    cardClaim: build.mutation({
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

    cardStatus: build.query({
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
  }),
  baseQuery: axiosReduxIntegration({ client: earnClient })({
    baseUrl: config.earnUrl + "/daily/card",
  }),
});

export const { cardClaim, cardStatus } = dailyCardApi.endpoints;
export default dailyCardApi;
