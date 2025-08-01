// Mock localStorage if not available
if (typeof localStorage === 'undefined') {
  global.localStorage = (() => {
    let store: Record<string, string> = {};
    return {
      getItem(key: string) {
        return store[key] ?? null;
      },
      setItem(key: string, value: string) {
        store[key] = value;
      },
      removeItem(key: string) {
        delete store[key];
      },
      clear() {
        store = {};
      },
      key(index: number) {
        return Object.keys(store)[index] ?? null;
      },
      get length() {
        return Object.keys(store).length;
      },
    };
  })();
}

import { useOrganizationStore } from '../../src/store/organization-store';

describe('useOrganizationStore', () => {
  const orgA = { id: 1, name: 'Org A', flex: 'dashboard' };
  const orgB = { id: 2, name: 'Org B', flex: 'settings' };

  beforeEach(() => {
    useOrganizationStore.getState().clearOrganization();
    localStorage.clear();
  });

  it('should set organization', () => {
    useOrganizationStore.getState().setOrganization(orgA);
    expect(useOrganizationStore.getState().organization).toEqual(orgA);
  });

  it('should clear organization', () => {
    useOrganizationStore.getState().setOrganization(orgA);
    useOrganizationStore.getState().clearOrganization();
    expect(useOrganizationStore.getState().organization).toBeNull();
  });

  it('should persist organization to localStorage', () => {
    useOrganizationStore.getState().setOrganization(orgB);
    const stored = JSON.parse(localStorage.getItem('mock_organization') ?? '{}');
    expect(stored.state.organization).toEqual(orgB);
  });
});
