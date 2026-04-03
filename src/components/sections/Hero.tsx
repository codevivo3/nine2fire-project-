/**
 * FILE: src/components/sections/Hero.tsx
 *
 * Purpose:
 * - Renders the opening value proposition and top-of-page calls to action
 *
 * Notes:
 * - CTA links target in-page anchors so the landing page stays a single focused flow
 */
import { useTranslations } from "next-intl";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className='min-h-screen flex items-center justify-center -mt-16'>
      <Container className='grid gap-12 py-12 md:gap-16 md:py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-end'>
        <div className='section-grid max-w-3xl gap-8'>
          <div className='section-grid gap-4'>
            <p className='pl-[4px] text-sm font-semibold uppercase tracking-[0.18em] text-accent-token'>
              {t('eyebrow')}
            </p>
            <h1 className='max-w-3xl text-4xl font-extrabold leading-tight tracking-[-0.045em] text-foreground sm:text-5xl md:text-6xl'>
              {t('title')}
            </h1>
            <p className='max-w-2xl text-base leading-8 text-foreground/72 md:text-lg'>
              {t('description')}
            </p>
          </div>

          <div className='flex flex-col gap-3 sm:flex-row'>
            <Link
              href='/#insights'
              className={buttonClasses({ variant: 'gold' })}
            >
              {t('primaryCta')}
            </Link>
            <Link
              href='/#roadmap'
              className={buttonClasses({ variant: 'secondary' })}
            >
              {t('secondaryCta')}
            </Link>
          </div>
        </div>

        <div className='rounded-[var(--radius-lg)] border border-border-token bg-surface/80 px-6 py-8 backdrop-blur-md md:px-8'>
          <div className='section-grid gap-6'>
            <div className='flex items-center justify-between border-b border-border-token pb-4'>
              <p className='text-sm font-semibold text-foreground'>
                {t('panel.title')}
              </p>
              <span className='rounded-full bg-accent-token px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-token'>
                {t('panel.badge')}
              </span>
            </div>
            <div className='section-grid gap-4'>
              {['signal', 'capital', 'decisions'].map((item) => (
                <div
                  key={item}
                  className='rounded-[var(--radius-md)] border border-border-token bg-surface-strong/85 shadow-[var(--shadow-soft)] p-4'
                >
                  <p className='text-xs font-semibold uppercase tracking-[0.18em] text-muted'>
                    {t(`panel.items.${item}.label`)}
                  </p>
                  <p className='mt-2 text-base font-semibold text-foreground'>
                    {t(`panel.items.${item}.value`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
