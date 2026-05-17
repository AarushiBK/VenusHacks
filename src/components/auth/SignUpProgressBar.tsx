import { SIGNUP_STEPS } from "../../constants/formOptions";

interface SignUpProgressBarProps {
  currentStep: number;
}

export function SignUpProgressBar({ currentStep }: SignUpProgressBarProps) {
  const total = SIGNUP_STEPS.length;
  const stepMeta = SIGNUP_STEPS[currentStep - 1];
  const percent = Math.round((currentStep / total) * 100);

  return (
    <div className="mb-6" aria-label={`Sign up progress: step ${currentStep} of ${total}`}>
      <div className="mb-2 flex items-center justify-between text-xs font-medium">
        <span className="text-muted">
          Step {currentStep} of {total}
        </span>
        <span className="text-burgundy">{percent}%</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-cream-dark">
        <div
          className="h-full rounded-full bg-gradient-to-r from-burgundy-dark to-burgundy transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <p className="mt-2 font-display text-xl font-semibold text-ink">{stepMeta.title}</p>
      <p className="text-sm text-muted">{stepMeta.subtitle}</p>
    </div>
  );
}
