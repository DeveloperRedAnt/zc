'use client';

import { Button } from '@/components/button/button';
import { useRouter } from 'next/navigation';

type NotFoundProps = {
  statusCode?: number;
  title?: string;
  description?: string;
};

const NotFound: React.FC<NotFoundProps> = ({ statusCode = 404, title = '', description = '' }) => {
  const router = useRouter();
  return (
    <div className="mx-auto flex h-screen max-w-lg flex-col items-center justify-center text-center">
      <h1 className="text-9xl font-bold">{statusCode}</h1>
      <h2 className="mt-4 text-2xl font-semibold">{title}</h2>
      <p className="mt-2">{description}</p>
      <Button variant="default" className="mt-4" onClick={() => router.push('/')}>
        Go Back Home
      </Button>
    </div>
  );
};

export default NotFound;
