"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type NavActive =
  | "platform"
  | "motherboard"
  | "symptoms"
  | "health"
  | "metrics";

type SideTab = {
  id: Exclude<NavActive, "platform">;
  href: string;
  label: string;
  icon: (active: boolean) => React.ReactNode;
};

const SIDE_TABS: SideTab[] = [
  {
    id: "motherboard",
    href: "/motherboard",
    label: "Passport",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <rect
          x="4"
          y="3.5"
          width="16"
          height="17"
          rx="2"
          stroke="currentColor"
          strokeWidth={active ? 2 : 1.6}
        />
        <path
          d="M8 8h8M8 12h8M8 16h5"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "symptoms",
    href: "/symptoms",
    label: "Symptoms",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
          stroke="currentColor"
          strokeWidth={active ? 2 : 1.6}
          strokeLinecap="round"
        />
        <path
          d="M9 5a2 2 0 012-2h2a2 2 0 012 2M9 12h6M9 16h4"
          stroke="currentColor"
          strokeWidth={active ? 2 : 1.6}
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "health",
    href: "/health",
    label: "Health",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path
          d="M12 20s-7-4.5-7-10a4 4 0 017-2.65A4 4 0 0119 10c0 5.5-7 10-7 10z"
          stroke="currentColor"
          strokeWidth={active ? 2 : 1.6}
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "metrics",
    href: "/metrics",
    label: "Metrics",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path
          d="M4 19V5M4 19h16"
          stroke="currentColor"
          strokeWidth={active ? 2 : 1.6}
          strokeLinecap="round"
        />
        <path
          d="M8 15v-3M12 15V9M16 15v-6"
          stroke="currentColor"
          strokeWidth={active ? 2.4 : 1.8}
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
      <path
        d="M4.5 11.5 12 5l7.5 6.5V19a1.25 1.25 0 01-1.25 1.25H15v-5.5H9v5.5H5.75A1.25 1.25 0 014.5 19v-7.5z"
        stroke="currentColor"
        strokeWidth={active ? 2 : 1.7}
        strokeLinejoin="round"
        fill={active ? "currentColor" : "none"}
        fillOpacity={active ? 0.15 : 0}
      />
    </svg>
  );
}

function SideNavTab({
  tab,
  isActive,
}: {
  tab: SideTab;
  isActive: boolean;
}) {
  return (
    <Link
      href={tab.href}
      aria-current={isActive ? "page" : undefined}
      className={`flex min-w-0 flex-1 flex-col items-center justify-end gap-1 pb-0.5 transition-colors ${
        isActive ? "text-rose-deep" : "text-muted"
      }`}
    >
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
          isActive
            ? "border-rose/40 bg-blush/60"
            : "border-blush/80 bg-white"
        }`}
      >
        {tab.icon(isActive)}
      </span>
      <span
        className={`text-[10px] leading-none font-medium tracking-wide ${
          isActive ? "font-semibold" : ""
        }`}
      >
        {tab.label}
      </span>
    </Link>
  );
}

function HomeNavTab({ isActive }: { isActive: boolean }) {
  const router = useRouter();
  const [expanding, setExpanding] = useState(false);

  function handleClick() {
    if (isActive) return;
    setExpanding(true);
    window.setTimeout(() => {
      router.push("/");
      setExpanding(false);
    }, 220);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-current={isActive ? "page" : undefined}
      className={`flex min-w-0 flex-1 flex-col items-center justify-end gap-0.5 pb-0.5 transition-colors ${
        isActive ? "text-rose-deep" : "text-muted"
      }`}
    >
      <span
        className={`flex items-center justify-center rounded-full border-2 shadow-md transition-all duration-200 ease-out ${
          isActive
            ? "border-rose-deep bg-rose-deep text-white shadow-rose/25"
            : "border-blush bg-white text-muted shadow-rose/10"
        } h-14 w-14 -mt-4 ${expanding ? "nav-home-expand" : "scale-100"}`}
      >
        <HomeIcon active={isActive} />
      </span>
      <span
        className={`text-[10px] leading-none font-medium tracking-wide ${
          isActive ? "font-semibold" : ""
        }`}
      >
        Home
      </span>
    </button>
  );
}

export function BottomNav({ active }: { active: NavActive }) {
  const left = SIDE_TABS.slice(0, 2);
  const right = SIDE_TABS.slice(2);

  return (
    <nav
      aria-label="Main navigation"
      className="phone-bottom-nav z-50 shrink-0 border-t border-blush/60 bg-white/95 backdrop-blur-md"
    >
      <div className="flex w-full items-end justify-between gap-1 px-3 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))]">
        {left.map((tab) => (
          <SideNavTab key={tab.id} tab={tab} isActive={active === tab.id} />
        ))}
        <HomeNavTab isActive={active === "platform"} />
        {right.map((tab) => (
          <SideNavTab key={tab.id} tab={tab} isActive={active === tab.id} />
        ))}
      </div>
    </nav>
  );
}
