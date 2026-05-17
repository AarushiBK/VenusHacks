export function Disclaimer({ variant = "light" }: { variant?: "light" | "dark" }) {
  const cls =
    variant === "dark"
      ? "text-center text-xs leading-relaxed text-slate-muted"
      : "text-muted border-t border-blush/60 pt-6 text-center text-xs leading-relaxed";

  return (
    <p className={cls}>
      All data shown is synthetic and for demonstration only. CARECHAIN does
      not provide medical advice, diagnosis, or clinical prediction.
    </p>
  );
}
