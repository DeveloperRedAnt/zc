import { useCallback, useEffect, useState } from 'react';

export default function useScroll(threshold: number) {
  // Initialize with false to ensure consistent server/client rendering
  const [scrolled, setScrolled] = useState(false);

  const onScroll = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }
    setScrolled(window.scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    // Skip during server-side rendering
    if (typeof window === 'undefined') {
      return;
    }

    // Add event listener
    window.addEventListener('scroll', onScroll);

    // Initial check using setTimeout to avoid direct setState in useEffect
    const initialCheckTimer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        setScrolled(window.scrollY > threshold);
      }
    }, 0);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(initialCheckTimer);
    };
  }, [onScroll, threshold]);

  return scrolled;
}
