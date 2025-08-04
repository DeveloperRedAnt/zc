'use client';

import { CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/button/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover/popover';
import { cn } from '@/libs/utils';
import { PeriodType } from './types-datepircker-popup';

import { ActionButtons } from './common/action-buttons';
import { PeriodSelector } from './common/period-selector';
import { DisplayValue } from './display-value';
import { useDateRangeEffects, useDateRangeLogic, useDateRangeState } from './hooks';
import { DateRangePickerProps } from './types-datepircker-popup';
import { DailyView, MonthlyView, QuarterlyView, WeeklyView, YearlyView } from './views';

export function DateRangePicker({
  className,
  onApply,
  initialPeriod,
  defaultDailyRange = {
    from: new Date(2025, 6, 17),
    to: new Date(2025, 6, 19),
  },
  defaultSingleBorderedDate = new Date(2025, 6, 5),
  defaultMonthlyRange,
  defaultQuarterlyRange,
  defaultYearlyRange,
}: DateRangePickerProps) {
  const [view, setView] = React.useState<PeriodType>(initialPeriod?.type || 'daily');

  const [state, actions] = useDateRangeState({
    initialPeriod,
    defaultDailyRange,
    defaultSingleBorderedDate,
    defaultMonthlyRange,
    defaultQuarterlyRange,
    defaultYearlyRange,
  });

  const { handleApply, handleReset } = useDateRangeLogic({
    state,
    actions,
    view,
    onApply,
  });

  useDateRangeEffects({
    view,
    state,
    actions,
    defaultDailyRange,
    defaultMonthlyRange,
    defaultQuarterlyRange,
    defaultYearlyRange,
  });

  const renderView = () => {
    const viewProps = { state, actions };

    switch (view) {
      case 'daily':
        return <DailyView {...viewProps} />;
      case 'weekly':
        return <WeeklyView {...viewProps} />;
      case 'monthly':
        return <MonthlyView {...viewProps} />;
      case 'quarterly':
        return <QuarterlyView {...viewProps} />;
      case 'yearly':
        return <YearlyView {...viewProps} />;
      default:
        return <DailyView {...viewProps} />;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={'outline'}
          className={cn(
            'w-[400px] justify-start text-left font-normal',
            'truncate',
            !state.dailyRange && 'text-muted-foreground',
            className
          )}
          title={undefined}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span className="truncate">
            <DisplayValue
              view={view}
              dailyRange={state.dailyRange}
              weeklyRange={state.weeklyRange}
              monthlyRange={state.monthlyRange}
              quarterlyRange={state.quarterlyRange}
              yearlyRange={state.yearlyRange}
            />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 flex bg-white shadow-lg border border-gray-200 rounded-lg"
        align="start"
      >
        <PeriodSelector view={view} onViewChange={setView} />
        <div className="flex flex-col bg-white">
          <div className="p-4">{renderView()}</div>
          <ActionButtons onReset={handleReset} onApply={handleApply} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
