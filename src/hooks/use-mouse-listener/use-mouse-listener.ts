import { useEffect } from 'react';

export function useMouseListener(callback: (mouse: 'up' | 'down') => void) {
  useEffect(() => {
    // Skip during server-side rendering
    if (typeof document === 'undefined') {
      return;
    }

    const onMouseDown = () => callback('down');
    const onMouseUp = () => callback('up');

    // Add event listeners
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [callback]);
}
