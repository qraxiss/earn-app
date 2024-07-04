import config from "../config";

import axios from "axios";
import WebApp from "@twa-dev/sdk";

console.log(WebApp.initData);

const authClient = axios.create({
  baseURL: config.authUrl,
});

export async function login() {
  const res = await authClient.post("/telegram/auth", {
    service: "earn",
    botUsername: "orospucocugubot_bot",
    initData: WebApp.initData,
  });

  return res.data;
}

export default authClient;
