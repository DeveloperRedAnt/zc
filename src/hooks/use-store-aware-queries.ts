'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Optimized hook for basic store awareness
 * Uses memoized event handlers to prevent unnecessary rerenders
 */
export function useStoreId() {
  const [currentStoreId, setCurrentStoreId] = useState(() => {
    // Initialize with localStorage value if available
    if (typeof window !== 'undefined') {
      return localStorage.getItem('x-store-id') || '1';
    }
    return '1';
  });

  // Memoized update function to prevent recreation on every render
  const updateStoreId = useCallback(() => {
    const storeId = localStorage.getItem('x-store-id') || '1';
    setCurrentStoreId((prev) => {
      // Only update if the value actually changed
      return prev !== storeId ? storeId : prev;
    });
  }, []);

  // Effect to update store ID from localStorage when it changes
  useEffect(() => {
    // Listen for storage changes (when localStorage is updated in other tabs/components)
    window.addEventListener('storage', updateStoreId);

    // Custom event listener for localStorage changes in the same tab
    window.addEventListener('storeIdChanged', updateStoreId);

    return () => {
      window.removeEventListener('storage', updateStoreId);
      window.removeEventListener('storeIdChanged', updateStoreId);
    };
  }, [updateStoreId]);

  return currentStoreId;
}
