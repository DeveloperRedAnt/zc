'use client';

import React, { useEffect, useState, ReactNode } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
}

/**
 * ClientOnly component that only renders its children on the client-side
 * This helps avoid hydration errors caused by client-specific attributes or behavior
 */
export default function ClientOnly({ children }: ClientOnlyProps): React.ReactElement {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return <>{children}</>;
}
