/**
 * FILE: src/i18n/request.ts
 *
 * Purpose:
 * - Resolves request-time locale and message payloads for next-intl
 *
 * Notes:
 * - Invalid or missing locales fall back to the default locale instead of failing
 */
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "use-intl";
import { loadMessages } from "@/i18n/loadMessages";
import { routing } from "@/i18n/routing";

export default getRequestConfig(async ({ locale, requestLocale }) => {
  const requestedLocale = locale ?? (await requestLocale);
  // Always normalize against the shared routing config so server and client
  // navigation resolve the same locale set.
  const resolvedLocale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;

  return {
    locale: resolvedLocale,
    messages: await loadMessages(resolvedLocale),
  };
});
