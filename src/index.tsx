import eruda from "eruda";
import WebApp from "@twa-dev/sdk";

eruda.init();
console.log("first mount", WebApp);

import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store/index";

const AppWrapper = () => {
  useEffect(() => {
    const handleTouchMove = (event: any) => {
      if (event.touches.length > 1 || (event.scale && event.scale !== 1)) {
        event.preventDefault();
      }
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return <App />;
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <AppWrapper />
    </ReduxProvider>
  </React.StrictMode>
);

reportWebVitals();
