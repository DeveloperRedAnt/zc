'use client';

import { DatePicker } from '@/components/datepicker/date-picker';
import { Skeleton } from '@/components/skeleton/skeleton';
import React from 'react';

type FilterStockOpnameProps = {
  loadingDataStockOpname?: boolean;
  to?: string;
  setTo: (to: string) => void;
  from?: string;
  setFrom: (from: string) => void;
};

export default function FilterStockOpname({
  loadingDataStockOpname = false,
  to,
  setTo,
  from,
  setFrom,
}: FilterStockOpnameProps) {
  return (
    <>
      <div>
        <div className="gap-6 py-6 w-full p-6">
          <div>
            {loadingDataStockOpname ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            ) : (
              <div className="flex flex-row items-end gap-4">
                <div className="w-[280px]">
                  <DatePicker
                    mode="range"
                    label="Jangka Waktu"
                    value={{
                      from: from ? new Date(from) : undefined,
                      to: to ? new Date(to) : undefined,
                    }}
                    placeholder="dd/mm/yyyy - dd/mm/yyyy"
                    onChange={(range) => {
                      if (range && typeof range === 'object' && 'from' in range) {
                        if (range.from && range.to) {
                          setFrom(range.from.toISOString());
                          setTo(range.to.toISOString());
                        }
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
