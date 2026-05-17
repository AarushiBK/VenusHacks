import { BRAND } from "@/lib/carechain";
import { BottomNav, type NavActive } from "./BottomNav";

export type { NavActive };

const PAGE_TITLES: Record<NavActive, string> = {
  platform: "Home",
  carechain: "CARECHAIN",
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
}: {
  active: NavActive;
  children: React.ReactNode;
  showHeader?: boolean;
  /** No horizontal padding — for full-bleed embeds (e.g. face scanner) */
  flush?: boolean;
  /** kept for backward compatibility; ignored in mobile layout */
  wide?: boolean;
}) {
  return (
    <>
      <main className="min-h-dvh w-full pb-32">
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
        <div className={flush ? "p-0" : "px-4 pt-2"}>{children}</div>
      </main>
      <BottomNav active={active} />
    </>
  );
}
