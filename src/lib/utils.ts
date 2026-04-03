/**
 * FILE: src/lib/utils.ts
 *
 * PURPOSE:
 * - Hosts small shared utilities used across components
 */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
