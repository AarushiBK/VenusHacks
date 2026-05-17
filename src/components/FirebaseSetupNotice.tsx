import { isFirebaseConfigured } from "@/lib/firebase";

export function FirebaseSetupNotice() {
  if (isFirebaseConfigured) return null;

  return (
    <div
      className="ios-toast"
      role="alert"
      aria-live="polite"
    >
      <p className="ios-toast-title">Demo mode</p>
      <p className="ios-toast-body">
        Firebase is not configured — using demo sign-in. Copy{" "}
        <code>.env.example</code> to <code>.env.local</code> for real accounts.
      </p>
    </div>
  );
}
