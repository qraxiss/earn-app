import config from "../config";

import axios from "axios";
import WebApp from "@twa-dev/sdk";

const authClient = axios.create({
  baseURL: config.earnUrl,
});

export async function login() {
  const res = await authClient.post("/telegram/auth", {
    initData: WebApp.initData,
  });

  return res.data;
}

export default authClient;
