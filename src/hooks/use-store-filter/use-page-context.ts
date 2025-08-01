'use client';

import { create } from 'zustand';

type PageContextState = {
  showStoreFilter: boolean;
  setShowStoreFilter: (show: boolean) => void;
};

export const usePageContext = create<PageContextState>((set) => ({
  showStoreFilter: false,
  setShowStoreFilter: (show) => set({ showStoreFilter: show }),
}));
