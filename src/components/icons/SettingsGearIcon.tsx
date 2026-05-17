/** Standard app settings (cog) icon */
export function SettingsGearIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M10.3 4.3a1.5 1.5 0 013.4 0l.2.6a1.5 1.5 0 001.9.9l.6-.2a1.5 1.5 0 012.1 2.1l-.2.6a1.5 1.5 0 00.9 1.9l.6.2a1.5 1.5 0 010 3l-.6.2a1.5 1.5 0 00-.9 1.9l.2.6a1.5 1.5 0 01-2.1 2.1l-.6-.2a1.5 1.5 0 00-1.9.9l-.2.6a1.5 1.5 0 01-3.4 0l-.2-.6a1.5 1.5 0 00-1.9-.9l-.6.2a1.5 1.5 0 01-2.1-2.1l.2-.6a1.5 1.5 0 00-.9-1.9l-.6-.2a1.5 1.5 0 010-3l.6-.2a1.5 1.5 0 00.9-1.9l-.2-.6a1.5 1.5 0 012.1-2.1l.6.2a1.5 1.5 0 001.9-.9l.2-.6z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.25" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
