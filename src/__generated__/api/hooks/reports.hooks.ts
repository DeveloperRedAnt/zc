import { useDebounce } from '@/hooks/use-debounce/use-debounce';
import { Period } from '@/modules/reports/sales-payment/types';
import { useQuery } from '@tanstack/react-query';
import { getProfitLossReports, getVoidReports } from '../client/reports';
import { ProfitLossReportRequest, VoidReportRequest } from '../dto/reports.dto';

interface VoidReportFilters {
  search: string;
  responsiblePerson: string;
  cashier: string;
  selectedPeriod: Period;
  page: number;
  pageSize: number;
  sortBy: string;
  sortDirection: string;
}

const convertPeriodToDateRange = (period: Period): { dateFrom?: string; dateTo?: string } => {
  if (!period?.value) return {};

  const { from, to } = period.value;

  const formatDate = (d: unknown) => (d instanceof Date ? d.toISOString().slice(0, 10) : typeof d === 'string' ? d : undefined);

  return { dateFrom: formatDate(from), dateTo: formatDate(to) };
};

const buildQueryParams = (filters: VoidReportFilters, debouncedSearch: string): VoidReportRequest => ({
  search: debouncedSearch || undefined,
  responsiblePerson: filters.responsiblePerson !== 'all-responsible' ? filters.responsiblePerson : undefined,
  cashier: filters.cashier !== 'all-cashier' ? filters.cashier : undefined,
  sortBy: filters.sortBy || undefined,
  sortDirection: ['asc', 'desc'].includes(filters.sortDirection) ? (filters.sortDirection as 'asc' | 'desc') : undefined,
  page: filters.page,
  pageSize: filters.pageSize,
  ...convertPeriodToDateRange(filters.selectedPeriod),
});

export function useVoidReportQuery(deviceId: string, storeId: string, filters: VoidReportFilters) {
  const debouncedSearch = useDebounce(filters.search, 300);
  const queryParams = buildQueryParams(filters, debouncedSearch);
  
  return useQuery({
    queryKey: ['void-reports', deviceId, storeId, queryParams],
    queryFn: () =>
      getVoidReports({
        'x-device-id': deviceId,
        'x-store-id': storeId,
        query: queryParams,
    }),
    enabled: Boolean(deviceId && storeId),
    refetchOnWindowFocus: false,
    staleTime: 300_000,
    retry: 1,
    retryDelay: 1000,
  });
}

interface ProfitLossReportFilters {
  search: string;
  selectedPeriod: Period;
  page: number;
  pageSize: number;
  sortBy: string;
  sortDirection: string;
}

const buildProfitLossQueryParams = (filters: ProfitLossReportFilters, debouncedSearch: string): ProfitLossReportRequest => ({
  search: debouncedSearch || undefined,
  sortBy: filters.sortBy || undefined,
  sortDirection: ['asc', 'desc'].includes(filters.sortDirection) ? (filters.sortDirection as 'asc' | 'desc') : undefined,
  page: filters.page,
  pageSize: filters.pageSize,
  ...convertPeriodToDateRange(filters.selectedPeriod),
});

export function useProfitLossReportQuery(deviceId: string, storeId: string, filters: ProfitLossReportFilters) {
  const debouncedSearch = useDebounce(filters.search, 300);
  const queryParams = buildProfitLossQueryParams(filters, debouncedSearch);
  
  return useQuery({
    queryKey: ['profit-loss-reports', deviceId, storeId, queryParams],
    queryFn: () =>
      getProfitLossReports({
        'x-device-id': deviceId,
        'x-store-id': storeId,
        query: queryParams,
    }),
    enabled: Boolean(deviceId && storeId),
    refetchOnWindowFocus: false,
    staleTime: 300_000,
    retry: 1,
    retryDelay: 1000,
  });
}
