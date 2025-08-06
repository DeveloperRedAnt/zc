'use client';

import type { StoreItem } from '@/__generated__/api/dto';
import { create } from 'zustand';

// Update OptionType to match the store filter component
export type StoreOptionType = {
  value: number;
  label: string;
  data: StoreItem;
};

export type PaginationState = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

type StoreFilterState = {
  selectedStore: StoreOptionType | null;
  loadedOptions: StoreOptionType[];
  paginationState: PaginationState | null;
  searchTerm: string;
  setSelectedStore: (store: StoreOptionType | null) => void;
  addLoadedOptions: (
    options: StoreOptionType[],
    pagination: PaginationState,
    search: string
  ) => void;
  clearLoadedOptions: () => void;
  setSearchTerm: (term: string) => void;
};

export const useStoreFilter = create<StoreFilterState>((set, get) => ({
  selectedStore: null,
  loadedOptions: [],
  paginationState: null,
  searchTerm: '',
  setSelectedStore: (store) => set({ selectedStore: store }),
  addLoadedOptions: (options, pagination, search) => {
    const currentState = get();

    // If it's a new search, replace options; otherwise append
    if (search !== currentState.searchTerm || pagination.current_page === 1) {
      set({
        loadedOptions: options,
        paginationState: pagination,
        searchTerm: search,
      });
    } else {
      set({
        loadedOptions: [...currentState.loadedOptions, ...options],
        paginationState: pagination,
        searchTerm: search,
      });
    }
  },
  clearLoadedOptions: () =>
    set({
      loadedOptions: [],
      paginationState: null,
      searchTerm: '',
    }),
  setSearchTerm: (term) => {
    const currentState = get();
    if (term !== currentState.searchTerm) {
      set({ searchTerm: term, loadedOptions: [], paginationState: null });
    }
  },
}));
