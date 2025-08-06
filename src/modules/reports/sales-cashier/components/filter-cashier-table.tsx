'use client';

import { DateRangePicker } from '@/components/popup-datepicker/date-ranger-picker';
import { SelectFilter } from '@/modules/reports/sales-void/components/select-filter';
import React from 'react';
import { useSalesCashierFilters } from '../hooks/use-sales-cashier';

type FilterCashierTableProps = {
  responsiblePersonOptions: { value: string; label: string }[];
  cashierOptions?: { value: string; label: string }[];
};

export function FilterCashierTable({
  responsiblePersonOptions,
  cashierOptions = [],
}: FilterCashierTableProps) {
  const { filters, updateSelectedPeriod, updateResponsiblePerson, updateCashier } =
    useSalesCashierFilters();

  return (
    <div className="flex flex-wrap items-end gap-4 mb-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="periode" className="text-sm font-medium text-gray-700">
          Periode
        </label>
        <DateRangePicker
          initialPeriod={filters.selectedPeriod}
          onApply={(period) => {
            updateSelectedPeriod(period);
          }}
          defaultDailyRange={{
            from: new Date(2025, 6, 17),
            to: new Date(2025, 6, 19),
          }}
          defaultMonthlyRange={{
            from: new Date(2025, 6, 1),
          }}
          defaultQuarterlyRange={{
            from: { quarter: 1, year: 2025 },
          }}
          defaultYearlyRange={{
            from: 2020,
            to: 2022,
          }}
          className="max-w-md h-12 bg-white w-[278px]"
        />
      </div>
      <SelectFilter
        value={filters.responsiblePerson}
        onChange={updateResponsiblePerson}
        options={responsiblePersonOptions}
        label="Penanggungjawab Void"
        placeholder="Semua Penanggungjawab"
        id="penanggungjawab-void"
        allOptionValue="all-responsible"
      />

      <SelectFilter
        value={filters.cashier}
        onChange={updateCashier}
        options={cashierOptions}
        label="Nama Kasir"
        placeholder="Semua Kasir"
        id="nama-kasir"
        allOptionValue="all-cashier"
      />
    </div>
  );
}
