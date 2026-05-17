import { PhoneDeviceFrame } from "./PhoneDeviceFrame";

export function PhoneAppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="phone-app-viewport">
      <PhoneDeviceFrame>{children}</PhoneDeviceFrame>
    </div>
  );
}
