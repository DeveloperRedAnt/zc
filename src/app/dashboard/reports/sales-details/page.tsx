// sales-detail page.tsx
'use client';

import { ApiProductDetails } from '@/__generated__/api/dto/reports/sales-details.dto';
import { ApiCashier } from '@/__generated__/api/dto/reports/sales-details.dto';
import { useGetProducts } from '@/__generated__/api/hooks/reports/sales-details.hooks';
import { useGetCashiers } from '@/__generated__/api/hooks/reports/sales-details.hooks';
import { PageLayout } from '@/components/page-layout/page-layout';
import { FilterCashierTable } from '@/modules/reports/sales-details/components/filter-sales-detail';
import SalesDetailsTable from '@/modules/reports/sales-details/components/table-sales-detail';
import { getMonthRange } from '@/utils/dateRange';
import { useRouter, useSearchParams } from 'next/navigation';
import { parseAsString, useQueryStates } from 'nuqs';
import { useMemo, useState } from 'react';

export default function SalesDetailsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get default month range - memoize to keep consistent values
  const defaultDateRange = useMemo(() => getMonthRange(), []);

  // Use query states for all filters - match API parameter names
  const [filters, setFilters] = useQueryStates({
    start_date: parseAsString,
    end_date: parseAsString,
    cashier_id: parseAsString, // Changed from employee_id to match API
    product_id: parseAsString,
  });

  // Fetch products for filter dropdown
  const { data: productsResponse, isLoading: isLoadingProducts } = useGetProducts({
    body: {
      page: 0,
      per_page: 1000, // Get all products for dropdown
      search: '',
    },
  });

  // Fetch cashiers for filter dropdown
  const { data: cashiersResponse, isLoading: isLoadingCashiers } = useGetCashiers({
    body: {
      page: 0,
      per_page: 1000, // Get all cashiers for dropdown
    },
  });

  // Transform products data for dropdown
  const productOptions: Array<{ value: string; label: string }> =
    (productsResponse?.data as ApiProductDetails[])?.map((product) => ({
      value: product.id.toString(),
      label: product.name || product.brand || `Product ${product.id}`,
    })) || [];

  // Transform cashiers data for dropdown - using employee_id as value
  const cashierOptions: Array<{ value: string; label: string }> =
    (cashiersResponse?.data as ApiCashier[])?.map((cashier) => ({
      value: cashier.employee_id.toString(), // Use employee_id as value
      label: cashier.employee_name || `Employee ${cashier.employee_id}`,
    })) || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCashierFilterChange = (employeeId: string | undefined) => {
    if (employeeId) {
      // Set the cashier filter
      setFilters({
        cashier_id: employeeId,
      });
    } else {
      // Remove cashier filter when "Semua Kasir" is selected
      const params = new URLSearchParams(searchParams.toString());
      params.delete('cashier_id');
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;
      router.push(newUrl);
    }
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleProductFilterChange = (productId: string | undefined) => {
    if (productId) {
      // Set the product filter
      setFilters({
        product_id: productId,
      });
    } else {
      // Remove product filter when "Semua Produk" is selected
      const params = new URLSearchParams(searchParams.toString());
      params.delete('product_id');
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;
      router.push(newUrl);
    }
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleDateRangeChange = (start: string | undefined, end: string | undefined) => {
    setFilters({
      start_date: start || null,
      end_date: end || null,
    });
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Fixed: Handle reset to completely remove date parameters from URL
  const handleDateRangeReset = () => {
    // Create new URLSearchParams from current search params
    const params = new URLSearchParams(searchParams.toString());

    // Remove date parameters completely
    params.delete('start_date');
    params.delete('end_date');

    // Build new URL - if no params remain, use clean path
    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    // Navigate to new URL - this will completely remove the date params
    router.replace(newUrl); // Use replace instead of push to avoid history entry

    // Reset page to first page
    setCurrentPage(1);
  };

  return (
    <PageLayout title="Detail Penjualan">
      <FilterCashierTable
        productOptions={productOptions}
        cashierOptions={cashierOptions}
        isLoading={isLoadingProducts || isLoadingCashiers}
        onCashierChange={handleCashierFilterChange}
        onProductChange={handleProductFilterChange}
        onDateRangeChange={handleDateRangeChange}
        onDateRangeReset={handleDateRangeReset}
        selectedCashier={filters.cashier_id || undefined}
        selectedProduct={filters.product_id || undefined}
        startDate={filters.start_date || undefined}
        endDate={filters.end_date || undefined}
        defaultDateRange={defaultDateRange}
      />
      <SalesDetailsTable
        cashierFilter={filters.cashier_id || undefined}
        productFilter={filters.product_id || undefined}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        startDate={filters.start_date || undefined}
        endDate={filters.end_date || undefined}
      />
    </PageLayout>
  );
}
