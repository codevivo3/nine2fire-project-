/**
 * FILE: src/app/[locale]/page.tsx
 *
 * Purpose:
 * - Assembles the localized landing page from reusable marketing sections
 *
 * Notes:
 * - Section ordering here defines the narrative flow for every supported locale
 */
import { setRequestLocale } from "next-intl/server";
import { CTA } from "@/components/sections/CTA";
import { Hero } from "@/components/sections/Hero";
import { Insights } from "@/components/sections/Insights";
import { Roadmap } from "@/components/sections/Roadmap";
import { ValueProps } from "@/components/sections/ValueProps";
import type { AppLocale } from "@/i18n/routing";

type LandingPageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export default async function LandingPage({ params }: LandingPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="pt-24 md:pt-28">
      <Hero />
      <ValueProps />
      <Roadmap />
      <Insights />
      <CTA />
    </main>
  );
}
