/**
 * FILE: src/i18n/loadMessages.ts
 *
 * Purpose:
 * - Lazily loads locale message bundles on demand
 *
 * Notes:
 * - Explicit loader mapping keeps supported locales type-safe and tree-shakeable
 */
import type { AbstractIntlMessages } from "next-intl";
import type { AppLocale } from "@/i18n/routing";

const loaders: Record<AppLocale, () => Promise<AbstractIntlMessages>> = {
  en: () => import("@/messages/en.json").then((module) => module.default),
  it: () => import("@/messages/it.json").then((module) => module.default),
};

export async function loadMessages(locale: AppLocale) {
  return loaders[locale]();
}
