import { createApi } from "@reduxjs/toolkit/query/react";
import axiosReduxIntegration from "../../store/axios-redux-integration";
import client from "../../clients/earn";
import config from "../../config";

const authApi = createApi({
  reducerPath: "auth/api",
  baseQuery: axiosReduxIntegration({ client })({
    baseUrl: config.earnUrl + "/auth",
  }),
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ jwt }: { jwt: string }) => ({
        url: "/jwt",
        method: "post",
        data: {
          jwt,
        },
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: "/logout",
        method: "post",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
export const { login, logout } = authApi.endpoints;
export default authApi;
