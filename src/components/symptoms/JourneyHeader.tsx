import { Link } from "react-router-dom";

function BackChevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

interface JourneyHeaderProps {
  title?: string;
  backTo?: string;
  closeTo?: string;
  ink?: string;
}

export function JourneyHeader({
  title,
  backTo,
  closeTo = "/symptoms",
  ink = "#2a1f24",
}: JourneyHeaderProps) {
  return (
    <header className="relative z-10 flex items-center justify-between px-4 pt-3 safe-top">
      {backTo ? (
        <Link
          to={backTo}
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/60 shadow-sm backdrop-blur-sm transition active:bg-white/80"
          style={{ color: ink }}
          aria-label="Back"
        >
          <BackChevron className="size-6" />
        </Link>
      ) : (
        <span className="size-10 shrink-0" />
      )}
      {title ? (
        <span className="font-medium" style={{ color: ink }}>
          {title}
        </span>
      ) : (
        <span />
      )}
      <Link
        to={closeTo}
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/60 text-sm font-medium shadow-sm backdrop-blur-sm transition active:bg-white/80"
        style={{ color: ink }}
        aria-label="Close"
      >
        ✕
      </Link>
    </header>
  );
}
