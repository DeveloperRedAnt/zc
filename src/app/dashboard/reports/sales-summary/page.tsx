// page.tsx sales-summary
'use client';

import {
  useGetSalesSummary,
  useGetSalesSummaryChart,
} from '@/__generated__/api/hooks/reports/sales-summary.hooks';
import { PageSection } from '@/components/page-section/page-section';
import { SummaryChart } from '@/modules/reports/sales-summary/components/summary-chart';
import { SummaryFilter } from '@/modules/reports/sales-summary/components/summary-filter';
import { SummaryTable } from '@/modules/reports/sales-summary/components/summary-table';
import { CardComponentFilter } from '@/modules/reports/sales-variant/components/card-component-filter';
import { getMonthRange } from '@/utils/dateRange';
import { useRouter, useSearchParams } from 'next/navigation';
import { parseAsString, useQueryStates } from 'nuqs';
import { useMemo, useState } from 'react';

export default function SalesSummaryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultDateRange = useMemo(() => getMonthRange(), []);

  const [filters, setFilters] = useQueryStates({
    start_date: parseAsString,
    end_date: parseAsString,
    store_id: parseAsString,
    periode_type: parseAsString,
  });

  const selectedStoreIds = useMemo(() => {
    if (!filters.store_id?.trim()) {
      return null;
    }
    const parsedId = parseInt(filters.store_id);
    if (!Number.isNaN(parsedId) && parsedId > 0) {
      return [parsedId];
    }
    return null;
  }, [filters.store_id]);

  const tableApiParams = useMemo(() => {
    return {
      store_ids: selectedStoreIds,
      period_type:
        (filters.periode_type as 'quarterly' | 'monthly' | 'yearly') || ('monthly' as const),
      period_start: filters.start_date || defaultDateRange.start,
      period_end: filters.end_date || defaultDateRange.end,
      sort_by: 'netto',
      sort_direction: 'desc' as const,
      page: currentPage,
    };
  }, [currentPage, filters, selectedStoreIds, defaultDateRange]);

  const chartApiParams = useMemo(() => {
    return {
      store_ids: selectedStoreIds,
      period_type:
        (filters.periode_type as 'quarterly' | 'monthly' | 'yearly') || ('monthly' as const),
      period_start: filters.start_date || defaultDateRange.start,
      period_end: filters.end_date || defaultDateRange.end,
    };
  }, [filters, selectedStoreIds, defaultDateRange]);

  const { data: salesSummaryResponse, isLoading: isLoadingSummary } = useGetSalesSummary({
    body: tableApiParams,
  });

  const { data: salesChartResponse, isLoading: isLoadingChart } = useGetSalesSummaryChart({
    body: chartApiParams,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStoreFilterChange = (storeOption: { value: string; label: string } | null) => {
    if (storeOption?.value) {
      setFilters({
        store_id: storeOption.value,
      });
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('store_id');
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;
      router.push(newUrl);
    }
    setCurrentPage(1);
  };

  const handleDateRangeChange = (
    start: string | undefined,
    end: string | undefined,
    periodeType: string
  ) => {
    setFilters({
      start_date: start || null,
      end_date: end || null,
      periode_type: periodeType,
    });
    setCurrentPage(1);
  };

  const handleDateRangeReset = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('start_date');
    params.delete('end_date');

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    router.replace(newUrl);
    setCurrentPage(1);
  };

  const currentSelectedStore = useMemo(() => {
    if (!filters.store_id?.trim()) return null;
    return {
      value: filters.store_id,
      label: `Store ${filters.store_id}`,
    };
  }, [filters.store_id]);

  return (
    <>
      <PageSection title="Bar Chart Ringkasan Penjualan">
        <CardComponentFilter title={'Bar Chart Ringkasan Penjualan'} subtitle="2020 - 2025">
          <SummaryFilter
            onStoreChange={handleStoreFilterChange}
            onDateRangeChange={handleDateRangeChange}
            onDateRangeReset={handleDateRangeReset}
            selectedStore={currentSelectedStore}
            startDate={filters.start_date || undefined}
            endDate={filters.end_date || undefined}
            periodeType={filters.periode_type || 'weekly'}
            defaultDateRange={defaultDateRange}
          />
          <SummaryChart data={salesChartResponse || []} isLoading={isLoadingChart} />
        </CardComponentFilter>
      </PageSection>

      <PageSection title="Ringkasan Penjualan">
        <SummaryTable
          data={salesSummaryResponse?.data || []}
          pagination={salesSummaryResponse?.pagination}
          isLoading={isLoadingSummary}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </PageSection>
    </>
  );
}
