/**
 * FILE: src/components/layout/Footer.tsx
 *
 * Purpose:
 * - Renders the global footer with localized navigation and legal placeholders
 *
 * Notes:
 * - Shares the same anchor structure as the header to keep landing-page sections discoverable
 */
import { useTranslations } from 'next-intl';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { Container } from '@/components/ui/Container';
import { Link } from '@/i18n/navigation';
import {
  FaXTwitter,
  FaInstagram,
  FaFacebook,
  FaEnvelope,
} from 'react-icons/fa6';

export function Footer() {
  const t = useTranslations('Footer');

  const navLinks = [
    { href: '/#approach', label: t('navigation.approach') },
    { href: '/#roadmap', label: t('navigation.roadmap') },
    { href: '/#insights', label: t('navigation.insights') },
  ];

  const legalLinks = [
    { href: '/', label: t('legal.privacy') },
    { href: '/', label: t('legal.terms') },
  ];

  return (
    <footer className='bg-surface/80 backdrop-blur-md text-[color:var(--color-fg)]'>
      <Container className='section-grid py-12 md:grid-cols-[2fr_1fr_1fr_1fr] md:items-start'>
        <div className='section-grid gap-4'>
          <BrandLogo />
          <p className='max-w-sm text-sm leading-7 text-[color:var(--color-fg)]/72'>
            {t('tagline')}
          </p>
          <p className='text-xs  tracking-[0.18em] text-[color:var(--color-fg)]/50'>
            {t('copyright')}
          </p>
        </div>

        <div className='section-grid gap-4'>
          <p className='text-xs font-semibold uppercase tracking-[0.18em] text-accent-token'>
            {t('navTitle')}
          </p>
          <div className='section-grid gap-3'>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className='text-sm text-[color:var(--color-fg)]/80 hover:text-accent-token'
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className='section-grid gap-4'>
          <p className='text-xs font-semibold uppercase tracking-[0.18em] text-accent-token'>
            {t('legalTitle')}
          </p>
          <div className='section-grid gap-3'>
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className='text-sm text-[color:var(--color-fg)]/80 hover:text-accent-token'
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className='section-grid gap-4'>
          <p className='text-xs font-semibold uppercase tracking-[0.18em] text-accent-token'>
            Contact
          </p>
          <div className='flex items-center gap-4'>
            <a
              href='mailto:info@nine2fire.com'
              className='group flex items-center justify-center rounded-full p-2 text-[color:var(--color-fg)]/70 hover:text-accent-token hover:bg-surface/60 transition'
            >
              <FaEnvelope className='h-4 w-4 opacity-80 group-hover:opacity-100 transition' />
              <span className='sr-only'>Email</span>
            </a>
            <a
              href='https://x.com/nine2fire'
              target='_blank'
              rel='noopener noreferrer'
              className='group flex items-center justify-center rounded-full p-2 text-[color:var(--color-fg)]/70 hover:text-accent-token hover:bg-surface/60 transition'
            >
              <FaXTwitter className='h-4 w-4 opacity-80 group-hover:opacity-100 transition' />
              <span className='sr-only'>X</span>
            </a>
            <a
              href='https://www.facebook.com/profile.php?id=61575171760852'
              target='_blank'
              rel='noopener noreferrer'
              className='group flex items-center justify-center rounded-full p-2 text-[color:var(--color-fg)]/70 hover:text-accent-token hover:bg-surface/60 transition'
            >
              <FaFacebook className='h-4 w-4 opacity-80 group-hover:opacity-100 transition' />
              <span className='sr-only'>Facebook</span>
            </a>
            <a
              href='https://www.instagram.com/nine2fire_blog/'
              target='_blank'
              rel='noopener noreferrer'
              className='group flex items-center justify-center rounded-full p-2 text-[color:var(--color-fg)]/70 hover:text-accent-token hover:bg-surface/60 transition'
            >
              <FaInstagram className='h-4 w-4 opacity-80 group-hover:opacity-100 transition' />
              <span className='sr-only'>Instagram</span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
