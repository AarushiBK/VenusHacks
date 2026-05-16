import { Link, useNavigate } from "react-router-dom";
import { SignInForm } from "../components/auth/SignInForm";
import { MobileHeader } from "../components/layout/MobileHeader";
import { MobileShell } from "../components/layout/MobileShell";

export function SignInPage() {
  const navigate = useNavigate();

  function handleSignIn(email: string) {
    console.log("Sign in:", email);
    navigate("/success");
  }

  return (
    <MobileShell>
      <MobileHeader title="Sign in" />
      <main className="flex flex-1 flex-col px-5 pb-8 pt-2 safe-bottom">
        <p className="mb-6 text-sm leading-relaxed text-muted">
          Welcome back. Sign in to continue tracking your heart health.
        </p>
        <SignInForm onSubmit={handleSignIn} />
        <p className="mt-8 text-center text-sm text-muted">
          New here?{" "}
          <Link to="/sign-up" className="font-semibold text-burgundy">
            Create an account
          </Link>
        </p>
      </main>
    </MobileShell>
  );
}
