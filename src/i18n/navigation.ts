/**
 * FILE: src/i18n/navigation.ts
 *
 * Purpose:
 * - Exposes locale-aware navigation primitives generated from the shared routing config
 *
 * Notes:
 * - App code should import navigation helpers from here rather than `next/navigation`
 */
import { createNavigation } from "next-intl/navigation";
import { routing } from "@/i18n/routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

// Locale switcher options stay separate from the routing config so labels can
// evolve without touching URL behavior.
export const localeOptions = [
  { value: "en", label: "EN" },
  { value: "it", label: "IT" },
] as const;
