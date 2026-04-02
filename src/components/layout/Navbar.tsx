/**
 * FILE: src/components/layout/Navbar.tsx
 *
 * Purpose:
 * - Handles global navigation and locale switching for the marketing site
 *
 * Notes:
 * - Uses locale-aware links so hash navigation stays inside the active locale segment
 * - Mobile state is intentionally local to keep the header self-contained
 */
'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { buttonClasses } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { Link, localeOptions } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export function Navbar() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '/#approach', label: t('links.approach') },
    { href: '/#roadmap', label: t('links.roadmap') },
    { href: '/#insights', label: t('links.insights') },
  ];

  return (
    <header className='fixed inset-x-0 top-0 z-50 border-b border-border-token/70 bg-background/95 backdrop-blur-sm'>
      <Container className='flex h-20 items-center justify-between gap-6'>
        <BrandLogo className='shrink-0' />

        <nav className='hidden items-center gap-8 md:flex'>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='text-sm font-semibold text-foreground/82 hover:text-accent-token'
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className='hidden items-center gap-3 md:flex'>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <button
          type='button'
          className='inline-flex items-center rounded-full border border-border-token px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground md:hidden'
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls='mobile-navigation'
          aria-haspopup='menu'
        >
          {isOpen ? t('closeMenu') : t('openMenu')}
        </button>
      </Container>

      <div
        id='mobile-navigation'
        className={cn(
          'border-t border-border-token bg-background md:hidden',
          isOpen ? 'block' : 'hidden',
        )}
      >
        <Container className='section-grid py-4'>
          <nav className='section-grid'>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='text-sm font-semibold text-foreground'
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className='flex flex-wrap items-center gap-3'>
            {localeOptions.map((option) => (
              <Link
                key={option.value}
                href={pathname}
                locale={option.value}
                className={buttonClasses({
                  variant: locale === option.value ? 'gold' : 'secondary',
                  className: 'min-w-[72px]',
                })}
                onClick={() => setIsOpen(false)}
              >
                {option.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </header>
  );
}
