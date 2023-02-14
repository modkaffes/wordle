import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource/inter";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
