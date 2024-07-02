import axios from "axios";
import { responseWrapper } from "../helpers/axios";

const client = axios.create({
  baseURL: "http://localhost:1338/api",
  withCredentials: true,
});

export async function login(jwt: string) {
  const res = await client.post("/auth/jwt", {
    jwt,
  });

  return responseWrapper(res);
}

export async function logout() {
  const res = await client.post("/auth/logout");

  return responseWrapper(res);
}

export default client;
