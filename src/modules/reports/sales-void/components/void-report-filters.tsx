import { DateRangePicker } from '@/components/popup-datepicker/date-ranger-picker';
import { Table } from '@tanstack/react-table';
// import { Period } from "../../sales-payment/types";
import React, { useEffect } from 'react';
import { useVoidReportFilters } from '../hooks/use-void-report-filters';
import { FilterOption, VoidReport } from '../types/void-report.types';
import { SearchFilter } from './search-filter';
import { SelectFilter } from './select-filter';

interface VoidReportFiltersProps {
  table: Table<VoidReport>;
  responsiblePersonOptions: FilterOption[];
  cashierOptions: FilterOption[];
}

export function VoidReportFilters({
  table,
  responsiblePersonOptions,
  cashierOptions,
}: VoidReportFiltersProps) {
  const { filters, updateSearch, updateResponsiblePerson, updateCashier, updateSelectedPeriod } =
    useVoidReportFilters();

  // Sync URL parameters with table filters
  useEffect(() => {
    table.setGlobalFilter(filters.search);
  }, [filters.search, table]);

  useEffect(() => {
    if (filters.responsiblePerson === 'all-responsible') {
      table.getColumn('penanggungjawab')?.setFilterValue('');
    } else {
      table.getColumn('penanggungjawab')?.setFilterValue(filters.responsiblePerson);
    }
  }, [filters.responsiblePerson, table]);

  useEffect(() => {
    if (filters.cashier === 'all-cashier') {
      table.getColumn('kasir')?.setFilterValue('');
    } else {
      table.getColumn('kasir')?.setFilterValue(filters.cashier);
    }
  }, [filters.cashier, table]);

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
      <SearchFilter
        value={filters.search}
        onChange={updateSearch}
        placeholder="Cari..."
        label="Cari No. Nota"
        id="search-nota"
        className="h-12"
      />

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
