import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useIsMobile } from './use-mobile';

describe('useIsMobile', () => {
  it('should return a boolean indicating mobile state', () => {
    window.innerWidth = 500;
    window.matchMedia = vi.fn().mockImplementation((_query) => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    const { result } = renderHook(() => useIsMobile());

    expect(typeof result.current).toBe('boolean');
  });
});
