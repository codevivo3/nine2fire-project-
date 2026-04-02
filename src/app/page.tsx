/**
 * FILE: src/app/page.tsx
 *
 * Purpose:
 * - Redirects the non-localized root route into the default locale segment
 *
 * Notes:
 * - Keeps a single localized page tree as the source of truth
 */
import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
