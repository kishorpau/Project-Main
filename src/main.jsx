import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./route";
import { RouterProvider } from "react-router-dom";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
