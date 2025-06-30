'use client';

import { useTranslation } from '@/libs/i18n';
import { ReactNode } from 'react';

interface TranslatedTextProps {
  id: string;
  params?: Record<string, string>;
  defaultText?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * Component for translating text in client components.
 * Usage: <TranslatedText id="app.title" /> or <TranslatedText id="greeting">Hello</TranslatedText>
 */
export function TranslatedText({
  id,
  params,
  defaultText,
  className,
  children,
}: TranslatedTextProps) {
  const { t } = useTranslation();

  const translatedText = t(id, params);
  // Use the translated text if it's not the same as the key (meaning it was found),
  // otherwise use defaultText or children, or finally the key itself
  const displayText = translatedText !== id ? translatedText : defaultText || children || id;

  return <span className={className}>{displayText}</span>;
}
