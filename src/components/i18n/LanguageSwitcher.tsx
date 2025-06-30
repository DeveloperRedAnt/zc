'use client';

import {
  Locale,
  SUPPORTED_LOCALES,
  getLocaleDisplayName,
  getLocalePreference,
  saveLocalePreference,
  useTranslation,
} from '@/libs/i18n';
import { useEffect, useState } from 'react';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const [currentLocale, setCurrentLocale] = useState<Locale>('id');
  const { changeLocale } = useTranslation();

  // Initialize with saved locale preference
  useEffect(() => {
    const savedLocale = getLocalePreference();
    setCurrentLocale(savedLocale);
  }, []);

  const handleLanguageChange = (newLocale: Locale) => {
    // Save preference and update state
    saveLocalePreference(newLocale);
    setCurrentLocale(newLocale);
    // Update translations throughout the app
    changeLocale(newLocale);
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {SUPPORTED_LOCALES.map((locale) => (
        <button
          type="button"
          key={locale}
          onClick={() => handleLanguageChange(locale)}
          className={`px-2 py-1 text-sm rounded transition-colors ${
            currentLocale === locale
              ? 'bg-primary text-primary-foreground'
              : 'bg-background hover:bg-secondary'
          }`}
          aria-current={currentLocale === locale ? 'true' : 'false'}
        >
          {getLocaleDisplayName(locale, currentLocale)}
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher;
