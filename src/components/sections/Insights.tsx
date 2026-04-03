/**
 * FILE: src/components/sections/Insights.tsx
 *
 * PURPOSE:
 * - Presents editorial content themes that reinforce the site's point of view
 */
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Insights() {
  const t = useTranslations("Insights");

  return (
    <section id='insights'>
      <Container className='py-16 md:py-24'>
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />

        <div className='mt-10 grid gap-4 md:mt-12 md:grid-cols-3'>
          {['journal', 'playbook', 'signal'].map((item) => (
            <article
              key={item}
              className='rounded-[var(--radius-lg)] border border-border-token bg-surface/80 p-6 backdrop-blur-md'
            >
              <div className='flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted'>
                <span className='text-accent-eyebrow-token'>
                  {t(`items.${item}.category`)}
                </span>
                <span>{t(`items.${item}.time`)}</span>
              </div>
              <h3 className='mt-6 text-2xl font-bold leading-tight tracking-[-0.035em] text-foreground'>
                {t(`items.${item}.title`)}
              </h3>
              <p className='mt-4 text-sm leading-7 text-foreground/72'>
                {t(`items.${item}.description`)}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
