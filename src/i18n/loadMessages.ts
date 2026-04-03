/**
 * FILE: src/i18n/loadMessages.ts
 *
 * PURPOSE:
 * - Loads and merges all translation section files for a given locale
 *
 * NOTES:
 * - Reads locale sections from disk in a deterministic order
 * - Caches merged bundles in production to avoid repeated filesystem work
 * - Warns when duplicate top-level namespaces would overwrite earlier sections
 */

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { AbstractIntlMessages } from "next-intl";
import type { AppLocale } from "@/i18n/routing";

// Stores merged bundles for the lifetime of the current server runtime.
const messageCache = new Map<AppLocale, AbstractIntlMessages>();

export async function loadMessages(locale: AppLocale): Promise<AbstractIntlMessages> {
  // Skip caching in development so message edits are picked up immediately.
  if (process.env.NODE_ENV === 'production' && messageCache.has(locale)) {
    return messageCache.get(locale)!;
  }

  const messages: AbstractIntlMessages = {};
  const sectionsPath = path.join(process.cwd(), "src", "messages", locale, "sections");

  let files: string[];

  try {
    files = (await readdir(sectionsPath))
      .filter((file) => file.endsWith(".json"))
      .sort();
  } catch (error) {
    console.error(`[i18n] Failed to read sections directory for locale "${locale}":`, error);
    throw error;
  }

  for (const file of files) {
    const sectionPath = path.join(sectionsPath, file);

    try {
      const raw = await readFile(sectionPath, "utf8");
      const section = JSON.parse(raw) as AbstractIntlMessages;

      // Warn before a later section overwrites an existing namespace.
      for (const key of Object.keys(section)) {
        if (key in messages) {
          console.warn(
            `[i18n] Duplicate key "${key}" detected while loading ${file} for locale "${locale}". Overwriting previous value.`
          );
        }
      }

      Object.assign(messages, section);
    } catch (error) {
      console.error(`[i18n] Failed to load or parse file "${file}" for locale "${locale}":`, error);
      throw error;
    }
  }

  // Persist the merged bundle for subsequent requests in production.
  if (process.env.NODE_ENV === 'production') {
    messageCache.set(locale, messages);
  }

  return messages;
}
