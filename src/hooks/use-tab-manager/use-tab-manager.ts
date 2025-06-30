import { useEffect, useState } from 'react';

type TabMessage = {
  message: string;
  timestamp: number;
};

const useTabManager = () => {
  // Default state values
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  // Generate tabId only on the client side
  const [tabId] = useState<string>(() => {
    // Return a fixed value during SSR to avoid hydration mismatch
    if (typeof window === 'undefined') {
      return 'SERVER_TAB_ID';
    }
    // Generate random ID only on the client
    return Math.random().toString(36).substring(2, 15);
  });

  useEffect(() => {
    // Skip the effect during server-side rendering
    if (typeof window === 'undefined') {
      return;
    }

    // Skip for the placeholder server ID
    if (tabId === 'SERVER_TAB_ID') {
      return;
    }

    // Create a ref to track if component is mounted
    const isMounted = { current: true };

    // Initialize this tab
    localStorage.setItem('currentTabId', tabId);

    const checkDuplicates = () => {
      // Only update state if component is still mounted
      if (isMounted.current) {
        const currentTabId = localStorage.getItem('currentTabId');
        setIsDuplicate(currentTabId !== tabId);
      }
    };

    // Use setTimeout for initial check to avoid direct setState in useEffect
    const initialCheckTimer = setTimeout(checkDuplicates, 0);

    const handleStorageChange = (e: StorageEvent) => {
      // Handle tab ID changes
      if (e.key === 'currentTabId') {
        checkDuplicates();
      }
      // Handle messages
      if (e.key === 'tabMessage') {
        try {
          const data: TabMessage = JSON.parse(e.newValue || '{}');
          setMessage(data.message);
        } catch (err) {
          console.error('Error parsing tab message:', err);
        }
      }
    };

    // Initial check
    checkDuplicates();

    // Set up event listeners
    window.addEventListener('storage', handleStorageChange);

    // Regular check for duplicate tabs
    const interval = setInterval(checkDuplicates, 1000);

    // Cleanup
    return () => {
      isMounted.current = false;
      if (localStorage.getItem('currentTabId') === tabId) {
        localStorage.removeItem('currentTabId');
      }
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
      clearTimeout(initialCheckTimer);
    };
  }, [tabId]);

  const broadcastMessage = (message: string) => {
    // Skip during server-side rendering
    if (typeof window === 'undefined') {
      return;
    }

    localStorage.setItem(
      'tabMessage',
      JSON.stringify({
        message,
        timestamp: Date.now(),
      } as TabMessage)
    );
  };

  return {
    isDuplicate,
    message,
    broadcastMessage,
    tabId,
  };
};

export default useTabManager;
