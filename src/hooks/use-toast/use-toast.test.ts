import { act, renderHook } from '@testing-library/react';
import { toast, useToast } from './use-toast';

describe('useToast', () => {
  it('should provide toast and dismiss functions', () => {
    const { result } = renderHook(() => useToast());

    expect(typeof result.current.toast).toBe('function');
    expect(typeof result.current.dismiss).toBe('function');
  });

  it('should add a toast', () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      toast({ title: 'Test' });
    });

    expect(result.current.toasts.length).toBeGreaterThan(0);
  });
});
