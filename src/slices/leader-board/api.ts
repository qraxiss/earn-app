import { createApi } from "@reduxjs/toolkit/query/react";
import config from "../../config";
import axiosReduxIntegration from "../../axios/axios-redux-integration";
import earnClient from "../../clients/earn";
import { RootState } from "../../store";

const leaderBoardApi = createApi({
  reducerPath: "leader-board/api",
  baseQuery: axiosReduxIntegration({ client: earnClient })({
    baseUrl: config.earnUrl + "/leader-board",
  }),
  endpoints: (build) => ({
    stats: build.query({
      query: () => ({ url: "/stats", method: "get" }),
    }),
    ranks: build.query({
      query: () => ({ url: "/ranks", method: "get" }),
    }),
  }),
});

export const { ranks, stats } = leaderBoardApi.endpoints;
export const { useStatsQuery, useRanksQuery } = leaderBoardApi;
export const statsSelector = (state: RootState) =>
  state["leader-board/api"].queries["stats({})"].data;
export const ranksSelector = (state: RootState) =>
  state["leader-board/api"].queries["ranks({})"].data;
export default leaderBoardApi;
