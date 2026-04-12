/**
 * FILE: src/app/[locale]/layout.tsx
 *
 * PURPOSE:
 * - Composes the locale-aware application shell for translated pages
 * - Bridges next-intl request state with shared navigation and footer chrome
 *
 * NOTES:
 * - Locale validation happens at the segment boundary to fail fast with `notFound()`
 * - Page-level metadata can inherit from this layout while staying translation-aware
 */
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "use-intl";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { loadMessages } from "@/i18n/loadMessages";
import { routing, type AppLocale } from "@/i18n/routing";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getTranslations({
    locale: resolvedLocale,
    namespace: "Metadata",
  });

  return {
    // Keeps route metadata localized without duplicating root defaults.
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const resolvedLocale = locale as AppLocale;
  setRequestLocale(resolvedLocale);

  return (
    <NextIntlClientProvider
      key={resolvedLocale}
      locale={resolvedLocale}
      // Passes the locale bundle through once so client components can read translations.
      messages={await loadMessages(resolvedLocale)}
    >
      <div className="relative min-h-screen text-foreground">
        <Navbar />
        {children}
        <Footer />
        <CookieBanner />
      </div>
    </NextIntlClientProvider>
  );
}
