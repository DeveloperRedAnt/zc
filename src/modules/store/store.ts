import { create } from 'zustand';

type SortDirection = 'asc' | 'desc';

type FilterStore = {
  perPage: number;
  search: string;
  sortBy: string;
  sortDirection: SortDirection;
  currentPage: number;
  setSearch: (value: string) => void;
  setSort: (field: string, direction: SortDirection) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  perPage: 10,
  search: '',
  sortBy: 'name',
  sortDirection: 'asc',
  currentPage: 1,
  setSearch: (search) =>
    set(() => ({
      search,
      currentPage: 1, // reset ke halaman pertama saat search berubah
    })),
  setSort: (sortBy, sortDirection) => set({ sortBy, sortDirection }),
  setPage: (currentPage) => set({ currentPage }),
  resetFilters: () =>
    set({
      search: '',
      sortBy: 'name',
      sortDirection: 'asc',
      currentPage: 1,
    }),
}));
