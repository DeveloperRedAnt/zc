import * as React from 'react';

const MOBILE_BREAKPOINT = 640;

export function useIsMobile() {
  // Set default state to false to avoid hydration mismatch
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Skip effect on the server
    if (typeof window === 'undefined') {
      return;
    }

    // Create a ref to track if component is mounted
    const isMounted = { current: true };

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);

    const onChange = () => {
      if (isMounted.current) {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      }
    };
    mql.addEventListener('change', onChange);

    // Use setTimeout for initial check to avoid direct setState in useEffect
    const initialCheckTimer = setTimeout(() => {
      if (isMounted.current) {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      }
    }, 0);

    // Cleanup
    return () => {
      isMounted.current = false;
      clearTimeout(initialCheckTimer);
      mql.removeEventListener('change', onChange);
    };
  }, []);

  return isMobile;
}
