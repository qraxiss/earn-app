import config from "../config";

import axios from "axios";
import WebApp from "@twa-dev/sdk";

const authClient = axios.create({
  baseURL: config.authUrl,
});

export async function login() {
  const res = await authClient.post("/telegram/auth", {
    service: "earn",
    botUsername: "orospucocugubot_bot",
    initData:
      // "user=%7B%22id%22%3A6498099277%2C%22first_name%22%3A%22BlueRing%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22xfayx%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-904063962054244848&chat_type=private&auth_date=1720096911&hash=6af8b436584d4f84bca126be5d1c6e98357feffe76ad530183b4709e9fe93a37",
      "user=%7B%22id%22%3A1479523398%2C%22first_name%22%3A%22fatih%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22qraxiss%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-3067182466568205160&chat_type=private&auth_date=1719165489&hash=dc30a147f9c456e04776c4651e6704cba45afb431c2c591d33d9688686c43ba7",
  });

  return res.data;
}

export default authClient;
