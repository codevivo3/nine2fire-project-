/**
 * FILE: src/components/ui/Button.tsx
 *
 * Purpose:
 * - Provides the shared button primitive and class generator used across the site
 *
 * Notes:
 * - `buttonClasses` is exported so links and buttons can share the same visual variants
 */
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "gold";

type ButtonClassOptions = {
  variant?: ButtonVariant;
  className?: string;
};

export function buttonClasses({
  variant = "primary",
  className,
}: ButtonClassOptions = {}) {
  return cn(
    "inline-flex h-12 items-center justify-center rounded-full border px-5 text-sm font-semibold tracking-[-0.01em]",
    variant === "primary" &&
      "border-primary-token bg-primary-token text-[color:var(--color-fg)] hover:opacity-90",
    variant === "secondary" &&
      "border-border-token bg-transparent text-foreground hover:border-accent-token hover:text-accent-token",
    variant === "gold" &&
      "border-accent-token bg-accent-token text-primary-token hover:opacity-90",
    className,
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, className })}
      {...props}
    />
  );
}
