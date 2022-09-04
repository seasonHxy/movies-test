import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import HomePage from "./pages/HomePage";
import Routes from "./routes/Routes";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Routes />
  </StrictMode>,
  rootElement
);
