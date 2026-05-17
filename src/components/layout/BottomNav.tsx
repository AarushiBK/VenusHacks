import { NavLink } from "react-router-dom";

interface NavItem {
  to: string;
  label: string;
  icon: string;
  end?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Home", icon: "⌂", end: true },
  { to: "/success", label: "Dashboard", icon: "▦" },
  { to: "/symptoms/log", label: "Log", icon: "＋" },
  { to: "/symptoms", label: "Symptoms", icon: "♡", end: true },
  { to: "/symptoms/charts", label: "Insights", icon: "◔" },
];

export function BottomNav() {
  return (
    <nav
      className="shrink-0 border-t border-border/70 bg-cream/95 px-2 pb-[max(env(safe-area-inset-bottom,0px),8px)] pt-2 backdrop-blur-sm safe-bottom"
      aria-label="Main"
    >
      <ul className="flex items-center justify-around gap-1">
        {NAV_ITEMS.map((item) => (
          <li key={item.to} className="flex-1">
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                [
                  "flex flex-col items-center gap-0.5 rounded-xl px-1 py-2 text-[10px] font-medium transition",
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
          </li>
        ))}
      </ul>
    </nav>
  );
}
