import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useMouseListener } from './use-mouse-listener';

describe('useMouseListener', () => {
  it('should mount and unmount event listeners', () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() => useMouseListener(callback));
    unmount();

    expect(callback).not.toHaveBeenCalled();
  });
});
