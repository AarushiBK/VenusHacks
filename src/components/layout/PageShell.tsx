import { BRAND } from "@/lib/carechain";
import { BottomNav, type NavActive } from "./BottomNav";

export type { NavActive };

const PAGE_TITLES: Record<NavActive, string> = {
  platform: "Home",
  motherboard: "Motherboard",
  symptoms: "Symptoms",
  health: "Health",
  metrics: "Metrics",
};

export function PageShell({
  active,
  children,
  showHeader = true,
  flush = false,
  showHeraBubble = true,
}: {
  active: NavActive;
  children: React.ReactNode;
  showHeader?: boolean;
  /** No horizontal padding — for full-bleed embeds (e.g. face scanner) */
  flush?: boolean;
  /** Small Hera chat bubble on the Health nav tab */
  showHeraBubble?: boolean;
  /** kept for backward compatibility; ignored in mobile layout */
  wide?: boolean;
}) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <main className="relative min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain">
        {showHeader && (
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-blush/50 bg-cream/85 px-5 pb-3 pt-1 backdrop-blur-md">
            <p className="text-rose-deep text-[11px] font-bold tracking-[0.18em] uppercase">
              {BRAND.name}
            </p>
            <p className="text-muted text-[11px] font-medium tracking-wide uppercase">
              {PAGE_TITLES[active]}
            </p>
          </header>
        )}
        <div
          className={
            flush ? "flex min-h-0 flex-1 flex-col p-0" : "px-4 pt-2 pb-4"
          }
        >
          {children}
        </div>
      </main>

      <BottomNav active={active} showHeraBubble={showHeraBubble} />
    </div>
  );
}
