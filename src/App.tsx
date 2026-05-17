import { Navigate, Route, Routes } from "react-router-dom";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { SuccessPage } from "./pages/SuccessPage";
import { WelcomePage } from "./pages/WelcomePage";

export default function App() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </div>
  );
}
