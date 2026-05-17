import { FirebaseSetupNotice } from "@/components/FirebaseSetupNotice";
import {
  PhoneDeviceFrame,
  type PhoneFrameVariant,
} from "@/components/layout/PhoneDeviceFrame";

export function AuthShell({
  children,
  variant = "auth",
}: {
  children: React.ReactNode;
  variant?: Extract<PhoneFrameVariant, "welcome" | "auth">;
}) {
  return (
    <div className="auth-flow-root">
      <div className="phone-app-viewport">
        <PhoneDeviceFrame variant={variant} overlay={<FirebaseSetupNotice />}>
          <div className={`auth-flow-inner auth-flow-inner--${variant}`}>
            {children}
          </div>
        </PhoneDeviceFrame>
      </div>
    </div>
  );
}
