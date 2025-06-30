import { Messages, createTranslator } from 'next-intl';

export default function getServerSideT(messages: Messages, locale: string, namespace?: string) {
  // next-intl createTranslator returns a sync translation function
  return createTranslator({
    messages,
    namespace,
    locale,
    onError: (error) => {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('Translation error:', error);
      }
    },
  });
}
