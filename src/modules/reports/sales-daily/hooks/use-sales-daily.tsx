import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

export const useSalesDetailFilters = () => {
  const [filters, setFilters] = useQueryStates({
    grouping: parseAsString.withDefault('weekly'),
    store_id: parseAsString.withDefault(''),
    start_date: parseAsString.withDefault(''),
    end_date: parseAsString.withDefault(''),
    page: parseAsInteger.withDefault(0),
    pageSize: parseAsInteger.withDefault(10),
    sortBy: parseAsString.withDefault(''),
    sortDirection: parseAsString.withDefault('asc'),
  });

  const updateWithPageReset = ({ ...updates }) => {
    setFilters({ ...updates, page: 0 });
  };

  return {
    filters,
    updateToko: (store_id) => updateWithPageReset({ store_id }),
    updateStartDate: (start_date) => updateWithPageReset({ start_date }),
    updateEndDate: (end_date) => updateWithPageReset({ end_date }),
    updatePage: (page) => setFilters({ page }),
    updatePageSize: (pageSize) => updateWithPageReset({ pageSize }),
    updateSorting: (sortBy, sortDirection) => {
      setFilters({ ...filters, sortBy, sortDirection, page: 0 });
    },
    updateGrouping: (grouping) => updateWithPageReset({ grouping }),

    toggleSort: (columnId) => {
      const newDirection =
        filters.sortBy === columnId && filters.sortDirection === 'asc' ? 'desc' : 'asc';
      updateWithPageReset({ sortBy: columnId, sortDirection: newDirection });
    },

    resetFilters: () => {
      setFilters({
        start_date: null,
        end_date: null,
        store_id: null,
        page: 1,
        pageSize: 10,
        sortBy: 'name_cashier',
        sortDirection: 'asc',
      });
    },
  };
};
