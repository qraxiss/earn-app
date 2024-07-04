import { AxiosInstance } from "axios";

export default ({ client }: { client: AxiosInstance }) =>
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, headers }: any) => {
    try {
      const response = await client.request({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      const result = response.data.data;
      console.info(response.config.url, result);
      return { data: result };
    } catch (axiosError: any) {
      const err = axiosError;
      const error = {
        status: err.response?.status,
        data: err.response?.data.error.message || err.message,
      };
      console.info(err.config.url, error);
      return {
        error,
      };
    }
  };
