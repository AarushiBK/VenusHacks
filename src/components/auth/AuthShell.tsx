export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-flow-root min-h-dvh w-full bg-[#f3ebe4]">
      <div className="phone-app-viewport">
        <div className="phone-app-device flex min-h-dvh flex-col">{children}</div>
      </div>
    </div>
  );
}
