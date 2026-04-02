/****
 * FILE: src/components/layout/ThemeToggle.tsx
 *
 * Purpose:
 * - Renders the placeholder control for future theme switching
 *
 * Notes:
 * - Uses the shared Navigation translation namespace
 * - Keeps the current Navbar footprint stable until theme logic is implemented
 */
'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';

export function ThemeToggle() {
  const t = useTranslations('Navigation');

  const [isLight, setIsLight] = React.useState(false);

  React.useEffect(() => {
    const html = document.documentElement;
    setIsLight(html.classList.contains('light'));
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle('light');
    setIsLight(html.classList.contains('light'));
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label='Toggle theme'
      aria-pressed={isLight}
      className='relative inline-flex h-6 w-14 items-center rounded-full border border-border-token bg-surface transition-all'
      style={{
        boxShadow: isLight
          ? 'inset 0 2px 3px rgba(0,0,0,0.7), inset 0 -0.5px 3px var(--color-accent), 0 1.5px 2px 1px var(--color-primary)'
          : 'inset 0 2px 3px rgba(0,0,0,1), inset 0 -2px 2px rgba(255,255,255,0.33), 0 0 3px 1px var(--color-accent)',
      }}
    >
      <span
        className='relative inline-flex h-4 w-4 items-center justify-center rounded-full transition-all'
        style={{
          backgroundColor: isLight
            ? 'var(--color-accent)'
            : 'var(--color-primary)',
          boxShadow: isLight
            ? 'inset 0 2px 3px rgba(255,255,255,0.2), inset 0 -2px 3px rgba(0,0,0,0.2), 0 2px 6px rgba(0,0,0,0.25), 0 0 4px var(--color-primary)'
            : 'inset 0 2px 3px rgba(255,255,255,0.05), inset 0 -2px 3px rgba(0,0,0,0.6), 0 2px 6px rgba(0,0,0,0.6), 0 0 4px var(--color-accent)',
          transform: isLight ? 'translateX(35px)' : 'translateX(3px)',
        }}
      >
        <span
          className='absolute h-3.5 w-3.5 rounded-full'
          style={{
            backgroundColor: isLight
              ? 'var(--color-accent)'
              : 'var(--color-primary)',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)',
          }}
        >
          <span
            className='absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full'
            style={{
              backgroundColor: isLight
                ? 'var(--color-primary)'
                : 'var(--color-accent)',
            }}
          />
        </span>
      </span>
    </button>
  );
}
