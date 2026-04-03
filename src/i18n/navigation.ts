/**
 * FILE: src/i18n/navigation.ts
 *
 * PURPOSE:
 * - Exposes locale-aware navigation primitives generated from the shared routing config
 *
 * NOTES:
 * - App code should import navigation helpers from here rather than `next/navigation`
 */
import { createNavigation } from "next-intl/navigation";
import { routing } from "@/i18n/routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

// Locale labels stay separate from routing so copy can change without affecting URLs.
export const localeOptions = [
  { value: "en", label: "EN" },
  { value: "it", label: "IT" },
] as const;
