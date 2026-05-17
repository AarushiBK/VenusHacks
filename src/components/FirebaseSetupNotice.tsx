import { isFirebaseConfigured } from "@/lib/firebase";

export function FirebaseSetupNotice() {
  if (isFirebaseConfigured) return null;

  return (
    <div className="border-b border-warning/30 bg-warning-bg px-4 py-3 text-center text-xs leading-relaxed text-ink">
      Firebase is not configured — using demo sign-in. Copy{" "}
      <code className="font-mono">.env.example</code> to{" "}
      <code className="font-mono">.env.local</code> for real accounts.
    </div>
  );
}
