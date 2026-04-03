/****
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
    'inline-flex h-12 items-center justify-center rounded-full border px-5 text-sm font-bold tracking-[-0.01em] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-sm',
    variant === 'primary' &&
      'border-primary-token bg-primary-token text-[color:var(--color-fg)] shadow-[var(--shadow-soft)] hover:bg-surface/60 backdrop-blur-sm hover:text-primary-token hover:border-primary-token',
    variant === 'secondary' &&
      'border-border-token bg-surface/60 backdrop-blur-sm text-foreground shadow-[var(--shadow-soft)] hover:bg-accent-token hover:text-primary-token hover:border-accent-token',
    variant === 'gold' &&
      'border-accent-token bg-accent-token text-primary-token shadow-[var(--shadow-soft)] hover:bg-surface/60 backdrop-blur-sm hover:text-foreground hover:border-accent-token',
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
