import { AxiosResponse } from "axios";

export function responseWrapper(res: AxiosResponse) {
  return res.data;
}
