import { MonthlyRange, PeriodType, QuarterlyRange, YearlyRange } from './types-datepircker-popup';

import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import * as React from 'react';
import type { DateRange } from 'react-day-picker';

type WeeklyRange = { from: Date; to: Date };

type DisplayValueProps = {
  view: PeriodType;
  dailyRange?: DateRange;
  weeklyRange?: WeeklyRange;
  monthlyRange?: MonthlyRange;
  quarterlyRange?: QuarterlyRange;
  yearlyRange?: YearlyRange;
};

export function DisplayValue({
  view,
  dailyRange,
  weeklyRange,
  monthlyRange,
  quarterlyRange,
  yearlyRange,
}: DisplayValueProps) {
  let prefix = '';
  let valueString = '';

  switch (view) {
    case 'daily':
      prefix = 'Harian';
      if (dailyRange?.from) {
        valueString = dailyRange.to
          ? `${format(dailyRange.from, 'dd/MM/yyyy', { locale: id })} - ${format(
              dailyRange.to,
              'dd/MM/yyyy',
              { locale: id }
            )}`
          : format(dailyRange.from, 'dd/MM/yyyy', { locale: id });
      } else {
        valueString = 'Pilih Tanggal';
      }
      break;
    case 'weekly':
      prefix = 'Mingguan';
      if (weeklyRange?.from && weeklyRange?.to) {
        valueString = `${format(weeklyRange.from, 'dd/MM/yyyy', { locale: id })} - ${format(
          weeklyRange.to,
          'dd/MM/yyyy',
          { locale: id }
        )}`;
      } else {
        valueString = 'Pilih Minggu';
      }
      break;
    case 'monthly':
      prefix = 'Bulanan';
      if (monthlyRange?.from) {
        valueString = monthlyRange.to
          ? `${format(monthlyRange.from, 'MMM yyyy', { locale: id })} - ${format(
              monthlyRange.to,
              'MMM yyyy',
              { locale: id }
            )}`
          : format(monthlyRange.from, 'MMMM yyyy', { locale: id });
      } else {
        valueString = 'Pilih Bulan';
      }
      break;
    case 'quarterly': {
      prefix = 'Kuartal';
      const quarterNames = ['Q1 (Jan - Mar)', 'Q2 (Apr - Jun)', 'Q3 (Jul - Sep)', 'Q4 (Okt - Des)'];
      if (quarterlyRange?.from) {
        const fromQ = quarterNames[quarterlyRange.from.quarter - 1];
        const toQ = quarterlyRange.to ? quarterNames[quarterlyRange.to.quarter - 1] : null;
        valueString = quarterlyRange.to
          ? `${fromQ} ${quarterlyRange.from.year} - ${toQ} ${quarterlyRange.to.year}`
          : `${fromQ} ${quarterlyRange.from.year}`;
      } else {
        valueString = 'Pilih Kuartal';
      }
      break;
    }
    case 'yearly':
      prefix = 'Tahunan';
      if (yearlyRange?.from) {
        valueString = yearlyRange.to
          ? `${yearlyRange.from} - ${yearlyRange.to}`
          : String(yearlyRange.from);
      } else {
        valueString = 'Pilih Tahun';
      }
      break;
    default:
      return <>Pilih Periode</>;
  }

  return <>{`${prefix} | ${valueString}`}</>;
}
