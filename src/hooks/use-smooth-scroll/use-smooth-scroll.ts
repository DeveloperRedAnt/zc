'use client';

import { useCallback } from 'react';

type ScrollOptions = {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
  offset?: number; // Optional offset from the top
};

export function useSmoothScroll() {
  const scrollToElement = useCallback(
    (target: string | HTMLElement, options: ScrollOptions = {}) => {
      // Skip during server-side rendering
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }

      const { behavior = 'smooth', block = 'start', inline = 'nearest', offset = 0 } = options;

      // Get the element (if string is passed, assume it's an ID)
      const element = typeof target === 'string' ? document.getElementById(target) : target;

      if (!element) {
        console.warn(`Target element ${typeof target === 'string' ? target : ''} not found`);
        return;
      }

      // If offset is provided, calculate the scroll position manually
      if (offset) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior,
        });
      } else {
        // Use scrollIntoView if no offset is needed
        element.scrollIntoView({
          behavior,
          block,
          inline,
        });
      }
    },
    []
  );

  return { scrollToElement };
}
