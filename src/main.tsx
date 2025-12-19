import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ProviderRouter } from "./routers/provider.router";
import { ErrorBoundary } from "./components/ErrorBoundary";
// import { CustomerRouter } if you plan to merge them later

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={ProviderRouter} />
    </ErrorBoundary>
  </StrictMode>
);
