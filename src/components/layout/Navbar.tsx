'use client';
/**
 * FILE: src/components/layout/Navbar.tsx
 *
 * PURPOSE:
 * - Renders the persistent site header, localized navigation, and mobile menu
 *
 * NOTES:
 * - Desktop links use the shared `NavLink` treatment so hover behavior stays consistent
 * - Mobile locale buttons preserve the current pathname while switching language
 */
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { ThemeToggle, useTheme } from '@/components/layout/ThemeToggle';
import { cn } from '@/lib/utils';
import { NavLink } from '@/components/ui/NavLink';
import { List, X, Globe } from 'phosphor-react';
import Image from 'next/image';

export function Navbar() {
  const t = useTranslations('Navigation');
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const { isLight } = useTheme();

  const links = [
    { href: '/#approach', label: t('links.approach') },
    { href: '/#roadmap', label: t('links.roadmap') },
    { href: '/#insights', label: t('links.insights') },
    { href: '/blog', label: t('links.journal') },
  ];

  return (
    <header className='fixed inset-x-0 top-0 z-50 bg-surface/80 backdrop-blur-xl'>
      <Container
        className={cn(
          'relative flex items-center justify-between gap-6 transition-all duration-300 ease-out',
          isScrolled ? 'h-14 scale-[0.97]' : 'h-14 scale-100'
        )}
      >
        <BrandLogo className='shrink-0' />

        <nav className='hidden items-center gap-8 md:flex absolute left-1/2 -translate-x-1/2'>
          {links.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className='flex items-center gap-2 md:ml-auto'>
          {/* Desktop inline toggles */}
          <div
            className={cn(
              'hidden items-center gap-2 md:flex transition-all duration-200 ease-out',
              isOpen
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-6 pointer-events-none'
            )}
          >
            <div className='flex items-center gap-1.5'>
              <Globe
                size={18}
                weight='regular'
                className='text-muted-foreground opacity-90'
              />
              <LanguageSwitcher />
            </div>

            <div className='flex items-center gap-1.5'>
              <Image
                src={isLight ? '/theme/off-bulb.svg' : '/theme/on-bulb.svg'}
                alt=''
                width={12}
                height={12}
                className='opacity-90'
              />
              <ThemeToggle />
            </div>
          </div>

          {/* Hamburger / Close */}
          <button
            type='button'
            className='inline-flex items-center justify-center p-2 text-foreground'
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls='mobile-navigation'
            aria-haspopup='menu'
          >
            <span className="relative inline-flex h-6 w-6">
              <span
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out",
                  isOpen ? "opacity-0 scale-90" : "opacity-100 scale-100"
                )}
              >
                <List size={24} weight="regular" />
              </span>

              <span
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out",
                  isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"
                )}
              >
                <X size={24} weight="regular" />
              </span>
            </span>
          </button>
        </div>
      </Container>

      <div
        id='mobile-navigation'
        className={cn(
          'bg-background/95 backdrop-blur-sm md:hidden',
          isOpen ? 'block' : 'hidden',
        )}
      >
        <Container className='section-grid py-4 gap-6'>
          <nav className='section-grid'>
            {links.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className='flex flex-col items-start gap-4'>
            <div className='section-grid gap-1'>
              <span className='text-[10px] uppercase tracking-[0.18em] text-muted-foreground'>
                Language
              </span>
              <LanguageSwitcher />
            </div>

            <div className='section-grid gap-1'>
              <span className='text-[10px] uppercase tracking-[0.18em] text-muted-foreground'>
                Theme
              </span>
              <ThemeToggle />
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
