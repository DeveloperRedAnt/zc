import { parseAsInteger, parseAsJson, parseAsString, useQueryStates } from 'nuqs';
import type { Period, PeriodType } from '../types/sales-type-sales';

type SerializedPeriod = {
  type: PeriodType;
  value: unknown;
};
const defaultPeriod: Period = {
  type: 'daily',
  value: {
    from: new Date(2025, 6, 17),
    to: new Date(2025, 6, 19),
  },
};

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
export function useSalesDetailFilters() {
  const [filters, setFilters] = useQueryStates({
    responsiblePerson: parseAsString.withDefault('all-responsible'),
    cashier: parseAsString.withDefault('all-cashier'),
    selectedPeriod: parseAsJson(deserializePeriod).withDefault(defaultPeriod),
    page: parseAsInteger.withDefault(0),
    pageSize: parseAsInteger.withDefault(10),
    sortBy: parseAsString.withDefault(''),
    sortDirection: parseAsString.withDefault('asc'),
  });

  const updateWithPageReset = (updates: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...updates, page: 0 }));
  };

  return {
    filters,
    updateSelectedPeriod: (selectedPeriod: Period) =>
      updateWithPageReset({ selectedPeriod: serializePeriod(selectedPeriod) as Period }),
    resetFilters: () => {
      setFilters({
        responsiblePerson: 'all-responsible',
        cashier: 'all-cashier',
        selectedPeriod: serializePeriod(defaultPeriod) as Period,
        page: 1,
        pageSize: 10,
        sortBy: 'name_cashier',
        sortDirection: 'asc',
      });
    },
    updateCashier: (cashier: string) => updateWithPageReset({ cashier }),
    updateResponsiblePerson: (responsiblePerson: string) =>
      updateWithPageReset({ responsiblePerson }),
  };
}
