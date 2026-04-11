/**
 * FILE: src/app/[locale]/disclaimer/page.tsx
 *
 * PURPOSE:
 * - Renders the localized legal disclaimer page for finance-related content
 */
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import type { AppLocale } from "@/i18n/routing";

type DisclaimerPageProps = {
  params: Promise<{ locale: AppLocale }>;
};

const sectionKeys = [
  "noFinancialAdvice",
  "educationalOnly",
  "noGuarantees",
  "personalResponsibility",
  "externalLinks",
] as const;

export default async function DisclaimerPage({ params }: DisclaimerPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Disclaimer" });

  return (
    <main className="py-16 md:py-24">
      <Container>
        <article className="mx-auto max-w-3xl rounded-[var(--radius-lg)] border border-border-token bg-surface p-6 backdrop-blur-lg md:p-10">
          <header className="section-grid gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-eyebrow-token">
              {t("eyebrow")}
            </p>
            <h1 className="text-4xl font-bold tracking-[-0.04em] text-foreground sm:text-5xl">
              {t("title")}
            </h1>
            <p className="text-sm leading-7 text-foreground/72 md:text-base">
              {t("intro")}
            </p>
          </header>

          <div className="section-grid mt-10 gap-8">
            {sectionKeys.map((key) => (
              <section key={key} className="section-grid gap-3">
                <h2 className="text-2xl font-bold tracking-[-0.03em] text-foreground">
                  {t(`${key}.title`)}
                </h2>
                <p className="text-sm leading-7 text-foreground/72 md:text-base">
                  {t(`${key}.body`)}
                </p>
              </section>
            ))}
          </div>
        </article>
      </Container>
    </main>
  );
}
