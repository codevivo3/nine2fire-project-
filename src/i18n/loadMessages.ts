/**
 * FILE: src/i18n/loadMessages.ts
 *
 * PURPOSE:
 * - Loads and merges all translation message files for a given locale
 *
 * NOTES:
 * - Reads locale message directories from disk in a deterministic order
 * - Caches merged bundles in production to avoid repeated filesystem work
 * - Warns when duplicate top-level namespaces would overwrite earlier sections
 */

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { AbstractIntlMessages } from "next-intl";
import type { AppLocale } from "@/i18n/routing";

const MESSAGE_DIRECTORIES = ["sections", "legal"] as const;

// Stores merged bundles for the lifetime of the current server runtime.
const messageCache = new Map<AppLocale, AbstractIntlMessages>();

async function loadMessageDirectory(
  locale: AppLocale,
  directory: (typeof MESSAGE_DIRECTORIES)[number],
  messages: AbstractIntlMessages
) {
  const directoryPath = path.join(process.cwd(), "src", "messages", locale, directory);

  let files: string[];

  try {
    files = (await readdir(directoryPath))
      .filter((file) => file.endsWith(".json"))
      .sort();
  } catch (error) {
    console.error(
      `[i18n] Failed to read "${directory}" directory for locale "${locale}":`,
      error
    );
    throw error;
  }

  for (const file of files) {
    const filePath = path.join(directoryPath, file);

    try {
      const raw = await readFile(filePath, "utf8");
      const section = JSON.parse(raw) as AbstractIntlMessages;

      for (const key of Object.keys(section)) {
        if (key in messages) {
          console.warn(
            `[i18n] Duplicate key "${key}" detected while loading ${directory}/${file} for locale "${locale}". Overwriting previous value.`
          );
        }
      }

      Object.assign(messages, section);
    } catch (error) {
      console.error(
        `[i18n] Failed to load or parse file "${directory}/${file}" for locale "${locale}":`,
        error
      );
      throw error;
    }
  }
}

export async function loadMessages(locale: AppLocale): Promise<AbstractIntlMessages> {
  if (process.env.NODE_ENV === "production" && messageCache.has(locale)) {
    return messageCache.get(locale)!;
  }

  const messages: AbstractIntlMessages = {};

  for (const directory of MESSAGE_DIRECTORIES) {
    await loadMessageDirectory(locale, directory, messages);
  }

  if (process.env.NODE_ENV === "production") {
    messageCache.set(locale, messages);
  }

  return messages;
}
