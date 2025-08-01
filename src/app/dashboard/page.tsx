import { getServerT } from '@/libs/server-i18n';
import HomePage from './page-client';

export async function generateMetadata() {
  const t = await getServerT();
  return {
    title: t('app.title'),
    description: t('app.description'),
  };
}

export default function Page() {
  return <HomePage />;
}
