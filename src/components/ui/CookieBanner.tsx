'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { loadGoogleAnalytics } from '@/lib/analytics';
import { getConsent, setConsent } from '@/lib/consent';

export function CookieBanner() {
  const t = useTranslations('CookieBanner');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getConsent();

    if (!consent) {
      setVisible(true);
      return;
    }

    if (consent === 'accepted') {
      loadGoogleAnalytics();
    }
  }, []);

  function handleAccept() {
    setConsent('accepted');
    loadGoogleAnalytics();
    setVisible(false);
  }

  function handleDecline() {
    setConsent('declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 flex justify-center sm:inset-x-6">
      <div className="w-full max-w-xl rounded-[var(--radius-lg)] border border-border-token bg-surface/90 p-4 shadow-[var(--shadow-soft)] backdrop-blur-md">
        <div className="section-grid gap-3">
          <p className="text-sm leading-6 text-foreground/80">{t('body')}</p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleAccept}
              className="flex-1 rounded-full border border-accent-token bg-accent-token px-4 py-2 text-sm font-semibold text-[color:var(--color-on-accent)] transition hover:brightness-95"
            >
              {t('accept')}
            </button>

            <button
              type="button"
              onClick={handleDecline}
              className="flex-1 rounded-full border border-border-token bg-surface px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-surface-strong"
            >
              {t('decline')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
