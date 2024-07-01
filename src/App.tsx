import React from "react";
import "./assets/scss/index.scss";
import { Earn } from "./pages/earn";
import { MainButton } from "@twa-dev/sdk/react";
import { login } from "./api/auth/client";

function App() {
  return (
    <div>
      <MainButton text="click" onClick={login}></MainButton>
      <Earn />
    </div>
  );
}

export default App;
