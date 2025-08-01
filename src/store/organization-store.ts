import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { OrganizationStore } from '../types/organization';

export const useOrganizationStore = create<OrganizationStore>()(
  persist(
    (set, get) => ({
      organization: null,
      setOrganization: (org) => set({ organization: org }),
      getOrganization: () => get().organization,
      clearOrganization: () => {
        set({ organization: null });
        try {
          window.localStorage.removeItem('mock_organization');
        } catch {}
      },
    }),
    {
      name: 'mock_organization',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
