'use client';

import { Button } from '@/components/button/button';
import { Calendar } from '@/components/calendar/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover/popover';
import { cn } from '@/libs/utils';
import { Calendar as CalendarIcon } from '@icon-park/react';
import { format } from 'date-fns';
import * as React from 'react';
import { DateRange as DateRangeType } from 'react-day-picker';

export type DateRange = DateRangeType;

type DatePickerProps = {
  label?: string;
  mode?: 'single' | 'range';
  mandatory?: string;
  placeholder?: string;
  className?: string;
  value?: Date | DateRange;
  onChange?: (date: Date | DateRange | undefined) => void;
  closeOnSelect?: boolean;
};

export function DatePicker({
  label = '',
  mode = 'single',
  mandatory = 'false',
  placeholder,
  className,
  value,
  onChange,
  closeOnSelect = false,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<Date | DateRange | undefined>(undefined);

  React.useEffect(() => {
    if (!open) {
      setInternalValue(value);
    }
  }, [value, open]);

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;

    if (mode === 'single') {
      setInternalValue(date);
      onChange?.(date);
      if (closeOnSelect) setOpen(false);
      return;
    }

    // Jika sudah ada from dan to → selalu reset
    if (
      internalValue &&
      typeof internalValue === 'object' &&
      'from' in internalValue &&
      internalValue.from &&
      internalValue.to
    ) {
      const newRange: DateRange = { from: date, to: undefined };
      setInternalValue(newRange);
      onChange?.(newRange);
      return;
    }

    // Jika hanya ada from, dan user pilih tanggal setelahnya → jadikan to
    if (
      internalValue &&
      typeof internalValue === 'object' &&
      'from' in internalValue &&
      internalValue.from &&
      !internalValue.to
    ) {
      const from = internalValue.from;

      if (date.getTime() <= from.getTime()) {
        // Kalau klik tanggal sebelum/sama dengan from → reset jadi from baru
        const newRange: DateRange = { from: date, to: undefined };
        setInternalValue(newRange);
        onChange?.(newRange);
        return;
      }

      // Klik valid → jadi to
      const newRange: DateRange = { from, to: date };
      setInternalValue(newRange);
      onChange?.(newRange);
      setOpen(false);
      return;
    }

    // Pertama kali klik → from
    const newRange: DateRange = { from: date, to: undefined };
    setInternalValue(newRange);
    onChange?.(newRange);
  };

  const displayValue = () => {
    if (mode === 'range' && value && typeof value === 'object' && 'from' in value && value.from) {
      const from = format(value.from, 'dd MMM yyyy');
      const to = value.to ? format(value.to, 'dd MMM yyyy') : '...';
      return `${from} - ${to}`;
    }

    if (mode === 'single' && value instanceof Date) {
      return format(value, 'dd MMM yyyy');
    }

    return placeholder || 'Pick a date';
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {mandatory === 'true' && <span className="text-red-500">&nbsp;*</span>}
        </label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            onClick={() => {
              setOpen((prev) => !prev);
            }}
            className={cn(
              'w-full justify-start text-left font-normal border-[#2563eb]',
              !value && 'text-muted-foreground',
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {displayValue()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {mode === 'range' ? (
            <Calendar
              mode="range"
              selected={internalValue as DateRange}
              onSelect={(_, selectedDay) => {
                handleSelect(selectedDay);
              }}
              numberOfMonths={2}
              initialFocus
              required
            />
          ) : (
            <Calendar
              mode="single"
              selected={internalValue as Date}
              onMonthChange={(month) => {
                setInternalValue(month);
              }}
              month={internalValue as Date}
              onSelect={(date) => {
                setInternalValue(date);
                onChange?.(date);
                setOpen(false);
              }}
              numberOfMonths={1}
              initialFocus
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
