import { useCallback, useState } from 'react';
import { Period } from '../../sales-payment/types';

export interface ProfitLossFiltersState {
  search: string;
  selectedPeriod: Period;
  page: number;
  pageSize: number;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
}

const defaultPeriod: Period = {
  type: 'daily',
  value: {
    from: new Date(2025, 0, 15), // January 15, 2025
    to: new Date(2025, 0, 21), // January 21, 2025
  },
};

const initialFilters: ProfitLossFiltersState = {
  search: '',
  selectedPeriod: defaultPeriod,
  page: 0,
  pageSize: 10,
  sortBy: 'tanggal',
  sortDirection: 'desc',
};

export function useProfitLossFilters() {
  const [filters, setFilters] = useState<ProfitLossFiltersState>(initialFilters);

  // Helper to reset page when filtering
  const updateWithPageReset = useCallback((updates: Partial<ProfitLossFiltersState>) => {
    setFilters((prev) => ({ ...prev, ...updates, page: 0 }));
  }, []);

  const updateSearch = useCallback(
    (search: string) => {
      updateWithPageReset({ search });
    },
    [updateWithPageReset]
  );

  const updateSelectedPeriod = useCallback(
    (selectedPeriod: Period) => {
      updateWithPageReset({ selectedPeriod });
    },
    [updateWithPageReset]
  );

  const updatePage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const updatePageSize = useCallback(
    (pageSize: number) => {
      updateWithPageReset({ pageSize });
    },
    [updateWithPageReset]
  );

  const updateSorting = useCallback(
    (sortBy: string, sortDirection: 'asc' | 'desc') => {
      updateWithPageReset({ sortBy, sortDirection });
    },
    [updateWithPageReset]
  );

  // Toggle sort helper
  const toggleSort = useCallback(
    (columnId: string) => {
      const newDirection =
        filters.sortBy === columnId && filters.sortDirection === 'asc' ? 'desc' : 'asc';
      updateWithPageReset({ sortBy: columnId, sortDirection: newDirection });
    },
    [filters.sortBy, filters.sortDirection, updateWithPageReset]
  );

  // Reset all filters
  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  return {
    filters,
    updateSearch,
    updateSelectedPeriod,
    updatePage,
    updatePageSize,
    updateSorting,
    toggleSort,
    resetFilters,
    setFilters,
  };
}
