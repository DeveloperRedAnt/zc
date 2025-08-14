import { useSalesVariantFilters } from '@/modules/reports/sales-variant/hooks/use-sales-variant-filter';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getReportSalesVariant, getVariantProductDropdown } from '../../client/reports/sales-variant.client';
import * as DTO from '../../dto/reports/sales-variant.dto';

export function useSalesVariantData() {
  const { filters } = useSalesVariantFilters();

  const apiParams: DTO.SalesVariantApiParams = useMemo(() => {
    return {
      product_id: filters.product_id,
      product_variant_id: filters.product_variant_id,
      store_id: filters.store_id,
      start_date: filters.start_date,
      end_date: filters.end_date,
      sort_by: filters.sort_by || 'product_name',
      sort_dir: filters.sort_dir as 'asc' | 'desc',
      per_page: filters.per_page,
      page: filters.page + 1, // API pakai 1-based pagination
    };
  }, [filters]);

  const query = useQuery({
    queryKey: ['sales-variant-data', apiParams],
    queryFn: () => getReportSalesVariant(apiParams),
    staleTime: 5 * 60 * 1000, // 5 menit
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
    graphData: query.data?.data?.graph || [],
    tableData: query.data?.data?.table || null,
  };
}

export type VariantProductListParams = {
  page?: number;
  per_page?: number;
  search?: string;
};

export function useGetVariantProductList(
  params: VariantProductListParams,
  options?: UseQueryOptions<DTO.VariantReportProductListResponse>
) {
  return useQuery<DTO.VariantReportProductListResponse>({
    queryKey: ['getVariantProductDropdown', params],
    queryFn: () => getVariantProductDropdown(params),
    placeholderData: (prev) => prev,
    ...options,
  });
}