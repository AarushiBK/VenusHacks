"use client";

import Image from "next/image";
import type { PassportScan } from "@/lib/passportScans";

export function ScanPreviewPopover({
  scan,
  onClose,
}: {
  scan: PassportScan | null;
  onClose: () => void;
}) {
  if (!scan) return null;

  return (
    <div
      className="absolute inset-x-3 top-3 z-30 flex max-h-[min(72%,340px)] flex-col overflow-hidden rounded-xl border border-blush/90 bg-white shadow-xl"
      role="dialog"
      aria-label={scan.title}
    >
      <div className="flex items-start justify-between gap-2 border-b border-blush/60 px-3 py-2">
        <div className="min-w-0">
          <p className="text-ink truncate text-sm font-semibold">{scan.title}</p>
          <p className="text-muted text-[11px]">
            {scan.bodyPart} · {scan.dateLabel}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-muted hover:text-ink shrink-0 rounded-lg px-2 py-1 text-lg leading-none"
          aria-label="Close scan preview"
        >
          ×
        </button>
      </div>

      <div className="relative min-h-0 flex-1 overflow-y-auto bg-ink/5">
        <Image
          src={scan.imageSrc}
          alt={scan.title}
          width={640}
          height={480}
          className="h-auto w-full object-contain"
          unoptimized
        />
      </div>

      <p className="text-muted border-t border-blush/50 px-3 py-2 text-[11px] leading-snug">
        {scan.summary}
      </p>
    </div>
  );
}
