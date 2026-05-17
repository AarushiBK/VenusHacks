import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-burgundy text-white shadow-md shadow-burgundy/20 hover:bg-burgundy-dark focus-visible:ring-burgundy/30",
  secondary:
    "border border-border bg-white text-ink hover:border-burgundy/40 hover:bg-cream-dark focus-visible:ring-burgundy/20",
  ghost: "text-burgundy hover:bg-burgundy/5 focus-visible:ring-burgundy/20",
};

export function Button({
  variant = "primary",
  fullWidth,
  className = "",
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`ios-touch-target inline-flex items-center justify-center gap-2 px-5 py-3.5 transition focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
