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
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border/60 bg-cream/95 px-4 py-3 backdrop-blur-sm safe-top">
      <Link
        to={backTo}
        className="flex size-10 shrink-0 items-center justify-center rounded-full text-lg text-burgundy transition active:bg-burgundy/10"
        aria-label={backLabel}
      >
        ←
      </Link>
      {title ? (
        <h1 className="truncate font-display text-lg font-semibold text-ink">{title}</h1>
      ) : (
        <span className="font-display text-lg font-semibold text-burgundy">VitaCor</span>
      )}
    </header>
  );
}
