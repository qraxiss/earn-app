import axios from "axios";
import { responseWrapper } from "../helpers/axios";
// import WebApp from "@twa-dev/sdk";

const client = axios.create({
  baseURL: "http://localhost:1337/api",
});

export async function login() {
  const res = await client.post("/telegram/auth", {
    service: "earn",
    botUsername: "orospucocugubot_bot",
    initData:
      "user=%7B%22id%22%3A1479523398%2C%22first_name%22%3A%22fatih%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22qraxiss%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-3067182466568205160&chat_type=private&auth_date=1719165489&hash=dc30a147f9c456e04776c4651e6704cba45afb431c2c591d33d9688686c43ba7",
  });

  return responseWrapper(res);
}

export default client;
