import axios from "axios";
import WebApp from "@twa-dev/sdk";

const client = axios.create({
  baseURL: "https://api.shopcek.com/auth/api",
});

export async function login() {
  const res = await client.post("/auth/telegram", {
    service: "earn",
    botUsername: "orospucocugu_bot",
    initData: WebApp.initData,
  });

  const data = res.data;

  return data;
}

export default client;
