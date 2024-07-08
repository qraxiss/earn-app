import { createApi } from "@reduxjs/toolkit/query/react";
import { setReferrers } from "./slice";
import config from "../../config";
import axiosReduxIntegration from "../../axios/axios-redux-integration";
import earnClient from "../../clients/earn";
const frensApi = createApi({
  reducerPath: "frens/api",
  endpoints: (build) => ({
    referrers: build.query({
      query: () => ({ url: "/referrers", method: "get" }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data: frens } = await queryFulfilled;
        dispatch(setReferrers(frens));
      },
    }),
  }),
  baseQuery: axiosReduxIntegration({ client: earnClient })({
    baseUrl: config.earnUrl + "/refer",
  }),
});

export const { referrers } = frensApi.endpoints;
export default frensApi;
