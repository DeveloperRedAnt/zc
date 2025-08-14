'use client';

import { DateRangePicker } from '@/components/popup-datepicker/date-ranger-picker';
import { getMonthRange } from '@/utils/dateRange';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useSalesDetailFilters } from '../hooks/use-sales-daily';

const TokoDropdown = dynamic(
  () => import('../../sales-cashier/shared-components/select-toko').then((mod) => mod.TokoDropdown),
  { ssr: false }
);

export type Option = { value: string; label: string };
export function FilterSalesDailyTable() {
  const { filters, updateToko, updateStartDate, updateEndDate, updateGrouping } =
    useSalesDetailFilters();
  const { start, end } = getMonthRange();
  const [selecttoko, setToko] = useState<Option | null>(null);
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
          initialPeriod={{
            type: 'weekly',
            value: {
              from: filters.start_date ? new Date(filters.start_date) : new Date(start),
              to: filters.end_date ? new Date(filters.end_date) : new Date(end),
            },
          }}
          onApply={(period) => {
            if (period?.type) {
              updateGrouping(period?.type);
            }
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
          hideSidebar={true}
          allowedViews={['weekly', 'monthly']}
          defaultView="weekly"
        />
      </div>
      <TokoDropdown
        label="Nama Toko"
        value={selecttoko}
        onChange={handleTokoChange}
        className="w-[278px]"
      />
    </div>
  );
}
