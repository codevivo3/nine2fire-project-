/**
 * FILE: src/app/[locale]/page.tsx
 *
 * Purpose:
 * - Assembles the localized landing page from reusable marketing sections
 *
 * Notes:
 * - Section ordering here defines the narrative flow for every supported locale
 */
import { CTA } from "@/components/sections/CTA";
import { Hero } from "@/components/sections/Hero";
import { Insights } from "@/components/sections/Insights";
import { Roadmap } from "@/components/sections/Roadmap";
import { ValueProps } from "@/components/sections/ValueProps";

export default function LandingPage() {
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
