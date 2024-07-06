import client from "../../clients/earn";
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosReduxIntegration from "../../axios/axios-redux-integration";
import config from "../../config";
import { setCardsData } from "./slice";
import { xp } from "../xp/api";

const cardApi = createApi({
  reducerPath: "card/api",
  baseQuery: axiosReduxIntegration({ client: client })({
    baseUrl: config.earnUrl + "/card",
  }),
  endpoints: (build) => ({
    cards: build.query({
      query: () => ({
        url: "/",
        method: "get",
      }),
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        const { data: cards } = await queryFulfilled;
        dispatch(setCardsData(cards));
      },
    }),
    buy: build.mutation({
      query: ({ cardId }) => ({
        url: "/buy",
        method: "post",
        data: {
          cardId,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        const { refetch: cardsRefetch } = dispatch(cards.initiate({}));
        const { refetch: xpRefetch } = dispatch(xp.initiate({}));
        await Promise.all([xpRefetch(), cardsRefetch()]);
      },
    }),
    upgrade: build.mutation({
      query: ({ cardId }) => ({
        url: "/upgrade",
        method: "post",
        data: {
          cardId,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        const { refetch: cardsRefetch } = dispatch(cards.initiate({}));
        const { refetch: xpRefetch } = dispatch(xp.initiate({}));
        await Promise.all([xpRefetch(), cardsRefetch()]);
      },
    }),
  }),
});

export const { useCardsQuery, useBuyMutation, useUpgradeMutation } = cardApi;

export const { cards, buy, upgrade } = cardApi.endpoints;
export default cardApi;
