import { renderHook } from '@testing-library/react';
import useTabManager from './use-tab-manager';

describe('useTabManager', () => {
  it('should return tab manager state and functions', () => {
    const { result } = renderHook(() => useTabManager());

    expect(typeof result.current).toBe('object');
    expect(result.current).toHaveProperty('isDuplicate');
    expect(result.current).toHaveProperty('message');
    expect(result.current).toHaveProperty('broadcastMessage');
    expect(result.current).toHaveProperty('tabId');
  });
});
