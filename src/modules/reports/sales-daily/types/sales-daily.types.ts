import type { DateRange } from 'react-day-picker';

export type PeriodType = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';

export interface MonthlyRange {
  from?: Date;
  to?: Date;
}

export interface QuarterlyRange {
  from?: { quarter: number; year: number };
  to?: { quarter: number; year: number };
}

export interface YearlyRange {
  from?: number;
  to?: number;
}

export type PeriodValue = DateRange | MonthlyRange | QuarterlyRange | YearlyRange;

export interface Period {
  type: PeriodType;
  value: PeriodValue;
}

export interface PieChartDataEntry {
  name: string;
  value: number;
  fill: string;
}
