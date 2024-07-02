import axios from "axios";
import config from "../../config";
const client = axios.create({
  baseURL: config.earnUrl,
  withCredentials: true,
});

// client.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// client.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default client;
