// Tremor Raw useOnWindowResize [v0.0.0]

import * as React from 'react';

export const useOnWindowResize = (handler: { (): void }) => {
  React.useEffect(() => {
    // Skip during server-side rendering
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => {
      handler();
    };

    // Initial call
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [handler]);
};
