export function PhoneAppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="phone-app-viewport">
      <div className="phone-app-device">{children}</div>
    </div>
  );
}
