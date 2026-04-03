/**
 * FILE: src/i18n/loadMessages.ts
 *
 * PURPOSE
 * - Loads and merges all translation section files for a given locale
 *
 * IMPROVEMENTS
 * - Adds basic caching per locale (avoids repeated fs reads in dev)
 * - Adds error handling for missing/malformed files
 * - Warns on duplicate top-level keys (helps debugging overwrites)
 * - Keeps deterministic load order via sorted filenames
 */

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { AbstractIntlMessages } from "next-intl";
import type { AppLocale } from "@/i18n/routing";

// Simple in-memory cache (per runtime instance)
const messageCache = new Map<AppLocale, AbstractIntlMessages>();

export async function loadMessages(locale: AppLocale): Promise<AbstractIntlMessages> {
  // Disable cache in development to avoid stale data issues
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

      // Detect duplicate keys before merging
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

  // Cache result only in production
  if (process.env.NODE_ENV === 'production') {
    messageCache.set(locale, messages);
  }

  return messages;
}
