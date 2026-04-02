/**
 * FILE: src/i18n/routing.ts
 *
 * Purpose:
 * - Centralizes the supported locales and routing strategy for next-intl
 *
 * Notes:
 * - Other i18n helpers import this config so locale behavior stays consistent
 */
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "it"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type AppLocale = (typeof routing.locales)[number];
