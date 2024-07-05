import { createApi } from "@reduxjs/toolkit/query/react";
import axiosReduxIntegration from "../../axios/axios-redux-integration";
import config from "../../config";
import earnClient from "../../clients/earn";

import { setStatus } from "./slice";

import { xp } from "../api";

const stackApi = createApi({
  reducerPath: "stack/api",
  baseQuery: axiosReduxIntegration({ client: earnClient })({
    baseUrl: config.earnUrl + "/stack",
  }),
  endpoints: (build) => ({
    start: build.mutation({
      query: () => ({
        url: "/start",
        method: "post",
      }),
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        const { data: status } = await queryFulfilled;
        dispatch(setStatus(status));
      },
    }),
    claim: build.mutation({
      query: () => ({
        url: "/claim",
        method: "post",
      }),
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        const { data: status } = await queryFulfilled;
        dispatch(setStatus(status));
        const { refetch } = dispatch(xp.initiate({}));
        refetch();
      },
    }),
    status: build.query({
      query: () => ({
        url: "/status",
        method: "get",
      }),
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        const { data: status } = await queryFulfilled;
        dispatch(setStatus(status));
      },
    }),
  }),
});

export const { useStartMutation, useClaimMutation, useStatusQuery } = stackApi;
export const { status, claim, start } = stackApi.endpoints;
export default stackApi;
