'use client';

import { DateRangePicker } from '@/components/popup-datepicker/date-ranger-picker';
import React, { useState } from 'react';
import { useVoidReportFilters } from '../hooks/use-void-report-filters';
const SupplierDropdown = dynamic(
  () =>
    import('../../sales-cashier/shared-components/select-chasier').then(
      (mod) => mod.SupplierDropdown
    ),
  { ssr: false }
);
import { getMonthRange } from '@/utils/dateRange';
import dynamic from 'next/dynamic';
import { SearchFilter } from './search-filter';
export type Option = { value: string; label: string };

export function VoidReportFilters() {
  const { filters, updateStartDate, updateEndDate, updateVoidBy, updateNotaNumber } =
    useVoidReportFilters();

  const [selectedKasir, setSelectedKasir] = useState<Option | null>(null);
  const [selectVoid, setVoid] = useState<Option | null>(null);
  const { start, end } = getMonthRange();

  const handleKasirChange = (kasir: Option | null) => {
    updateVoidBy(kasir?.value ?? '');
    setSelectedKasir(kasir);
  };

  const handleChangeVoid = (voidOption: Option | null) => {
    updateVoidBy(voidOption?.value ?? '');
    setVoid(voidOption);
  };

  const handleNotaNumberChange = (nota_number: string) => {
    updateNotaNumber(nota_number);
  };

  return (
    <div className="flex flex-wrap items-end gap-4 mb-6">
      <div className="flex flex-row gap-4 items-end">
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
          className="max-w-md h-12 bg-white w-[278px]"
        />
      </div>

      <div className={'flex flex-row gap-4 items-end'}>
        <SearchFilter
          value={filters.nota_number}
          onChange={handleNotaNumberChange}
          placeholder="Cari..."
          label="Cari No. Nota"
          id="search-nota"
          className="h-12"
        />
      </div>
      <div className={'flex flex-row gap-4 items-end'}>
        <SupplierDropdown
          label="Semua Penanggung jawab"
          placholder="Semua Penanggung jawab"
          value={selectVoid}
          onChange={handleChangeVoid}
          className="w-[278px]"
        />
      </div>
      <div className={'flex flex-row gap-4 items-end'}>
        <SupplierDropdown
          label="Nama Kasir"
          placholder="Semua kasir"
          value={selectedKasir}
          onChange={handleKasirChange}
          className="w-[278px]"
        />
      </div>
    </div>
  );
}
