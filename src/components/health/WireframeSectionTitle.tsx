export function WireframeSectionTitle({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className="font-display text-ink border-ink/25 mt-10 mb-4 border-b-2 pb-1.5 text-lg font-semibold tracking-tight first:mt-0"
    >
      {children}
    </h2>
  );
}
