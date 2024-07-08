import config from "../config";

import axios from "axios";
import WebApp from "@twa-dev/sdk";

const authClient = axios.create({
  baseURL: config.earnUrl,
});

export async function login() {
  const res = await authClient.post("/telegram/auth", {
    initData: WebApp.initData,
    // "user=%7B%22id%22%3A1479523398%2C%22first_name%22%3A%22fatih%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22qraxiss%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-8728542451903155729&chat_type=private&start_param=1479523398&auth_date=1720433482&hash=7423d9fcafe6b557175e6b11b9d7b5bac92d4c5b5cf17a7d871014d692fa6eae",
  });

  return res.data;
}

export default authClient;
