import client from "./client";
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosReduxIntegration from "../axios-redux-integration";
import config from "../../config";

const authApi = createApi({
  reducerPath: "auth",
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

// export async function login(jwt: string) {
//   const res = await client.post("/auth/jwt", {
//     jwt,
//   });

//   return res.data;
// }

// export async function logout() {
//   const res = await client.post("/auth/logout");

//   return res.data;
// }
