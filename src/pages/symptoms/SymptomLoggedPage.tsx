import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function SymptomLoggedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      navigate("/symptoms", { replace: true });
    }, 1600);
    return () => window.clearTimeout(timer);
  }, [navigate]);

  return (
    <section
      className="symptom-journey-bg-intro flex min-h-full flex-col items-center justify-center px-6"
      aria-live="polite"
    >
      <div className="relative flex flex-col items-center">
        <div
          className="absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-burgundy/25 blur-3xl"
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
