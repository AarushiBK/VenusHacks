import { Navigate, Route, Routes } from "react-router-dom";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { SuccessPage } from "./pages/SuccessPage";
import { WelcomePage } from "./pages/WelcomePage";
import { SymptomsLayout } from "./pages/symptoms/SymptomsLayout";
import { SymptomChartsPage } from "./pages/symptoms/SymptomChartsPage";
import { SymptomLogTypePage } from "./pages/symptoms/SymptomLogTypePage";
import { SymptomMoodPage } from "./pages/symptoms/SymptomMoodPage";
import { SymptomSelectPage } from "./pages/symptoms/SymptomSelectPage";
import { SymptomLoggedPage } from "./pages/symptoms/SymptomLoggedPage";
import { SymptomsHomePage } from "./pages/symptoms/SymptomsHomePage";

export default function App() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/symptoms" element={<SymptomsLayout />}>
        <Route index element={<SymptomsHomePage />} />
        <Route path="log" element={<SymptomLogTypePage />} />
        <Route path="log/mood" element={<SymptomMoodPage />} />
        <Route path="log/select" element={<SymptomSelectPage />} />
        <Route path="log/done" element={<SymptomLoggedPage />} />
        <Route path="charts" element={<SymptomChartsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </div>
  );
}
