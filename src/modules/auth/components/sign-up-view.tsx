import { useTranslation } from '@/libs/i18n';
import { cn } from '@/libs/utils';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { IconStar } from '@tabler/icons-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
};

export default function SignUpViewPage({ stars }: { stars: number }) {
  const { t } = useTranslation();
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/examples/authentication"
        className={cn('absolute top-4 right-4 hidden md:top-8 md:right-8')}
      >
        {t('auth.createAccount')}
      </Link>
      <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          {t('auth.logo')}
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">&ldquo;{t('auth.quote')}&rdquo;</p>
            <footer className="text-sm">{t('auth.quoteAuthor')}</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center justify-center p-4 lg:p-8">
        <div className="flex w-full max-w-md flex-col items-center justify-center space-y-6">
          {/* github link  */}
          <Link
            className={cn('group inline-flex hover:text-yellow-200')}
            target="_blank"
            href={'https://github.com/kiranism/next-shadcn-dashboard-starter'}
          >
            <div className="flex items-center">
              <GitHubLogoIcon className="size-4" />
              <span className="ml-1 inline">{t('auth.starOnGithub')}</span>{' '}
            </div>
            <div className="ml-2 flex items-center gap-1 text-sm md:flex">
              <IconStar
                className="size-4 text-gray-500 transition-all duration-300 group-hover:text-yellow-300"
                fill="currentColor"
              />
              <span className="font-display font-medium">{stars}</span>
            </div>
          </Link>
          <p className="text-muted-foreground px-8 text-center text-sm">
            {t('auth.agreementPrefix')}{' '}
            <Link href="/terms" className="hover:text-primary underline underline-offset-4">
              {t('auth.termsOfService')}
            </Link>{' '}
            {t('auth.agreementConnector')}{' '}
            <Link href="/privacy" className="hover:text-primary underline underline-offset-4">
              {t('auth.privacyPolicy')}
            </Link>
            {t('auth.agreementSuffix')}
          </p>
        </div>
      </div>
    </div>
  );
}
