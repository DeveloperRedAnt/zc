import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { useMemo } from 'react';
import type { Period } from '../types/sales-product.types';

const formatDateLocal = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export function useSalesProductFilters() {
  // Memoize current month range agar konsisten
  const currentMonthRange = useMemo(() => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return {
      start: formatDateLocal(startOfMonth),
      end: formatDateLocal(endOfMonth),
    };
  }, []); // Empty deps array agar hanya dihitung sekali

  const [filters, setFilters] = useQueryStates({
    product_id: parseAsString.withDefault(''),
    store_id: parseAsString.withDefault(''),
    start_date: parseAsString.withDefault(currentMonthRange.start),
    end_date: parseAsString.withDefault(currentMonthRange.end),
    period: parseAsString.withDefault(''),
    page: parseAsInteger.withDefault(0),
    per_page: parseAsInteger.withDefault(10),
    sort_column: parseAsString.withDefault(''),
    sort_direction: parseAsString.withDefault('asc'),
  });

  // Default period untuk date range picker
  const defaultPeriod: Period = useMemo(
    () => ({
      type: 'monthly',
      value: {
        from: new Date(filters.start_date),
        to: new Date(filters.end_date),
      },
    }),
    [filters.start_date, filters.end_date]
  );

  const updateWithPageReset = (updates: Partial<typeof filters>) => {
    setFilters({
      ...updates,
      page: 0,
    });
  };

  // Helper function untuk set monthly range
  const setMonthlyRange = (year: number, month: number) => {
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);

    updateWithPageReset({
      start_date: formatDateLocal(startOfMonth),
      end_date: formatDateLocal(endOfMonth),
    });
  };

  return {
    filters: {
      ...filters,
      selectedPeriod: defaultPeriod,
    },
    updateProduct: (product_id: string) => updateWithPageReset({ product_id }),
    updateStore: (store_id: string) => updateWithPageReset({ store_id }),
    updateStartDate: (start_date: string) => updateWithPageReset({ start_date }),
    updateEndDate: (end_date: string) => updateWithPageReset({ end_date }),
    updatePeriod: (period: string) => updateWithPageReset({ period }),
    updatePagination: (page: number, per_page: number) => setFilters({ page, per_page }),
    updateSorting: (sort_column: string, sort_direction: 'asc' | 'desc') => {
      setFilters({
        ...filters,
        sort_column,
        sort_direction,
        page: 0,
      });
    },
    toggleSort: (columnId: string) => {
      const newDirection =
        filters.sort_column === columnId && filters.sort_direction === 'asc' ? 'desc' : 'asc';
      updateWithPageReset({ sort_column: columnId, sort_direction: newDirection });
    },

    // Reset all filters - gunakan memoized value
    resetFilters: () => {
      setFilters({
        product_id: '',
        store_id: '',
        start_date: currentMonthRange.start,
        end_date: currentMonthRange.end,
        page: 0,
        per_page: 10,
        sort_column: '',
        sort_direction: 'asc',
        period: '',
      });
    },

    // Helper untuk set bulan tertentu
    setMonthlyRange,

    // Helper untuk set current month
    setCurrentMonth: () => {
      updateWithPageReset({
        start_date: currentMonthRange.start,
        end_date: currentMonthRange.end,
      });
    },

    setFilters,
  };
}
