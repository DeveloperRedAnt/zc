import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useDebounce } from './use-debounce';

vi.useFakeTimers();

describe('useDebounce', () => {
  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'a', delay: 300 },
    });

    expect(result.current).toBe('a');

    rerender({ value: 'b', delay: 300 });

    expect(result.current).toBe('a');

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('b');
  });

  it('should use default delay if not provided', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 'x' },
    });
    rerender({ value: 'y' });
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('y');
  });
});
