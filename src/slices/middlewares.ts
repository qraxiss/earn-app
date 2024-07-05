import authApi from "./auth/api";
import cardApi from "./card/api";
import xpApi from "./xp/api";
import stackApi from "./stack/api";

const apiMiddlewares = [
  authApi.middleware,
  cardApi.middleware,
  xpApi.middleware,
  stackApi.middleware,
];

export default apiMiddlewares;
