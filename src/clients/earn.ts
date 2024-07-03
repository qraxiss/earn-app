import axios from "axios";
import config from "../config";
const earnClient = axios.create({
  baseURL: config.earnUrl,
  withCredentials: true,
});

export default earnClient;
