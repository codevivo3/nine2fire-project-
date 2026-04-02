/**
 * FILE: src/components/layout/LanguageSwitcher.tsx
 *
 * Purpose:
 * - Handles locale switching while preserving current route
 *
 * Notes:
 * - Uses next-intl navigation helpers
 * - Designed to remain minimal and consistent with Navbar
 */
'use client';

import { useLocale } from 'next-intl';
import { Link, localeOptions, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className='flex items-center gap-1 rounded-full border border-border-token bg-surface px-2 py-1'>
      {localeOptions.map((option) => (
        <Link
          key={option.value}
          href={pathname}
          locale={option.value}
          className={cn(
            'rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em]',
            locale === option.value
              ? 'bg-accent-token text-primary-token'
              : 'text-muted hover:text-foreground',
          )}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}
