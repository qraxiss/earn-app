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
  questionStatus,
  question,
} from "./slices/api";
import { useSelector } from "react-redux";
import { RootState } from "./store";

import { setRemainTime, setPastTime, setEarnedXp } from "./slices/stack/slice";
import { setPoint, xpSelector } from "./slices/xp/slice";
import {
  dailySelector,
  setRemainTimeForClaim,
} from "./slices/daily-login/slice";

import {
  dailyCardSelector,
  setRemainTimeForClaim as setCardRemainTimeForClaim,
} from "./slices/daily-card/slice";

import {
  dailyQuestionSelector,
  setRemainTimeForClaim as setQuestionRemainTimeForClaim,
} from "./slices/daily-question/slice";

import { stackSelector } from "./slices/stack/slice";
import WebApp from "@twa-dev/sdk";

import IsNotMobile from "./components/IsNotMobile";
function App() {
  const dispatch: AppDispatch = useDispatch();
  let promise: Promise<any>;
  const isMobile =
    WebApp.platform === "android" ||
    WebApp.platform === "android_x" ||
    WebApp.platform === "ios";

  useEffect(() => {
    (async () => {
      if (!isMobile) {
        return;
      }

      await dispatch(loginAsync());
      promise = Promise.all([
        dispatch(xp.initiate({})),
        dispatch(cards.initiate({})),
        dispatch(stackStatus.initiate({})),
        dispatch(taskStatus.initiate({})),
        dispatch(cardStatus.initiate({})),
        dispatch(loginStatus.initiate({})),
        dispatch(referrers.initiate({})),
        dispatch(ranks.initiate({})),
        dispatch(stats.initiate({})),
      ]);

      promise.then(() => {
        setIsLoading(false);
      });
    })();
  }, []);

  const stackState = useSelector(stackSelector);

  const [isLoading, setIsLoading] = useState(true);
  const [firstPassedTime, setFirstPassedTime] = useState(false);

  useEffect(() => {
    if (WebApp && !WebApp.isExpanded) {
      WebApp.expand();
    }

    if (isLoading) {
      return;
    }

    if (stackState.status.isWaiting && stackState.status.remainTime > 0) {
      if (!firstPassedTime) {
        const relativeXp =
          stackState.status.pastTime * (stackState.status.earnPerHour / 3600);

        dispatch(setEarnedXp(relativeXp));

        setTimeout(() => {
          dispatch(setRemainTime(stackState.status.remainTime - 1));
          dispatch(setPastTime(stackState.status.pastTime + 1));
          dispatch(
            setEarnedXp(relativeXp + stackState.status.earnPerHour / 3600)
          );
        }, 1000);

        setFirstPassedTime(true);
      } else {
        setTimeout(() => {
          dispatch(setRemainTime(stackState.status.remainTime - 1));
          dispatch(setPastTime(stackState.status.pastTime + 1));
          dispatch(
            setEarnedXp(
              stackState.earnedXp + stackState.status.earnPerHour / 3600
            )
          );
        }, 1000);
      }
    } else if (stackState.status.remainTime === 0) {
      const { refetch } = dispatch(stackStatus.initiate({}));
      setTimeout(refetch, 1000);
    }
  }, [isLoading, stackState.status.remainTime, stackState.status.isWaiting]);

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

  const { status: questionStatusState } = useSelector(dailyQuestionSelector);
  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (
      !questionStatusState.canClaim &&
      questionStatusState.remainTimeForClaim > 0
    ) {
      setTimeout(() => {
        dispatch(
          setQuestionRemainTimeForClaim(
            questionStatusState.remainTimeForClaim - 1
          )
        );
      }, 1000);
    } else if (questionStatusState.remainTimeForClaim === 0) {
      const { refetch } = dispatch(questionStatus.initiate({}));
      setTimeout(refetch, 1000);
    }
  }, [
    isLoading,
    questionStatusState.remainTimeForClaim,
    questionStatusState.canClaim,
  ]);

  return isMobile ? (
    <ErrorBoundary>{isLoading ? <Loading /> : <Earn />}</ErrorBoundary>
  ) : (
    <IsNotMobile></IsNotMobile>
  );
}

export default App;
