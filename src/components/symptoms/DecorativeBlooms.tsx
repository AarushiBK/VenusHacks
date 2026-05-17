const BLOOMS = [
  { size: 28, color: "#b87a88", x: -40, y: -8, rotate: -12 },
  { size: 22, color: "#8fd4a0", x: 36, y: -16, rotate: 18 },
  { size: 26, color: "#f0b060", x: -8, y: 12, rotate: 6 },
  { size: 20, color: "#c8a0e8", x: 48, y: 8, rotate: -8 },
  { size: 24, color: "#f5d070", x: -52, y: 20, rotate: 14 },
];

function Bloom({ size, color, x, y, rotate }: (typeof BLOOMS)[0]) {
  return (
    <span
      className="absolute rounded-full opacity-80"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 35% 30%, ${color}, ${color}88)`,
        transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
        boxShadow: `0 4px 16px ${color}44`,
      }}
      aria-hidden
    />
  );
}

export function DecorativeBlooms() {
  return (
    <div className="relative mx-auto mb-6 flex h-20 w-32 items-center justify-center" aria-hidden>
      {BLOOMS.map((b, i) => (
        <Bloom key={i} {...b} />
      ))}
    </div>
  );
}
