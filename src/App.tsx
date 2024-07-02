import React, { useState, useEffect } from "react";
import "./assets/scss/index.scss";
import { Earn } from "./pages/earn";
import ErrorBoundary from "./components/ErrorBoundry";
import Loading from "./components/Loading";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
        {isLoading ? <Loading /> : <Earn />}
    </ErrorBoundary>
  );
}

export default App;
