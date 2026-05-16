import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUpForm } from "../components/auth/SignUpForm";
import { MobileHeader } from "../components/layout/MobileHeader";
import { MobileShell } from "../components/layout/MobileShell";
import { initialSignUpProfile, type SignUpProfile } from "../types/auth";

export function SignUpPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<SignUpProfile>(initialSignUpProfile);

  function updateProfile(updates: Partial<SignUpProfile>) {
    setProfile((prev) => ({ ...prev, ...updates }));
  }

  function handleSignUp(data: SignUpProfile) {
    console.log("Sign up profile:", data);
    navigate("/success");
  }

  return (
    <MobileShell>
      <MobileHeader title="Sign up" />
      <main className="flex flex-1 flex-col overflow-y-auto px-5 pb-8 pt-2 safe-bottom">
        <SignUpForm profile={profile} onChange={updateProfile} onSubmit={handleSignUp} />
        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link to="/sign-in" className="font-semibold text-burgundy">
            Sign in
          </Link>
        </p>
      </main>
    </MobileShell>
  );
}
