import { Outlet } from "react-router-dom";
import { SymptomAppShell } from "../../components/layout/SymptomAppShell";
import { SymptomLogDraftProvider } from "../../context/SymptomLogDraftContext";

export function SymptomsLayout() {
  return (
    <SymptomLogDraftProvider>
      <SymptomAppShell>
        <Outlet />
      </SymptomAppShell>
    </SymptomLogDraftProvider>
  );
}
