import { renderHook } from '@testing-library/react';
import { useSmoothScroll } from './use-smooth-scroll';

describe('useSmoothScroll', () => {
  it('should return a scrollToElement function', () => {
    const { result } = renderHook(() => useSmoothScroll());

    expect(typeof result.current.scrollToElement).toBe('function');
  });
});
