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

type ThemeMode = 'light' | 'dark';

const THEME_EVENT = 'nine2fire-theme-change';

function getTheme(): ThemeMode {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.classList.contains('light') ? 'light' : 'dark';
}

export function useTheme() {
  const [theme, setTheme] = React.useState<ThemeMode>(() => getTheme());

  React.useEffect(() => {
    const sync = () => setTheme(getTheme());

    window.addEventListener(THEME_EVENT, sync);
    return () => window.removeEventListener(THEME_EVENT, sync);
  }, []);

  const setMode = (next: ThemeMode) => {
    if (typeof document === 'undefined') return;

    const html = document.documentElement;

    if (next === 'light') html.classList.add('light');
    else html.classList.remove('light');

    window.dispatchEvent(new Event(THEME_EVENT));
    setTheme(next);
  };

  const toggleTheme = () => {
    setMode(theme === 'light' ? 'dark' : 'light');
  };

  return {
    theme,
    isLight: theme === 'light',
    toggleTheme,
  };
}

export function ThemeToggle() {
  const t = useTranslations('Navigation');

  const { isLight, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label='Toggle theme'
      aria-pressed={isLight}
      className='relative inline-flex h-6 w-12 items-center rounded-full border border-border-token bg-surface transition-all'
      style={{
        boxShadow: isLight
          ? 'inset 0 2px 3px rgba(0,0,0,0.7), inset 0 -0.5px 3px var(--color-accent), 0 1.5px 2px 1px var(--color-primary)'
          : 'inset 0 2px 3px rgba(0,0,0,1), inset 0 -2px 2px rgba(255,255,255,0.33), 0 0 3px 1px var(--color-accent)',
      }}
    >
      <span
        className='relative inline-flex h-4.5 w-4.5 items-center justify-center rounded-full transition-all'
        style={{
          backgroundColor: isLight
            ? 'var(--color-accent)'
            : 'var(--color-primary)',
          boxShadow: isLight
            ? 'inset 0 2px 3px rgba(255,255,255,0.2), inset 0 -2px 3px rgba(0,0,0,0.2), 0 2px 6px rgba(0,0,0,0.25), 0 0 4px var(--color-primary)'
            : 'inset 0 2px 3px rgba(255,255,255,0.05), inset 0 -2px 3px rgba(0,0,0,0.6), 0 2px 6px rgba(0,0,0,0.6), 0 0 4px var(--color-accent)',
          transform: isLight ? 'translateX(26px)' : 'translateX(2px)',
        }}
      >
        <span
          className='absolute h-4 w-4 rounded-full'
          style={{
            backgroundColor: isLight
              ? 'var(--color-accent)'
              : 'var(--color-primary)',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5), 0 2px 3px rgba(0,0,0,0.5)',
          }}
        >
          <span
            className='absolute left-1/2 top-1/2 h-0.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full'
            style={{
              backgroundColor: isLight
                ? 'var(--color-primary)'
                : 'var(--color-accent)',
              boxShadow: isLight
                ? '0 0 12px 1px var(--color-primary), 0 0 10px 1px var(--color-primary)'
                : '0 0 12px 1px var(--color-accent), 0 0 10px 1px var(--color-accent)',
              animation: isLight ? undefined : 'lightPulse 2.5s ease-in-out infinite',
            }}
          />
        </span>
      </span>
    </button>
  );
}
