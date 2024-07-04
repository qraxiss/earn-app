import axios from "axios";
import config from "../config";
import getStore from "../store/get-store";
const earnClient = axios.create({
  baseURL: config.earnUrl,
});

earnClient.interceptors.request.use(
  function (config) {
    const jwt = getStore().getState()["auth/app"].data.jwt;
    config.headers.Authorization = `Bearer ${jwt}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default earnClient;
