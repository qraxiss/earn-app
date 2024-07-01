import axios from "axios";

axios.defaults.headers.common["Telegram-Data"] = (
  window as any
)?.Telegram?.WebApp?.initData;

export default axios.create({
  baseURL: "http://127.0.0.1:1338/api",
});
