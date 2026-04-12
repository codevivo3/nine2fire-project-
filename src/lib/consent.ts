export type ConsentValue = 'accepted' | 'declined';

const CONSENT_STORAGE_KEY = 'consent';

export function getConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null;

  const value = localStorage.getItem(CONSENT_STORAGE_KEY);
  return value === 'accepted' || value === 'declined' ? value : null;
}

export function setConsent(value: ConsentValue) {
  localStorage.setItem(CONSENT_STORAGE_KEY, value);
}
