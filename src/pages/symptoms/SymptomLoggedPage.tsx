import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HOLD_MS = 1100;
const EXIT_MS = 400;

export function SymptomLoggedPage() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!visible || exiting) return;

    const exitTimer = window.setTimeout(() => setExiting(true), HOLD_MS);
    return () => window.clearTimeout(exitTimer);
  }, [visible, exiting]);

  useEffect(() => {
    if (!exiting) return;

    const navTimer = window.setTimeout(() => {
      navigate("/symptoms", { replace: true, state: { fromLogged: true } });
    }, EXIT_MS);

    return () => window.clearTimeout(navTimer);
  }, [exiting, navigate]);

  const motionClass = [
    "logged-confirmation",
    visible && !exiting ? "is-visible" : "",
    exiting ? "is-exiting" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className="symptom-journey-screen symptom-journey-bg-intro flex flex-col items-center justify-center px-6"
      aria-live="polite"
    >
      <div className={`relative flex flex-col items-center ${motionClass}`}>
        <div
          className="logged-confirmation-glow absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-burgundy/25 blur-3xl"
          aria-hidden
        />
        <div className="relative flex items-center gap-2.5">
          <span
            className="flex size-10 items-center justify-center rounded-full bg-burgundy text-lg text-white shadow-md"
            aria-hidden
          >
            ✓
          </span>
          <span className="font-display text-3xl font-bold text-burgundy">Logged</span>
        </div>
      </div>
    </section>
  );
}
