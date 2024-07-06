import { useState, useEffect } from "react";
import "./assets/scss/index.scss";
import { Earn } from "./pages/earn";
import ErrorBoundary from "./components/ErrorBoundry";
import Loading from "./components/Loading";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { loginAsync } from "./slices/thunk";
import { cards, xp, status } from "./slices/api";
import { useSelector } from "react-redux";
import { RootState } from "./store";

import { setRemainTime, setPastTime } from "./slices/stack/slice";
import { setPoint } from "./slices/xp/slice";
import { xpSelector } from "./slices/xp/slice";
function App() {
  const dispatch: AppDispatch = useDispatch();
  let promise: Promise<any>;
  useEffect(() => {
    (async () => {
      await dispatch(loginAsync());
      console.log("test", cards.initiate({}));
      promise = Promise.all([
        dispatch(xp.initiate({})),
        dispatch(cards.initiate({})),
        dispatch(status.initiate({})),
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

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (statusState.isWaiting && statusState.remainTime > 0) {
      dispatch(
        setPoint(xpState.point + statusState.pastTime * (xpState.earn / 60))
      );

      setTimeout(() => {
        dispatch(setRemainTime(statusState.remainTime - 1));
        dispatch(setPastTime(statusState.passedTime + 1));
        dispatch(setPoint(xpState.point + xpState.earn / 60));
      }, 1000);
    } else if (statusState.remainTime === 0) {
      const { refetch } = dispatch(status.initiate({}));
      setTimeout(refetch, 1000);
    }
  }, [statusState.remainTime, statusState.isWaiting]);

  const [isLoading, setIsLoading] = useState(true);

  return <ErrorBoundary>{isLoading ? <Loading /> : <Earn />}</ErrorBoundary>;
}

export default App;
