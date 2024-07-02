import "./assets/scss/index.scss";
import { Earn } from "./pages/earn";
import { loginAsync, logoutAsync } from "./slices/auth/thunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
function App() {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div>
      <button
        onClick={async () => {
          await dispatch(loginAsync());
        }}
      >
        login
      </button>
      <button
        onClick={async () => {
          await dispatch(logoutAsync());
        }}
      >
        logout
      </button>

      {/* <Earn /> */}
    </div>
  );
}

export default App;
