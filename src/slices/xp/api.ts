import client from "../../clients/earn";
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosReduxIntegration from "../../axios/axios-redux-integration";
import config from "../../config";
import { setXp } from "./slice";

const pointApi = createApi({
  baseQuery: axiosReduxIntegration({ client: client })({
    baseUrl: config.earnUrl + "/xp",
  }),
  reducerPath: "xp/api",
  endpoints: (build) => ({
    xp: build.query({
      query: () => ({
        url: "/",
        method: "get",
      }),
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        const { data: earn } = await queryFulfilled;
        dispatch(setXp(earn));
      },
    }),
  }),
});

export const { useXpQuery } = pointApi;
export const { xp } = pointApi.endpoints;
export default pointApi;
