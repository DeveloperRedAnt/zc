import { Card, CardContent } from '@/components/card/card';
import { ServerTranslatedText } from '@/components/i18n';
import { getServerT } from '@/libs/server-i18n';

export async function generateMetadata() {
  const t = await getServerT();
  return {
    title: t('app.title'),
    description: t('app.description'),
  };
}

export default async function Index() {
  return (
    <>
      <Card className="m-[1rem]">
        <CardContent className="p-4">
          <p>
            <ServerTranslatedText id="dashboard.welcome">
              This is the home page. All content is now static.
            </ServerTranslatedText>
          </p>
          <div className="mt-2 text-center text-sm">
            <ServerTranslatedText id="dashboard.translation.prefix">
              Translation powered by
            </ServerTranslatedText>{' '}
            <a
              className="text-blue-700 hover:border-b-2 hover:border-blue-700"
              href="https://l.crowdin.com/next-js"
            >
              <ServerTranslatedText id="dashboard.translation.crowdin">
                Crowdin
              </ServerTranslatedText>
            </a>
          </div>
          <h2 className="mt-5 text-2xl font-bold">
            Boilerplate Code for Your Next.js Project with Tailwind CSS
          </h2>
          <p className="text-base">
            Next.js Boilerplate is a developer-friendly starter code for Next.js projects, built
            with Tailwind CSS and TypeScript.{' '}
            <span role="img" aria-label="zap">
              ⚡️
            </span>{' '}
            Designed with developer experience in mind, it includes:
          </p>
          <ul className="mt-3 text-base">
            <li>🚀 Next.js with App Router support</li>
            <li>🔥 TypeScript for type checking</li>
            <li>💎 Tailwind CSS integration</li>
            <li>
              🔒 Authentication with{' '}
              <a
                className="font-bold text-blue-700 hover:border-b-2 hover:border-blue-700"
                href="https://clerk.com?utm_source=github&amp;utm_medium=sponsorship&amp;utm_campaign=nextjs-boilerplate"
              >
                Clerk
              </a>{' '}
              (includes passwordless, social, and multi-factor auth)
            </li>
            <li>📦 ORM with DrizzleORM (PostgreSQL, SQLite, MySQL support)</li>
            <li>
              🌐 Multi-language support (i18n) with next-intl and{' '}
              <a
                className="font-bold text-blue-700 hover:border-b-2 hover:border-blue-700"
                href="https://l.crowdin.com/next-js"
              >
                Crowdin
              </a>
            </li>
            <li>🔴 Form handling (React Hook Form) and validation (Zod)</li>
            <li>📏 Linting and formatting (ESLint, Prettier)</li>
            <li>🦊 Git hooks and commit linting (Husky, Commitlint)</li>
            <li>🦺 Testing suite (Vitest, React Testing Library, Playwright)</li>
            <li>🎉 Storybook for UI development</li>
            <li>
              🐰 AI-powered code reviews with{' '}
              <a
                className="font-bold text-blue-700 hover:border-b-2 hover:border-blue-700"
                href="https://www.coderabbit.ai?utm_source=next_js_starter&utm_medium=github&utm_campaign=next_js_starter_oss_2025"
              >
                CodeRabbit
              </a>
            </li>

            <li>🖥️ Monitoring as Code (Checkly)</li>

            <li>🤖 SEO optimization (metadata, JSON-LD, Open Graph tags)</li>
            <li>⚙️ Development tools (VSCode config, bundler analyzer, changelog generation)</li>
          </ul>
          <p className="text-base">
            Our sponsors&apos; exceptional support has made this project possible. Their services
            integrate seamlessly with the boilerplate, and we recommend trying them out.
          </p>
        </CardContent>
        <CardContent className="p-4">
          <p>This is the home page. All content is now static.</p>
          <div className="mt-2 text-center text-sm">
            Translation powered by{' '}
            <a
              className="text-blue-700 hover:border-b-2 hover:border-blue-700"
              href="https://l.crowdin.com/next-js"
            >
              Crowdin
            </a>
          </div>
          <h2 className="mt-5 text-2xl font-bold">
            Boilerplate Code for Your Next.js Project with Tailwind CSS
          </h2>
          <p className="text-base">
            Next.js Boilerplate is a developer-friendly starter code for Next.js projects, built
            with Tailwind CSS and TypeScript.{' '}
            <span role="img" aria-label="zap">
              ⚡️
            </span>{' '}
            Designed with developer experience in mind, it includes:
          </p>
          <ul className="mt-3 text-base">
            <li>🚀 Next.js with App Router support</li>
            <li>🔥 TypeScript for type checking</li>
            <li>💎 Tailwind CSS integration</li>
            <li>
              🔒 Authentication with{' '}
              <a
                className="font-bold text-blue-700 hover:border-b-2 hover:border-blue-700"
                href="https://clerk.com?utm_source=github&amp;utm_medium=sponsorship&amp;utm_campaign=nextjs-boilerplate"
              >
                Clerk
              </a>{' '}
              (includes passwordless, social, and multi-factor auth)
            </li>
            <li>📦 ORM with DrizzleORM (PostgreSQL, SQLite, MySQL support)</li>
            <li>
              🌐 Multi-language support (i18n) with next-intl and{' '}
              <a
                className="font-bold text-blue-700 hover:border-b-2 hover:border-blue-700"
                href="https://l.crowdin.com/next-js"
              >
                Crowdin
              </a>
            </li>
            <li>🔴 Form handling (React Hook Form) and validation (Zod)</li>
            <li>📏 Linting and formatting (ESLint, Prettier)</li>
            <li>🦊 Git hooks and commit linting (Husky, Commitlint)</li>
            <li>🦺 Testing suite (Vitest, React Testing Library, Playwright)</li>
            <li>🎉 Storybook for UI development</li>
            <li>
              🐰 AI-powered code reviews with{' '}
              <a
                className="font-bold text-blue-700 hover:border-b-2 hover:border-blue-700"
                href="https://www.coderabbit.ai?utm_source=next_js_starter&utm_medium=github&utm_campaign=next_js_starter_oss_2025"
              >
                CodeRabbit
              </a>
            </li>

            <li>🖥️ Monitoring as Code (Checkly)</li>

            <li>🤖 SEO optimization (metadata, JSON-LD, Open Graph tags)</li>
            <li>⚙️ Development tools (VSCode config, bundler analyzer, changelog generation)</li>
          </ul>
          <p className="text-base">
            Our sponsors&apos; exceptional support has made this project possible. Their services
            integrate seamlessly with the boilerplate, and we recommend trying them out.
          </p>
        </CardContent>
        <CardContent className="p-4">
          <p>This is the home page. All content is now static.</p>
          <div className="mt-2 text-center text-sm">
            Translation powered by{' '}
            <a
              className="text-blue-700 hover:border-b-2 hover:border-blue-700"
              href="https://l.crowdin.com/next-js"
            >
              Crowdin
            </a>
          </div>
          <h2 className="mt-5 text-2xl font-bold">
            Boilerplate Code for Your Next.js Project with Tailwind CSS
          </h2>
          <p className="text-base">
            Next.js Boilerplate is a developer-friendly starter code for Next.js projects, built
            with Tailwind CSS and TypeScript.{' '}
            <span role="img" aria-label="zap">
              ⚡️
            </span>{' '}
            Designed with developer experience in mind, it includes:
          </p>
          <ul className="mt-3 text-base">
            <li>🚀 Next.js with App Router support</li>
            <li>🔥 TypeScript for type checking</li>
            <li>💎 Tailwind CSS integration</li>
            <li>
              🔒 Authentication with{' '}
              <a
                className="font-bold text-blue-700 hover:border-b-2 hover:border-blue-700"
                href="https://clerk.com?utm_source=github&amp;utm_medium=sponsorship&amp;utm_campaign=nextjs-boilerplate"
              >
                Clerk
              </a>{' '}
              (includes passwordless, social, and multi-factor auth)
            </li>
            <li>📦 ORM with DrizzleORM (PostgreSQL, SQLite, MySQL support)</li>
            <li>
              🌐 Multi-language support (i18n) with next-intl and{' '}
              <a
                className="font-bold text-blue-700 hover:border-b-2 hover:border-blue-700"
                href="https://l.crowdin.com/next-js"
              >
                Crowdin
              </a>
            </li>
            <li>🔴 Form handling (React Hook Form) and validation (Zod)</li>
            <li>📏 Linting and formatting (ESLint, Prettier)</li>
            <li>🦊 Git hooks and commit linting (Husky, Commitlint)</li>
            <li>🦺 Testing suite (Vitest, React Testing Library, Playwright)</li>
            <li>🎉 Storybook for UI development</li>
            <li>
              🐰 AI-powered code reviews with{' '}
              <a
                className="font-bold text-blue-700 hover:border-b-2 hover:border-blue-700"
                href="https://www.coderabbit.ai?utm_source=next_js_starter&utm_medium=github&utm_campaign=next_js_starter_oss_2025"
              >
                CodeRabbit
              </a>
            </li>

            <li>🖥️ Monitoring as Code (Checkly)</li>

            <li>🤖 SEO optimization (metadata, JSON-LD, Open Graph tags)</li>
            <li>⚙️ Development tools (VSCode config, bundler analyzer, changelog generation)</li>
          </ul>
          <p className="text-base">
            Our sponsors&apos; exceptional support has made this project possible. Their services
            integrate seamlessly with the boilerplate, and we recommend trying them out.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
