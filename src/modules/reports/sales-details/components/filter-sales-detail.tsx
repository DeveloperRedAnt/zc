'use client';

import { DateRangePicker } from '@/components/popup-datepicker/date-ranger-picker';
import { SelectFilter } from '@/modules/reports/sales-void/components/select-filter';
import React from 'react';
import { useSalesDetailFilters } from '../hooks/use-filter-sales';
import { Period } from '../types/sales-type-sales';

interface FilterData {
  period: Period | undefined;
  productName: string;
  variantName: string;
  storeName: string;
}

export interface FilterCashierTableProps {
  onFilterChange?: (filters: FilterData) => void;
  responsiblePersonOptions: Array<{ label: string; value: string }>;
  cashierOptions?: Array<{ label: string; value: string }>;
}

export function FilterCashierTable({ responsiblePersonOptions }: FilterCashierTableProps) {
  const { filters, updateSelectedPeriod, updateResponsiblePerson } = useSalesDetailFilters();

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
        label="Nama Toko"
        placeholder="Nama Toko"
        id="nama-produk-void"
        allOptionValue="all-responsible"
      />
    </div>
  );
}
