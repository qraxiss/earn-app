import client from "../../clients/earn";
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosReduxIntegration from "../../store/axios-redux-integration";
import config from "../../config";

const cardApi = createApi({
  reducerPath: "card/api",
  baseQuery: axiosReduxIntegration({ client })({
    baseUrl: config.earnUrl + "/card",
  }),
  endpoints: (build) => ({
    cards: build.query({
      query: () => ({
        url: "/",
        method: "get",
      }),
    }),
    buy: build.mutation({
      query: ({ cardId }) => ({
        url: "/buy",
        method: "post",
        data: {
          cardId,
        },
      }),
    }),
    upgrade: build.mutation({
      query: ({ cardId }) => ({
        url: "/upgrade",
        method: "post",
        data: {
          cardId,
        },
      }),
    }),
  }),
});

export const { useCardsQuery, useBuyMutation, useUpgradeMutation } = cardApi;
export const { cards, buy, upgrade } = cardApi.endpoints;
export default cardApi;
