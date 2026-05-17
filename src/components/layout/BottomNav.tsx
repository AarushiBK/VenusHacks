import { NavLink } from "react-router-dom";

interface NavItem {
  label: string;
  icon: string;
  to?: string;
  end?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", icon: "⌂" },
  { label: "Dashboard", icon: "▦" },
  { label: "Log", icon: "＋" },
  { to: "/symptoms", label: "Symptoms", icon: "♡", end: true },
  { label: "Insights", icon: "◔" },
];

const itemClass =
  "flex w-full flex-col items-center gap-0.5 rounded-xl px-1 py-2 text-[10px] font-medium transition";

export function BottomNav() {
  return (
    <nav
      className="shrink-0 border-t border-border/70 bg-cream/95 px-2 pb-[max(env(safe-area-inset-bottom,0px),8px)] pt-2 backdrop-blur-sm safe-bottom"
      aria-label="Main"
    >
      <ul className="flex items-center justify-around gap-1">
        {NAV_ITEMS.map((item) => (
          <li key={item.label} className="flex-1">
            {item.to ? (
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  [
                    itemClass,
                    isActive
                      ? "bg-burgundy/10 text-burgundy"
                      : "text-muted active:bg-cream-dark",
                  ].join(" ")
                }
              >
                <span className="text-xl leading-none" aria-hidden>
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </NavLink>
            ) : (
              <button
                type="button"
                disabled
                aria-disabled="true"
                className={`${itemClass} cursor-default text-muted/50`}
              >
                <span className="text-xl leading-none opacity-60" aria-hidden>
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
