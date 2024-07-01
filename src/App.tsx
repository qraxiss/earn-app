import React from "react";
import "./assets/scss/index.scss";
import { Earn } from "./pages/earn";

import eruda from "eruda";

function App() {
  eruda.init();
  return (
    <div>
      <Earn />
    </div>
  );
}

export default App;
