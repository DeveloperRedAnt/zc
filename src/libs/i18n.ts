'use client';

import { useEffect, useState } from 'react';

/**
 * List of supported locales
 */
export const SUPPORTED_LOCALES = ['id', 'en'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

/**
 * Default locale (Indonesian)
 */
export const DEFAULT_LOCALE: Locale = 'id';

/**
 * Key used for localStorage and cookies
 */
export const LOCALE_KEY = 'preferred_language';

/**
 * Load translations for a specific locale and namespace
 */
export async function getTranslations(locale: Locale, namespace = 'common') {
  try {
    return (await import(`../locales/${locale}/${namespace}.json`)).default;
  } catch (error) {
    console.error(`Could not load translations for ${locale}/${namespace}`, error);
    return {};
  }
}

/**
 * Save the user's locale preference
 */
export function saveLocalePreference(locale: Locale) {
  // Save to localStorage for persistence
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCALE_KEY, locale);
  }

  // Also set as cookie for server-side rendering
  document.cookie = `${LOCALE_KEY}=${locale}; path=/; max-age=31536000`; // 1 year
}

/**
 * Get the user's locale preference
 */
export function getLocalePreference(): Locale {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE;
  }

  // Check localStorage first
  const storedLocale = localStorage.getItem(LOCALE_KEY) as Locale | null;
  if (storedLocale && SUPPORTED_LOCALES.includes(storedLocale)) {
    return storedLocale;
  }

  // Check browser language as fallback
  const browserLocale = navigator.language.split('-')[0] as Locale;
  if (SUPPORTED_LOCALES.includes(browserLocale)) {
    return browserLocale;
  }

  return DEFAULT_LOCALE;
}

/**
 * Hook to use translations in components
 */
export function useTranslation(namespace = 'common') {
  // Use a more specific type for translations
  const [translations, setTranslations] = useState<Record<string, unknown>>({});
  const [locale, _setLocale] = useState<Locale>(DEFAULT_LOCALE);

  // Initialize locale on client side
  useEffect(() => {
    const savedLocale = getLocalePreference();
    // setLocale(savedLocale);

    // Load translations
    (async () => {
      const trans = await getTranslations(savedLocale, namespace);
      setTranslations(trans);
    })();
  }, [namespace]);

  // Translation function
  const t = (key: string, params?: Record<string, string>) => {
    const keys = key.split('.');
    let value: unknown = translations;

    try {
      // Navigate through the nested translation object
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          // Key not found in translations
          return key;
        }
      }

      // Handle string values with parameter replacement
      if (typeof value === 'string' && params) {
        // Start with the original string value
        let result = value;
        // Replace each parameter placeholder with its value
        for (const [paramKey, paramValue] of Object.entries(params)) {
          result = result.replace(new RegExp(`{{${paramKey}}}`, 'g'), paramValue);
        }
        return result;
      }

      // Return the found value or the original key as fallback
      return typeof value === 'string' ? value : key;
    } catch (error) {
      console.error('Translation error:', error);
      return key;
    }
  };

  // Change locale function
  const changeLocale = async (newLocale: Locale) => {
    saveLocalePreference(newLocale);
    // setLocale(newLocale);

    // Load new translations
    const trans = await getTranslations(newLocale, namespace);
    setTranslations(trans);
  };

  return {
    t,
    locale,
    changeLocale,
  };
}

/**
 * Get the display name of a locale in the current locale
 */
export function getLocaleDisplayName(locale: Locale, currentLocale: Locale = DEFAULT_LOCALE) {
  const names: Record<Locale, Record<Locale, string>> = {
    id: {
      id: 'Bahasa Indonesia',
      en: 'English',
    },
    en: {
      id: 'Bahasa Indonesia',
      en: 'English',
    },
  };

  return names[currentLocale][locale];
}
