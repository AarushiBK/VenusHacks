export type PhoneFrameVariant = "default" | "welcome" | "auth";

const VARIANT_CLASS: Record<PhoneFrameVariant, string> = {
  default: "",
  welcome: "phone-device-frame--welcome",
  auth: "phone-device-frame--auth",
};

/**
 * iPhone 16–style device chrome: 19.5:9 frame, Dynamic Island, home indicator.
 */
export function PhoneDeviceFrame({
  children,
  variant = "default",
  overlay,
}: {
  children: React.ReactNode;
  variant?: PhoneFrameVariant;
  /** Rendered on the frame layer (e.g. iOS toast below Dynamic Island). */
  overlay?: React.ReactNode;
}) {
  const variantClass = VARIANT_CLASS[variant];

  return (
    <div className={`phone-app-device phone-device-frame flex flex-col ${variantClass}`.trim()}>
      <div className="phone-status-region" aria-hidden>
        <span className="phone-dynamic-island" />
      </div>
      {overlay}
      <div className="phone-device-content flex min-h-0 flex-1 flex-col">{children}</div>
      <div className="phone-home-indicator-wrap" aria-hidden>
        <span className="phone-home-indicator" />
      </div>
    </div>
  );
}
