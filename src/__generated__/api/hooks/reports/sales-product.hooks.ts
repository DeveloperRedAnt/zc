import { useSalesProductFilters } from '@/modules/reports/sales-product/hooks/use-sales-product-filter';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getReportSalesProduct } from '../../client/reports/sales-product.client';
import * as DTO from '../../dto/reports/sales-product.dto';

export function useSalesProductData() {
  const { filters } = useSalesProductFilters();

  const apiParams: DTO.SalesProductApiParams = useMemo(() => {
    // Gunakan langsung start_date dan end_date dari filters
    // yang sudah di-handle dengan timezone-safe formatting

    return {
      product_id: filters.product_id,
      store_id: filters.store_id,
      start_date: filters.start_date,
      end_date: filters.end_date,
      sort_column: filters.sort_column || 'product_name',
      sort_direction: filters.sort_direction as 'asc' | 'desc',
      per_page: filters.per_page,
      page: filters.page + 1, // API pakai 1-based pagination
    };
  }, [filters]);

  const query = useQuery({
    queryKey: ['sales-product-data', apiParams],
    queryFn: () => getReportSalesProduct(apiParams),
    staleTime: 5 * 60 * 1000, // 5 menit
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
    graphData: query.data?.data?.graph || [],
    tableData: query.data?.data?.table || null,
  };
}