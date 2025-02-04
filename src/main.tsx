import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/styles/index.scss";
import App from "./app/App.tsx";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./app/providers/StoreProvider/index.ts";
import { LocalProvider } from "./app/providers/LocalizationProvider/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <LocalProvider>
          <App />
        </LocalProvider>
      </StoreProvider>
    </BrowserRouter>
  </StrictMode>
);
