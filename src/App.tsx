import React from "react";
import "./assets/scss/index.scss";
import { Earn } from "./pages/earn";

import eruda from "eruda";

import { MainButton } from "@twa-dev/sdk/react";

function App() {
  eruda.init();

  console.log((window as any)?.Telegram);

  return (
    <div>
      <Earn />
      <MainButton
        text="test"
        onClick={() => {
          alert((window as any).Telegram);
        }}
      ></MainButton>
    </div>
  );
}

export default App;
