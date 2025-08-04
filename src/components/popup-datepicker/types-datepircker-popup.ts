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

export type WeeklyRange = { from: Date; to: Date };

export interface DateRangeState {
  dailyRange?: DateRange;
  singleBorderedDate?: Date;
  weeklyRange?: WeeklyRange;
  monthlyRange?: MonthlyRange;
  quarterlyRange?: QuarterlyRange;
  yearlyRange?: YearlyRange;
  calendarMonth: Date;
  currentYearNav: number;
}

export interface DateRangeActions {
  setDailyRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  setSingleBorderedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setWeeklyRange: React.Dispatch<React.SetStateAction<WeeklyRange | undefined>>;
  setMonthlyRange: React.Dispatch<React.SetStateAction<MonthlyRange | undefined>>;
  setQuarterlyRange: React.Dispatch<React.SetStateAction<QuarterlyRange | undefined>>;
  setYearlyRange: React.Dispatch<React.SetStateAction<YearlyRange | undefined>>;
  setCalendarMonth: React.Dispatch<React.SetStateAction<Date>>;
  setCurrentYearNav: React.Dispatch<React.SetStateAction<number>>;
}

export interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  onApply: (period: Period) => void;
  initialPeriod?: Period;
  defaultDailyRange?: DateRange;
  defaultSingleBorderedDate?: Date;
  defaultMonthlyRange?: MonthlyRange;
  defaultQuarterlyRange?: QuarterlyRange;
  defaultYearlyRange?: YearlyRange;
}

export interface ViewProps {
  state: DateRangeState;
  actions: DateRangeActions;
}
