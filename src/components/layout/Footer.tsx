/**
 * FILE: src/components/layout/Footer.tsx
 *
 * PURPOSE:
 * - Renders the global footer with localized navigation, legal links, and contact actions
 *
 * NOTES:
 * - Reuses `NavLink` so link hover treatment matches the header
 * - Contact actions stay plain anchors because they target external destinations
 */
import { useTranslations } from 'next-intl';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { Container } from '@/components/ui/Container';

import { NavLink } from '@/components/ui/NavLink';
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

  // Shared icon-link treatment keeps the contact row visually consistent.
  const contactLinkClasses = `
    link-highlight
    link-highlight--icon
    group
    inline-flex items-center justify-center
    w-10 h-10
    text-[color:var(--color-fg)]
    transition-transform duration-200
    hover:scale-105
  `;

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
          <p className='text-xs font-semibold uppercase tracking-[0.18em] text-accent-eyebrow-token'>
            {t('navTitle')}
          </p>
          <div className='section-grid gap-3'>
            {navLinks.map((link) => (
              <NavLink key={link.label} href={link.href} className="inline-block w-fit">
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className='section-grid gap-4'>
          <p className='text-xs font-semibold uppercase tracking-[0.18em] text-accent-eyebrow-token'>
            {t('legalTitle')}
          </p>
          <div className='section-grid gap-3'>
            {legalLinks.map((link) => (
              <NavLink key={link.label} href={link.href} className="inline-block w-fit">
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className='section-grid gap-4'>
          <p className='text-xs font-semibold uppercase tracking-[0.18em] text-accent-eyebrow-token'>
            Contact
          </p>
          <div className='flex items-center gap-4'>
            <a
              href='mailto:info@nine2fire.com'
              className={contactLinkClasses}
            >
              <span className="relative z-10">
                <FaEnvelope className='h-4 w-4 opacity-80 group-hover:opacity-100 transition' />
              </span>
              <span className='sr-only'>Email</span>
            </a>
            <a
              href='https://x.com/nine2fire'
              target='_blank'
              rel='noopener noreferrer'
              className={contactLinkClasses}
            >
              <span className="relative z-10">
                <FaXTwitter className='h-4 w-4 opacity-80 group-hover:opacity-100 transition' />
              </span>
              <span className='sr-only'>X</span>
            </a>
            <a
              href='https://www.facebook.com/profile.php?id=61575171760852'
              target='_blank'
              rel='noopener noreferrer'
              className={contactLinkClasses}
            >
              <span className="relative z-10">
                <FaFacebook className='h-4 w-4 opacity-80 group-hover:opacity-100 transition' />
              </span>
              <span className='sr-only'>Facebook</span>
            </a>
            <a
              href='https://www.instagram.com/nine2fire_blog/'
              target='_blank'
              rel='noopener noreferrer'
              className={contactLinkClasses}
            >
              <span className="relative z-10">
                <FaInstagram className='h-4 w-4 opacity-80 group-hover:opacity-100 transition' />
              </span>
              <span className='sr-only'>Instagram</span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
