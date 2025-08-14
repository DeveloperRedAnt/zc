// sales-summary.hooks.ts
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import * as api from '../../client/reports/sales-summary.client';
import * as DTO from '../../dto';

export function useGetSalesSummary(
  params: {
    body: DTO.GetSalesSummaryPayloadSchema;
  },
  options?: Omit<UseQueryOptions<DTO.ApiSalesSummaryResponse, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<DTO.ApiSalesSummaryResponse, Error>({
    queryKey: ['listSalesSummary', params.body],
    queryFn: () => api.listSalesSummary(params.body),
    // Always enabled since we now accept null store_ids
    ...options,
  });
}

export function useGetSalesSummaryChart(
  params: {
    body: DTO.GetSalesSummaryChartPayloadSchema;
  },
  options?: Omit<UseQueryOptions<DTO.ApiSalesSummaryChartData[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<DTO.ApiSalesSummaryChartData[], Error>({
    queryKey: ['listSalesSummaryChart', params.body],
    queryFn: () => api.listSalesSummaryChart(params.body),
    // Always enabled since we now accept null store_ids
    ...options,
  });
}

// Hook untuk store dropdown - tidak lagi diperlukan di halaman ini
// karena TokoDropdown component sudah handle sendiri
export function useGetStoreDropdown(
  params?: {
    body?: DTO.GetStorePayloadSchema;
  },
  options?: Omit<UseQueryOptions<DTO.ApiStoreDropdownResponse, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<DTO.ApiStoreDropdownResponse, Error>({
    queryKey: ['listStoreDropDown', params?.body],
    queryFn: () => api.listStoreDropDown(params?.body),
    ...options,
  });
}