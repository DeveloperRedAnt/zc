import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

export interface VoidReportFiltersState {
  start_date: string;
  end_date: string;
  nota_number: string;
  cashier_name: string;
  void_by: string;
  sort_dir: 'asc' | 'desc';
  page: number;
  per_page: number;
  sort_by: string;
}

export function useVoidReportFilters() {
  const [filters, setFilters] = useQueryStates({
    start_date: parseAsString.withDefault(''),
    end_date: parseAsString.withDefault(''),
    nota_number: parseAsString.withDefault(''),
    cashier_name: parseAsString.withDefault(''),
    void_by: parseAsString.withDefault(''),
    sort_dir: parseAsString.withDefault('asc'),
    page: parseAsInteger.withDefault(0),
    per_page: parseAsInteger.withDefault(10),
    sort_by: parseAsString.withDefault('transaction_date'),
  });

  const updateWithPageReset = (updates: Partial<typeof filters>) => {
    setFilters({ ...updates, page: 0 });
  };
  return {
    filters,
    updateNotaNumber: (nota_number: string) => updateWithPageReset({ nota_number }),
    updateStartDate: (start_date: string) => updateWithPageReset({ start_date }),
    updateEndDate: (end_date: string) => updateWithPageReset({ end_date }),
    updatePage: (page: number) => setFilters({ page }),
    updatePageSize: (per_page: number) => updateWithPageReset({ per_page }),
    updateVoidBy: (void_by: string) => updateWithPageReset({ void_by }),
    updateCashier: (cashier_name: string) => updateWithPageReset({ cashier_name }),
    updateSorting: (sort_by: string, sort_dir: 'asc' | 'desc') => {
      setFilters({
        ...filters,
        sort_by,
        sort_dir,
        page: 0,
      });
    },
    toggleSort: (columnId: string) => {
      const newDirection =
        filters.sort_by === columnId && filters.sort_dir === 'asc' ? 'desc' : 'asc';
      updateWithPageReset({ sort_by: columnId, sort_dir: newDirection });
    },

    resetFilters: () =>
      setFilters({
        start_date: '',
        end_date: '',
        nota_number: '',
        void_by: '',
        page: 0,
        cashier_name: '',
        per_page: 10,
        sort_by: 'transaction_date',
        sort_dir: 'asc',
      }),

    setFilters,
  };
}
