import { BRAND, POSITIONING } from "@/lib/carechain";
import Link from "next/link";

export function PlatformHero() {
  return (
    <header className="flex flex-col gap-6">
      <h1 className="font-display text-ink text-3xl font-semibold leading-tight tracking-tight">
        {BRAND.tagline}
      </h1>

      <div className="flex flex-col gap-3 rounded-2xl border border-blush bg-white p-5 shadow-sm shadow-rose/5">
        <p className="text-muted text-sm font-medium uppercase tracking-wide">
          Not
        </p>
        <ul className="text-ink flex flex-col gap-1.5 text-base">
          {POSITIONING.not.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-alert" aria-hidden>
                ×
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="text-muted mt-1 text-sm font-medium uppercase tracking-wide">
          Instead
        </p>
        <p className="text-ink text-base leading-relaxed">{POSITIONING.instead}</p>
      </div>

      <CtaButtons />
    </header>
  );
}

function CtaButtons() {
  return (
    <div className="flex flex-col gap-2.5">
      <Link
        href="/carechain"
        className="rounded-2xl bg-rose-deep px-5 py-3.5 text-center text-sm font-semibold text-white shadow-md shadow-rose-deep/20 transition hover:bg-rose-deep/90"
      >
        See the demo →
      </Link>
      <Link
        href="/motherboard"
        className="rounded-2xl border border-sage/40 bg-sage-light px-5 py-3.5 text-center text-sm font-semibold text-sage transition hover:bg-sage-light/80"
      >
        Cardiovascular passport
      </Link>
    </div>
  );
}
