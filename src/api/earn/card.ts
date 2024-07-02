import client from "./client";
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosReduxIntegration from "../axios-redux-integration";
import config from "../../config";

const cardApi = createApi({
  reducerPath: "card",
  baseQuery: axiosReduxIntegration({ client })({
    baseUrl: config.earnUrl + "/card",
  }),
  endpoints: (build) => ({
    cards: build.query({
      query: () => ({
        url: "/card",
        method: "get",
      }),
    }),
  }),
});

export const { useCardsQuery } = cardApi;
export const { cards } = cardApi.endpoints;
export default cardApi;
