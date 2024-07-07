import authApi from "./auth/api";
import cardApi from "./card/api";
import xpApi from "./xp/api";
import stackApi from "./stack/api";
import taskApi from "./task/api";
import dailyApi from "./daily/api";

const apiMiddlewares = [
  authApi.middleware,
  cardApi.middleware,
  xpApi.middleware,
  stackApi.middleware,
  taskApi.middleware,
  dailyApi.middleware,
];

export default apiMiddlewares;
