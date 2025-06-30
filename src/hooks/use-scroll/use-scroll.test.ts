import { act, renderHook } from '@testing-library/react';
import useScroll from './use-scroll';

describe('useScroll', () => {
  it('should return false initially and true after scroll', () => {
    window.scrollY = 0;
    const { result } = renderHook(() => useScroll(10));

    expect(result.current).toBe(false);

    window.scrollY = 20;
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });
});
