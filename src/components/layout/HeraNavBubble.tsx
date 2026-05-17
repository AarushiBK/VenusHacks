"use client";

import Link from "next/link";

/** Small chat bubble on the Health nav tab → full Hera chat */
export function HeraNavBubble() {
  return (
    <Link
      href="/chat"
      aria-label="Chat with Hera"
      className="hera-nav-bubble bg-rose-deep hover:bg-rose-deep/90 absolute top-0 left-1/2 z-20 flex h-8 w-8 -translate-x-1 translate-y-[-0.65rem] items-center justify-center rounded-full border-2 border-white text-white shadow-lg shadow-rose/30 transition hover:scale-105 active:scale-95"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-4 w-4"
        aria-hidden
      >
        <path
          d="M7.5 8.5h9M7.5 12h6M6 18l2.2-2.2c.5-.5 1.1-.8 1.8-.8H17a2 2 0 002-2V8a2 2 0 00-2-2H7a2 2 0 00-2 2v5a2 2 0 002 2h.5"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
