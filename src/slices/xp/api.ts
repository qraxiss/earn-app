import client from "../../clients/earn";
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosReduxIntegration from "../../axios/axios-redux-integration";
import config from "../../config";

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
    }),
  }),
});

export const { useXpQuery } = pointApi;
export const { xp } = pointApi.endpoints;
export default pointApi;
