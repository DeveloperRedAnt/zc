import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

export interface VoidReportFiltersState {
  responsiblePerson: string;
  cashier_id: string;
  store_id: string;
  page: number;
  pageSize: number;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
}

export function useVoidReportFilters() {
  const [filters, setFilters] = useQueryStates({
    cashier_id: parseAsString.withDefault(''),
    store_id: parseAsString.withDefault(''),
    start_date: parseAsString.withDefault(''),
    end_date: parseAsString.withDefault(''),
    page: parseAsInteger.withDefault(0),
    pageSize: parseAsInteger.withDefault(10),
    sortBy: parseAsString.withDefault(''),
    sortDirection: parseAsString.withDefault('asc'),
  });

  const updateWithPageReset = (updates: Partial<typeof filters>) => {
    setFilters({
      ...updates,
      page: 0,
    });
  };

  return {
    filters,
    updateCashier: (cashier_id: string) => updateWithPageReset({ cashier_id }),
    updateToko: (store_id: string) => updateWithPageReset({ store_id }),
    updateStartDate: (start_date: string) => updateWithPageReset({ start_date }),
    updateEndDate: (end_date: string) => updateWithPageReset({ end_date }),
    updatePage: (page: number) => setFilters({ page }),
    updatePageSize: (pageSize: number) => updateWithPageReset({ pageSize }),
    updateSorting: (sortBy: string, sortDirection: 'asc' | 'desc') => {
      setFilters({
        ...filters,
        sortBy,
        sortDirection,
        page: 0,
      });
    },
    toggleSort: (columnId: string) => {
      const newDirection =
        filters.sortBy === columnId && filters.sortDirection === 'asc' ? 'desc' : 'asc';
      updateWithPageReset({ sortBy: columnId, sortDirection: newDirection });
    },

    // Reset all filters
    resetFilters: () =>
      setFilters({
        cashier_id: '',
        store_id: '',
        start_date: '',
        end_date: '',
        page: 0,
        pageSize: 10,
        sortBy: '',
        sortDirection: 'asc',
      }),
    setFilters,
  };
}
