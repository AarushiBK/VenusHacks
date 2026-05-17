import type { ReactNode } from "react";

interface IPhoneFrameProps {
  children: ReactNode;
}

/** iPhone 15–style device chrome for desktop design preview (pass-through on narrow viewports). */
export function IPhoneFrame({ children }: IPhoneFrameProps) {
  return (
    <div
      className={[
        "relative mx-auto flex w-full max-w-[430px] flex-col",
        "min-h-dvh md:min-h-0",
        "md:h-[852px] md:w-[390px] md:max-w-none",
        "md:rounded-[3.25rem] md:border-[11px] md:border-[#1c1c1e] md:bg-[#1c1c1e]",
        "md:shadow-[0_28px_90px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
      ].join(" ")}
    >
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-cream md:rounded-[2.45rem]">
        <div
          className="pointer-events-none relative z-0 hidden shrink-0 bg-transparent md:block md:h-[59px]"
          aria-hidden
        >
          <div className="absolute left-1/2 top-[11px] z-30 h-[34px] w-[126px] -translate-x-1/2 rounded-full bg-black" />
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col overflow-visible">{children}</div>

        <div
          className="pointer-events-none z-30 hidden shrink-0 items-center justify-center md:flex md:h-[34px]"
          aria-hidden
        >
          <div className="h-[5px] w-[134px] rounded-full bg-black/25" />
        </div>
      </div>
    </div>
  );
}
