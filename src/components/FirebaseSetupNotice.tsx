import { isFirebaseConfigured } from "../lib/firebase";

export function FirebaseSetupNotice() {
  if (isFirebaseConfigured) return null;

  return (
    <div className="border-b border-coral/30 bg-coral/10 px-4 py-3 text-center text-xs leading-relaxed text-ink">
      Firebase is not configured. Copy <code className="font-mono">.env.example</code> to{" "}
      <code className="font-mono">.env</code> and add your project credentials, then restart
      the dev server.
    </div>
  );
}
