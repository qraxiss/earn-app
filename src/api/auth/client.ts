import axios from "axios";
import WebApp from "@twa-dev/sdk";

const client = axios.create({
  baseURL: "https://api.shopcek.com/auth/api",
});

export async function login() {
  const res = await client.post("/telegram/auth", {
    service: "earn",
    botUsername: "orospucocugubot_bot",
    initData: WebApp.initData,
  });

  const data = res.data;

  return data;
}

export default client;
