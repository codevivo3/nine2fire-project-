/****
 * FILE: src/components/layout/ThemeToggle.tsx
 *
 * PURPOSE
 * - Renders the theme toggle control (light ↔ dark)
 * - Provides a shared `useTheme` hook for cross-component synchronization
 *
 * BEHAVIOR
 * - Theme is applied by toggling the `light` class on `<html>`
 * - A custom event (`nine2fire-theme-change`) keeps components in sync
 * - Toggle uses transform-based motion for smooth, hardware-like interaction
 *
 * VISUAL MODEL
 * - Knob = moving physical element (primary actor)
 * - Track = surface with depth and inner shadows
 * - Side icons (bulbs) = contextual indicators (state representation)
 *   • Left: OFF bulb (light mode context)
 *   • Right: ON bulb (dark mode context)
 * - Knob fully occludes background elements to preserve material illusion
 *
 * MOTION
 * - Transform-based movement (no layout shift)
 * - Fast response (~150ms) for snappy interaction
 * - Glow animation only active in dark mode
 *
 * PRINCIPLES
 * - No hardcoded colors (uses design tokens)
 * - Visual state derived from theme, not local duplication
 * - Separation between interaction (toggle) and rendering (CSS variables)
 */
'use client';

import * as React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type ThemeMode = 'light' | 'dark';

// Custom event used to broadcast theme changes across the app
const THEME_EVENT = 'nine2fire-theme-change';

// Reads current theme from <html> class (source of truth)
function getTheme(): ThemeMode {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.classList.contains('light') ? 'light' : 'dark';
}

// Shared hook to access and mutate theme state with global synchronization
export function useTheme() {
  const [theme, setTheme] = React.useState<ThemeMode>(() => getTheme());

  React.useEffect(() => {
    const sync = () => setTheme(getTheme());

    window.addEventListener(THEME_EVENT, sync);
    return () => window.removeEventListener(THEME_EVENT, sync);
  }, []);

  // Applies theme to DOM and notifies listeners
  const setMode = (next: ThemeMode) => {
    if (typeof document === 'undefined') return;

    const html = document.documentElement;

    if (next === 'light') html.classList.add('light');
    else html.classList.remove('light');

    window.dispatchEvent(new Event(THEME_EVENT));
    setTheme(next);
  };

  // Convenience toggle (light ↔ dark)
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

  // ThemeToggle renders a physical-style switch with embedded lighting metaphor
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
      <span className='relative inline-flex h-full w-full items-center'>
        <Image
          src='/theme/off-bulb.svg'
          alt=''
          width={4}
          height={4}
          className='pointer-events-none absolute left-1/8 top-1/2 h-4 w-4 -translate-y-1/2 opacity-80'
        />
        <span
          className='relative z-10 inline-flex h-4.5 w-4.5 items-center justify-center rounded-full transition-all duration-[150ms]'
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
            className='absolute h-4 w-4 rounded-full overflow-hidden'
            style={{
              backgroundColor: isLight
                ? 'var(--color-accent)'
                : 'var(--color-primary)',
              boxShadow:
                'inset 0 1px 2px rgba(0,0,0,0.5), 0 2px 3px rgba(0,0,0,0.5)',
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
                animation: isLight
                  ? undefined
                  : 'lightPulse 2.5s ease-in-out infinite',
              }}
            />
          </span>
        </span>
        <Image
          src='/theme/on-bulb.svg'
          alt=''
          width={4}
          height={4}
          className='pointer-events-none absolute right-1/8 top-1/2 h-4 w-4 -translate-y-1/2 opacity-80'
        />
      </span>
    </button>
  );
}
