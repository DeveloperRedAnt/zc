'use client';

import { DateRangePicker } from '@/components/popup-datepicker/date-ranger-picker';
import { getMonthRange } from '@/utils/dateRange';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useVoidReportFilters } from '../hooks/use-chasier-report-filters';

const SupplierDropdown = dynamic(
  () => import('../shared-components/select-chasier').then((mod) => mod.SupplierDropdown),
  { ssr: false }
);

const TokoDropdown = dynamic(
  () => import('../shared-components/select-toko').then((mod) => mod.TokoDropdown),
  { ssr: false }
);

export type Option = { value: string; label: string };

export function VoidReportFilters() {
  const { filters, updateStartDate, updateEndDate, updateToko, updateCashier } =
    useVoidReportFilters();
  const [selectedKasir, setSelectedKasir] = useState<Option | null>(null);
  const [selecttoko, setToko] = useState<Option | null>(null);
  const { start, end } = getMonthRange();

  const handleKasirChange = (option: Option | null) => {
    updateCashier(option?.value ?? '');
    setSelectedKasir(option);
  };
  const handleTokoChange = (option: Option | null) => {
    updateToko(option?.value ?? '');
    setToko(option);
  };

  return (
    <div className="flex flex-wrap items-end gap-4 mb-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="periode" className="text-sm font-medium text-gray-700">
          Periode
        </label>
        <DateRangePicker
          allowedViews={['daily', 'weekly', 'monthly', 'quarterly']}
          initialPeriod={{
            type: 'daily',
            value: {
              from: filters.start_date ? new Date(filters.start_date) : new Date(start),
              to: filters.end_date ? new Date(filters.end_date) : new Date(end),
            },
          }}
          onApply={(period) => {
            if (period?.value?.from)
              updateStartDate(
                period.value.from instanceof Date
                  ? period.value.from.toISOString().slice(0, 10)
                  : String(period.value.from)
              );
            if (period?.value?.to)
              updateEndDate(
                period.value.to instanceof Date
                  ? period.value.to.toISOString().slice(0, 10)
                  : String(period.value.to)
              );
          }}
          className="max-w-md h-13 bg-white w-[278px]"
        />
      </div>
      <div className={'flex flex-col gap-2'}>
        <SupplierDropdown
          label="Nama Kasir"
          value={selectedKasir}
          onChange={handleKasirChange}
          className="w-[278px]"
        />
      </div>
      <div className={'flex flex-col gap-2'}>
        <TokoDropdown
          label="Nama Toko"
          value={selecttoko}
          onChange={handleTokoChange}
          className="w-[278px]"
        />
      </div>
    </div>
  );
}
