import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import CameraProvider from "./context/cameraContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CameraProvider>
      <App />
    </CameraProvider>
  </StrictMode>
);
