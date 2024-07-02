import { AxiosInstance } from "axios";

export default ({ client }: { client: AxiosInstance }) =>
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, headers }: any) => {
    try {
      const result = await client({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      console.log(result.data);
      return result.data;
    } catch (axiosError: any) {
      const err = axiosError;
      console.log({
        status: err.response?.status,
        data: err.response?.data || err.message,
      });
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
