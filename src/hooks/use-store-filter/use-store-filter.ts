'use client';

import type { OptionType } from '@/components/dropdown/dropdown';
import { create } from 'zustand';

type StoreFilterState = {
  selectedStore: OptionType | null;
  setSelectedStore: (store: OptionType | null) => void;
};

export const useStoreFilter = create<StoreFilterState>((set) => ({
  selectedStore: null,
  setSelectedStore: (store) => set({ selectedStore: store }),
}));
