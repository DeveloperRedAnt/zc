import { parseAsInteger, parseAsJson, parseAsString, useQueryStates } from 'nuqs';
import { Period, PeriodType } from '../../sales-payment/types';

// Serialized Period for URL storage
interface SerializedPeriod {
  type: PeriodType;
  value: unknown;
}

export interface VoidReportFiltersState {
  search: string;
  responsiblePerson: string;
  cashier: string;
  selectedPeriod: Period;
  page: number;
  pageSize: number;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
}

const defaultPeriod: Period = {
  type: 'daily',
  value: {
    from: new Date(2025, 6, 17),
    to: new Date(2025, 6, 19),
  },
};

// Serialize Period for URL
const serializePeriod = (period: Period): SerializedPeriod => ({
  type: period.type,
  value:
    period.value && typeof period.value === 'object' && 'from' in period.value
      ? {
          ...period.value,
          from:
            period.value.from instanceof Date ? period.value.from.toISOString() : period.value.from,
          to: period.value.to instanceof Date ? period.value.to.toISOString() : period.value.to,
        }
      : period.value,
});

// Deserialize Period from URL
const deserializePeriod = (value: unknown): Period => {
  if (!value || typeof value !== 'object') return defaultPeriod;

  const serialized = value as SerializedPeriod;
  if (!serialized.type) return defaultPeriod;

  // Handle date-based periods
  if (['daily', 'weekly', 'monthly'].includes(serialized.type)) {
    if (serialized.value && typeof serialized.value === 'object' && 'from' in serialized.value) {
      const dateRange = serialized.value as Record<string, unknown>;
      return {
        type: serialized.type,
        value: {
          from:
            typeof dateRange.from === 'string'
              ? new Date(dateRange.from)
              : (dateRange.from as Date),
          to: typeof dateRange.to === 'string' ? new Date(dateRange.to) : (dateRange.to as Date),
        },
      };
    }
  }

  // Return as-is for quarterly/yearly
  return { type: serialized.type, value: serialized.value } as Period;
};

export function useVoidReportFilters() {
  const [filters, setFilters] = useQueryStates({
    search: parseAsString.withDefault(''),
    responsiblePerson: parseAsString.withDefault('all-responsible'),
    cashier: parseAsString.withDefault('all-cashier'),
    selectedPeriod: parseAsJson(deserializePeriod).withDefault(defaultPeriod),
    page: parseAsInteger.withDefault(0),
    pageSize: parseAsInteger.withDefault(10),
    sortBy: parseAsString.withDefault(''),
    sortDirection: parseAsString.withDefault('asc'),
  });

  // Helper to reset page when filtering
  const updateWithPageReset = (updates: Partial<typeof filters>) => {
    setFilters({ ...updates, page: 0 });
  };

  return {
    filters,
    updateSearch: (search: string) => updateWithPageReset({ search }),
    updateResponsiblePerson: (responsiblePerson: string) =>
      updateWithPageReset({ responsiblePerson }),
    updateCashier: (cashier: string) => updateWithPageReset({ cashier }),
    updateSelectedPeriod: (selectedPeriod: Period) =>
      updateWithPageReset({ selectedPeriod: serializePeriod(selectedPeriod) as Period }),
    updatePage: (page: number) => setFilters({ page }),
    updatePageSize: (pageSize: number) => updateWithPageReset({ pageSize }),
    updateSorting: (sortBy: string, sortDirection: 'asc' | 'desc') =>
      updateWithPageReset({ sortBy, sortDirection }),

    // Toggle sort helper
    toggleSort: (columnId: string) => {
      const newDirection =
        filters.sortBy === columnId && filters.sortDirection === 'asc' ? 'desc' : 'asc';
      updateWithPageReset({ sortBy: columnId, sortDirection: newDirection });
    },

    // Reset all filters
    resetFilters: () =>
      setFilters({
        search: '',
        responsiblePerson: 'all-responsible',
        cashier: 'all-cashier',
        selectedPeriod: serializePeriod(defaultPeriod) as Period,
        page: 0,
        pageSize: 10,
        sortBy: '',
        sortDirection: 'asc',
      }),

    setFilters,
  };
}
