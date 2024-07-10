import { useState, useEffect } from "react";
import "./assets/scss/index.scss";
import { Earn } from "./pages/earn";
import ErrorBoundary from "./components/ErrorBoundry";
import Loading from "./components/Loading";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { loginAsync } from "./slices/thunk";
import {
  cards,
  xp,
  stackStatus,
  taskStatus,
  loginStatus,
  loginDays,
  referrers,
  stats,
  ranks,
  cardStatus,
} from "./slices/api";
import { useSelector } from "react-redux";
import { RootState } from "./store";

import { setRemainTime, setPastTime } from "./slices/stack/slice";
import { setPoint, xpSelector } from "./slices/xp/slice";
import {
  dailySelector,
  setRemainTimeForClaim,
} from "./slices/daily-login/slice";

import {
  dailyCardSelector,
  setRemainTimeForClaim as setCardRemainTimeForClaim,
} from "./slices/daily-card/slice";
function App() {
  const dispatch: AppDispatch = useDispatch();
  let promise: Promise<any>;
  useEffect(() => {
    (async () => {
      await dispatch(loginAsync());
      promise = Promise.all([
        dispatch(xp.initiate({})),
        dispatch(cards.initiate({})),
        dispatch(stackStatus.initiate({})),
        dispatch(taskStatus.initiate({})),
        dispatch(loginDays.initiate({})),
        dispatch(loginStatus.initiate({})),
        dispatch(referrers.initiate({})),
        dispatch(stats.initiate({})),
        dispatch(ranks.initiate({})),
        dispatch(cardStatus.initiate({})),
      ]);

      promise.then(() => {
        setIsLoading(false);
      });
    })();
  }, []);

  const statusState = useSelector(
    (state: RootState) => state["stack/app"].status
  );
  const xpState = useSelector(xpSelector);

  const [isLoading, setIsLoading] = useState(true);
  const [firstPassedTime, setFirstPassedTime] = useState(false);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (statusState.isWaiting && statusState.remainTime > 0) {
      if (!firstPassedTime) {
        const relativeXp =
          xpState.point + statusState.pastTime * (xpState.earn / 3600);

        dispatch(setPoint(relativeXp));

        setTimeout(() => {
          dispatch(setRemainTime(statusState.remainTime - 1));
          dispatch(setPastTime(statusState.pastTime + 1));
          dispatch(setPoint(relativeXp + xpState.earn / 3600));
        }, 1000);

        setFirstPassedTime(true);
      } else {
        setTimeout(() => {
          dispatch(setRemainTime(statusState.remainTime - 1));
          dispatch(setPastTime(statusState.pastTime + 1));
          dispatch(setPoint(xpState.point + xpState.earn / 3600));
        }, 1000);
      }
    } else if (statusState.remainTime === 0) {
      const { refetch } = dispatch(stackStatus.initiate({}));
      setTimeout(refetch, 1000);
    }
  }, [isLoading, statusState.remainTime, statusState.isWaiting]);

  const { status } = useSelector(dailySelector);
  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!status.canClaim && status.remainTimeForClaim > 0) {
      setTimeout(() => {
        dispatch(setRemainTimeForClaim(status.remainTimeForClaim - 1));
      }, 1000);
    } else if (status.remainTimeForClaim === 0) {
      const { refetch } = dispatch(loginStatus.initiate({}));
      setTimeout(refetch, 1000);
    }
  }, [isLoading, status.remainTimeForClaim, status.canClaim]);

  const { status: cardStatusState } = useSelector(dailyCardSelector);
  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!cardStatusState.canClaim && cardStatusState.remainTimeForClaim > 0) {
      setTimeout(() => {
        dispatch(
          setCardRemainTimeForClaim(cardStatusState.remainTimeForClaim - 1)
        );
      }, 1000);
    } else if (cardStatusState.remainTimeForClaim === 0) {
      const { refetch } = dispatch(cardStatus.initiate({}));
      setTimeout(refetch, 1000);
    }
  }, [isLoading, cardStatusState.remainTimeForClaim, cardStatusState.canClaim]);

  return <ErrorBoundary>{isLoading ? <Loading /> : <Earn />}</ErrorBoundary>;
}

export default App;
