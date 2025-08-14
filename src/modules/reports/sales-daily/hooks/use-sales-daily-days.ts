import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

export function useSalesDailyDays() {
  const [filters, setFilters] = useQueryStates({
    store_id: parseAsString.withDefault(''),
    grouping: parseAsString.withDefault('weekly'),
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

    resetFilters: () => {
      setFilters({
        grouping: 'weekly',
        store_id: '',
        start_date: '',
        end_date: '',
        page: 0,
        pageSize: 10,
        sortBy: '',
        sortDirection: 'asc',
      });
    },
    setFilters,
  };
}
