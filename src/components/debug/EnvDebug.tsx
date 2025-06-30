'use client';

import { useEffect, useState } from 'react';

export default function EnvDebug() {
  const [envVars, setEnvVars] = useState<Record<string, string>>({});

  useEffect(() => {
    // Collect all NEXT_PUBLIC_ environment variables
    const publicEnvVars: Record<string, string> = {};

    // Loop through all env vars that start with NEXT_PUBLIC_
    for (const key of Object.keys(process.env)) {
      if (key.startsWith('NEXT_PUBLIC_')) {
        publicEnvVars[key] = process.env[key] as string;
      }
    }

    setEnvVars(publicEnvVars);
  }, []);

  return (
    <div className="p-4 bg-secondary/20 rounded-md my-4">
      <h2 className="font-semibold mb-2">Environment Variables Debug</h2>
      <div className="text-sm">
        <p>
          <strong>NEXT_PUBLIC_DISABLE_AUTH:</strong>{' '}
          {process.env.NEXT_PUBLIC_DISABLE_AUTH || 'Not set'}
        </p>
        <p className="mt-2">
          <strong>Auth Status:</strong>{' '}
          {process.env.NEXT_PUBLIC_DISABLE_AUTH === 'true' ? 'Disabled' : 'Enabled'}
        </p>

        <details className="mt-4">
          <summary className="cursor-pointer">All Public Env Variables</summary>
          <pre className="bg-background p-2 mt-2 rounded text-xs overflow-auto max-h-40">
            {JSON.stringify(envVars, null, 2)}
          </pre>
        </details>

        <p className="text-xs text-gray-500 mt-4">
          Note: This component only shows NEXT_PUBLIC_ variables for security reasons.
        </p>
      </div>
    </div>
  );
}
