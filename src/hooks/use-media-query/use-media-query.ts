import * as React from 'react';

export function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(false);

  React.useEffect(() => {
    // Return early if not in browser environment to prevent hydration issues
    if (typeof window === 'undefined' || typeof matchMedia === 'undefined') {
      return;
    }

    // Create a ref to track component mounted state
    const isMounted = { current: true };
    function onChange(event: MediaQueryListEvent) {
      // Only update state if component is still mounted
      if (isMounted.current) {
        setValue(event.matches);
      }
    }

    const result = window.matchMedia(query);
    result.addEventListener('change', onChange);
    // Use setTimeout to avoid direct setState in useEffect
    const initialCheckTimer = setTimeout(() => {
      if (isMounted.current) {
        setValue(result.matches);
      }
    }, 0);

    return () => {
      isMounted.current = false;
      clearTimeout(initialCheckTimer);
      result.removeEventListener('change', onChange);
    };
  }, [query]);

  return value;
}
