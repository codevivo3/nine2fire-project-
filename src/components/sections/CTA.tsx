/**
 * FILE: src/components/sections/CTA.tsx
 *
 * PURPOSE:
 * - Closes the landing page with a lightweight lead capture interaction
 *
 * NOTES:
 * - The form remains presentational for now; submission wiring can be added later
 */
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CTA() {
  const t = useTranslations("CTA");

  return (
    <section>
      <Container className='py-16 md:py-24'>
        <div className='rounded-[var(--radius-lg)] border border-border-token bg-surface-strong/85 p-6 backdrop-blur-lg md:p-10'>
          <div className='section-grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] md:items-end'>
            <div className='section-grid gap-4'>
              <p className='text-xs font-semibold uppercase tracking-[0.18em] text-accent-eyebrow-token'>
                {t('eyebrow')}
              </p>
              <h2 className='max-w-2xl text-3xl font-bold tracking-[-0.04em] text-foreground sm:text-4xl'>
                {t('title')}
              </h2>
              <p className='max-w-xl text-sm leading-7 text-foreground/72 md:text-base'>
                {t('description')}
              </p>
            </div>

            <form className='section-grid gap-3'>
              <label htmlFor='email' className='sr-only'>
                {t('emailLabel')}
              </label>
              <input
                id='email'
                name='email'
                type='email'
                placeholder={t('emailPlaceholder')}
                className='h-12 rounded-full border border-border-token bg-surface/60 backdrop-blur-sm px-5 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent-token'
              />
              <Button type='submit' variant='gold' className='w-full'>
                {t('button')}
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
