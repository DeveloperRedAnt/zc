'use client';

import { DateRangePicker } from '@/components/popup-datepicker/date-ranger-picker';
import type { PeriodType } from '@/components/popup-datepicker/types-datepircker-popup';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useSalesVariantFilters } from '../hooks/use-sales-variant-filter';

const StoreDropdown = dynamic(
  () =>
    import('@/modules/reports/sales-cashier/shared-components/select-toko').then(
      (mod) => mod.TokoDropdown
    ),
  { ssr: false }
);

const VariantDropdown = dynamic(
  () =>
    import('@/modules/reports/sales-cashier/shared-components/select-variant').then(
      (mod) => mod.VariantDropdown
    ),
  { ssr: false }
);

const ProductDropdown = dynamic(
  () =>
    import('@/modules/reports/sales-cashier/shared-components/select-product').then(
      (mod) => mod.ProductDropdown
    ),
  { ssr: false }
);

export type Option = { value: string; label: string };

export function SalesVariantFilter() {
  const {
    filters,
    updateStartDate,
    updateEndDate,
    updateStore,
    updateProduct,
    updateVariant,
    updatePeriod,
  } = useSalesVariantFilters();
  const [selectedProduct, setSelectedProduct] = useState<Option | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Option | null>(null);
  const [selectedStore, setSelectedStore] = useState<Option | null>(null);

  const toPeriodType = (value?: string): PeriodType => {
    const allowed: readonly PeriodType[] = [
      'daily',
      'weekly',
      'monthly',
      'quarterly',
      'yearly',
    ] as const;
    return allowed.includes(value as PeriodType) ? (value as PeriodType) : 'monthly';
  };

  const handleStoreChange = (option: Option | null) => {
    updateStore(option?.value ?? '');
    setSelectedStore(option);
  };

  const handleVariantChange = (option: Option | null) => {
    updateVariant(option?.value ?? '');
    setSelectedVariant(option);
  };

  const handleProductChange = (option: Option | null) => {
    updateProduct(option?.value ?? '');
    setSelectedProduct(option);
  };

  return (
    <div className="flex flex-wrap items-end gap-4 mb-6 mt-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="periode" className="text-sm font-medium text-gray-700">
          Periode
        </label>
        <DateRangePicker
          allowedViews={['weekly', 'monthly', 'quarterly'] as PeriodType[]}
          initialPeriod={{
            type: toPeriodType(filters.period),
            value: {
              from: new Date(filters.start_date),
              to: new Date(filters.end_date),
            },
          }}
          onApply={(period) => {
            if (period?.value) {
              updatePeriod(period.type);
              const { from, to } = period.value as { from: Date; to: Date };

              // Helper function untuk format date tanpa timezone issues
              const formatDateLocal = (date: Date): string => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
              };

              if (from) {
                const startDateStr = from instanceof Date ? formatDateLocal(from) : String(from);
                updateStartDate(startDateStr);
              }
              if (to) {
                const endDateStr = to instanceof Date ? formatDateLocal(to) : String(to);
                updateEndDate(endDateStr);
              }
            }
          }}
          className="max-w-md h-13 bg-white w-[278px]"
        />
      </div>

      <ProductDropdown
        label="Nama Produk"
        value={selectedProduct}
        onChange={handleProductChange}
        className="w-[250px]"
      />

      <VariantDropdown
        label="Nama Varian"
        value={selectedVariant}
        onChange={handleVariantChange}
        className="w-[250px]"
      />

      <StoreDropdown
        label="Nama Toko"
        value={selectedStore}
        onChange={handleStoreChange}
        className="w-[250px]"
      />
    </div>
  );
}
