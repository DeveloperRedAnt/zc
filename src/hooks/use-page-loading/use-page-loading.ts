import { useCallback, useEffect, useState } from 'react';

interface UsePageLoadingOptions {
  initialDelay?: number;
  autoStart?: boolean;
  externalLoading?: boolean;
}

export function usePageLoading(options: UsePageLoadingOptions = {}) {
  const { initialDelay = 1000, autoStart = true, externalLoading } = options;
  const [internalLoading, setInternalLoading] = useState(autoStart);

  const isLoading = externalLoading !== undefined ? externalLoading : internalLoading;

  useEffect(() => {
    if (externalLoading === undefined && autoStart && initialDelay > 0) {
      const timer = setTimeout(() => {
        setInternalLoading(false);
      }, initialDelay);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [initialDelay, autoStart, externalLoading]);

  const startLoading = useCallback(() => {
    setInternalLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setInternalLoading(false);
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setInternalLoading(loading);
  }, []);

  return {
    isLoading,
    startLoading,
    stopLoading,
    setLoading,
  };
}
