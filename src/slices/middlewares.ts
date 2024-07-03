import authApi from "./auth/api";
import cardApi from "./card/api";
import xpApi from "./xp/api";

const apiMiddlewares = [
  authApi.middleware,
  cardApi.middleware,
  xpApi.middleware,
];

export default apiMiddlewares;
