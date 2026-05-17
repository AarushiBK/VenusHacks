import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { DevicePreview } from "./components/layout/DevicePreview";
import { FirebaseSetupNotice } from "./components/FirebaseSetupNotice";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DevicePreview>
          <div className="flex min-h-0 flex-1 flex-col">
            <FirebaseSetupNotice />
            <App />
          </div>
        </DevicePreview>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
