import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "./helpers";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  children: ReactNode;
}

export function Button({
  className,
  children,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-neutral-600 disabled:opacity-60 disabled:cursor-not-allowed";
  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
      "bg-gradient-to-r from-emerald-300 via-emerald-200 to-amber-200 text-neutral-900 shadow-[0_10px_40px_-16px_rgba(16,185,129,0.6)] hover:shadow-[0_12px_45px_-16px_rgba(250,204,21,0.45)]",
    secondary:
      "border border-neutral-800 bg-neutral-900/70 text-white hover:-translate-y-0.5 hover:border-neutral-700 hover:bg-neutral-800/90",
    ghost: "bg-transparent text-neutral-200 hover:bg-neutral-800/60",
  };
  const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
