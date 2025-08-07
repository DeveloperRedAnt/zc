'use client';

import React from 'react';

export default function AppFooter() {
  const version = process.env.NEXT_PUBLIC_APP_VERSION || '0.1.2';
  const commitHash = process.env.NEXT_PUBLIC_COMMIT_HASH || 'dev';

  return (
    <footer className="flex h-12 items-center justify-center px-4">
      <p className="text-xs text-muted-foreground opacity-50">
        version {version} at {commitHash}
      </p>
    </footer>
  );
}
