import { getTranslations, setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";

type TermsPageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Terms" });

  return (
    <main className="py-16 md:py-24">
      <Container>
        <article className="mx-auto max-w-3xl rounded-[var(--radius-lg)] border border-border-token bg-surface p-6 backdrop-blur-lg md:p-10">
          <header className="section-grid gap-4">
            <h1 className="text-4xl font-bold tracking-[-0.04em] text-foreground sm:text-5xl">
              {t("title")}
            </h1>
            <p className="text-sm leading-7 text-foreground/72 md:text-base">
              {t("intro")}
            </p>
          </header>

          <div className="section-grid mt-10 gap-8">
            {[
              "usage",
              "intellectualProperty",
              "limitations",
              "liability",
              "changes",
              "contact",
            ].map((key) => (
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