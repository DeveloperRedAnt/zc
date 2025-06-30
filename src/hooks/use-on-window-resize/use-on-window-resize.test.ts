import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useOnWindowResize } from './use-on-window-resize';

describe('useOnWindowResize', () => {
  it('should call handler once on mount and not after unmount', () => {
    const handler = vi.fn();
    const { unmount } = renderHook(() => useOnWindowResize(handler));

    expect(handler).toHaveBeenCalledTimes(1); // Called once on mount

    handler.mockClear();
    unmount();

    expect(handler).not.toHaveBeenCalled(); // Not called on unmount
  });
});
