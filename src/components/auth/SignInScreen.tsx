"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setAuthenticated } from "@/lib/authSession";
import {
  loadAccountEmail,
  saveAccountEmail,
  verifyPassword,
} from "@/lib/profileStorage";
import { AuthShell } from "./AuthShell";

export function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }

    setLoading(true);
    const storedEmail = loadAccountEmail();
    if (email.trim().toLowerCase() !== storedEmail.toLowerCase()) {
      setLoading(false);
      setError("Email or password is incorrect.");
      return;
    }
    if (!verifyPassword(password)) {
      setLoading(false);
      setError("Email or password is incorrect.");
      return;
    }

    saveAccountEmail(email.trim());
    const storedName = window.localStorage.getItem("carechain_user_name");
    const fallback = email.trim().split("@")[0] ?? "Alex";
    const display =
      storedName ??
      fallback.charAt(0).toUpperCase() + fallback.slice(1).replace(/[._]/g, " ");
    setAuthenticated(display);
    router.replace("/");
    setLoading(false);
  }

  return (
    <AuthShell>
      <div className="flex flex-1 flex-col px-5 pb-8 pt-6">
        <Link
          href="/welcome"
          className="text-muted hover:text-ink mb-6 inline-flex items-center gap-1 text-sm font-medium"
        >
          <span aria-hidden>‹</span> Back
        </Link>

        <h1 className="font-display text-ink text-2xl font-semibold">Sign in</h1>
        <p className="text-muted mt-2 text-sm leading-relaxed">
          Welcome back. Sign in to continue tracking your heart health.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          {error && (
            <p className="border-rose/30 bg-rose/5 text-rose-deep rounded-xl border px-4 py-3 text-sm">
              {error}
            </p>
          )}

          <label className="block">
            <span className="text-muted mb-1.5 block text-xs font-semibold tracking-wide uppercase">
              Email
            </span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="border-blush text-ink focus:border-rose-deep w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none"
            />
          </label>

          <label className="block">
            <span className="text-muted mb-1.5 block text-xs font-semibold tracking-wide uppercase">
              Password
            </span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border-blush text-ink focus:border-rose-deep w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-rose-deep mt-2 w-full rounded-2xl py-4 text-base font-semibold text-white shadow-md shadow-rose/20 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="text-muted mt-6 text-center text-sm">
          New here?{" "}
          <Link href="/signup" className="text-rose-deep font-semibold">
            Create account
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
