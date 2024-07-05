import { useState, useEffect } from "react";
import "./assets/scss/index.scss";
import { Earn } from "./pages/earn";
import ErrorBoundary from "./components/ErrorBoundry";
import Loading from "./components/Loading";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { loginAsync } from "./slices/thunk";
import { cards, xp, status } from "./slices/api";

function App() {
  const dispatch: AppDispatch = useDispatch();
  let promise: Promise<any>;
  useEffect(() => {
    (async () => {
      await dispatch(loginAsync());
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

  const [isLoading, setIsLoading] = useState(true);

  return <ErrorBoundary>{isLoading ? <Loading /> : <Earn />}</ErrorBoundary>;
}

export default App;
