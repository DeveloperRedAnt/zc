'use client';

import { Button } from '../../button/button';

export const ErrorState = ({ error }: { error: Error }) => (
  <div className="flex grow flex-col items-center justify-center space-y-4 p-16">
    <h2 className="text-xl">Something went wrong!</h2>

    <Button
      onClick={() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
      }}
    >
      <span>Go back to Home</span>
    </Button>

    <p className="pt-24 text-gray-400" />

    <pre className="text-sm whitespace-break-spaces text-gray-400">
      Error digest: {'digest' in error ? <>{error.digest as React.ReactNode}</> : 'oh oh'}
    </pre>
  </div>
);
