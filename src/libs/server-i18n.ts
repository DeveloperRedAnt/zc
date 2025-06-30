'use server';

import { cookies } from 'next/headers';

// Internal constants (not exported directly due to 'use server' restrictions)
const SUPPORTED_LOCALES = ['id', 'en'] as const;
// Type can be exported as it's not a value export
export type Locale = (typeof SUPPORTED_LOCALES)[number];
const DEFAULT_LOCALE: Locale = 'id';
const LOCALE_KEY = 'preferred_language';

// Async functions to access constants (compliant with 'use server')
export async function getSupportedLocales() {
  return SUPPORTED_LOCALES;
}

export async function getDefaultLocale(): Promise<Locale> {
  return DEFAULT_LOCALE;
}

export async function getLocaleKey(): Promise<string> {
  return LOCALE_KEY;
}

/**
 * Get the current locale from cookies (for server components)
 */
export async function getLocaleFromRequest(): Promise<Locale> {
  try {
    // Get locale from cookies
    const cookieStore = await cookies();
    const localeKey = await getLocaleKey();
    const localeCookie = cookieStore.get(localeKey)?.value as Locale | undefined;

    const supportedLocales = await getSupportedLocales();
    if (localeCookie && supportedLocales.includes(localeCookie)) {
      return localeCookie;
    }
  } catch (error) {
    console.error('Error determining locale from cookies:', error);
  }

  // Default fallback
  return await getDefaultLocale();
}

/**
 * Load translations for server components
 */
export async function getServerTranslations(namespace = 'common', locale?: Locale) {
  const resolvedLocale = locale || (await getLocaleFromRequest());

  try {
    return (await import(`../locales/${resolvedLocale}/${namespace}.json`)).default;
  } catch (error) {
    console.error(`Could not load translations for ${resolvedLocale}/${namespace}`, error);
    return {};
  }
}

/**
 * Get translation function for server components
 */
export async function getServerT(namespace = 'common', locale?: Locale) {
  const translations = await getServerTranslations(namespace, locale);

  return async (key: string, params?: Record<string, string>) => {
    const keys = key.split('.');
    let value: unknown = translations;

    try {
      // Navigate through the nested translation object
      for (const k of keys) {
        if (typeof value === 'object' && value !== null && k in value) {
          value = (value as Record<string, unknown>)[k];
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
}
