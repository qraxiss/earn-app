import axios from "axios";
import WebApp from "@twa-dev/sdk";

export default axios.create({
  baseURL: "https://api.shopcek.com/earn/api",
  headers: {
    "Telegram-Data": WebApp.initData,
  },
  withCredentials: true,
});
