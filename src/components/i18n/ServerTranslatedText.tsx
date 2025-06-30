import { getServerT } from '@/libs/server-i18n';
import { ReactNode } from 'react';

interface ServerTranslatedTextProps {
  id: string;
  params?: Record<string, string>;
  defaultText?: string;
  className?: string;
  children?: ReactNode;
  namespace?: string;
}

/**
 * Server component for translating text in server components.
 * Usage: <ServerTranslatedText id="app.title" /> or <ServerTranslatedText id="greeting">Hello</ServerTranslatedText>
 */
export async function ServerTranslatedText({
  id,
  params,
  defaultText,
  className,
  children,
  namespace = 'common',
}: ServerTranslatedTextProps) {
  const t = await getServerT(namespace);

  const translatedText = await t(id, params);
  // Use the translated text if it's not the same as the key (meaning it was found),
  // otherwise use defaultText or children, or finally the key itself
  const displayText = translatedText !== id ? translatedText : defaultText || children || id;

  return <span className={className}>{displayText}</span>;
}
