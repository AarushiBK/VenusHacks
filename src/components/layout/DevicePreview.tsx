import type { ReactNode } from "react";
import { IPhoneFrame } from "./IPhoneFrame";

interface DevicePreviewProps {
  children: ReactNode;
}

export function DevicePreview({ children }: DevicePreviewProps) {
  return (
    <div className="min-h-dvh md:flex md:items-center md:justify-center md:bg-[#0d0d0f] md:p-8">
      <IPhoneFrame>{children}</IPhoneFrame>
    </div>
  );
}
