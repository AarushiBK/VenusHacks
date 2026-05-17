import { Link } from "react-router-dom";

interface MobileHeaderProps {
  title?: string;
  backTo?: string;
  backLabel?: string;
}

export function MobileHeader({
  title,
  backTo = "/",
  backLabel = "Back",
}: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 bg-transparent px-4 py-3 safe-top">
      <Link
        to={backTo}
        className="flex size-10 shrink-0 items-center justify-center rounded-full text-burgundy transition active:bg-burgundy/10"
        aria-label={backLabel}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6"
          aria-hidden
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </Link>
      {title ? (
        <h1 className="truncate font-display text-lg font-semibold text-ink">{title}</h1>
      ) : (
        <span className="font-display text-lg font-semibold text-burgundy">VitaCor</span>
      )}
    </header>
  );
}
