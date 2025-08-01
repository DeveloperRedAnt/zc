'use client';

import { DatePicker } from '@/components/datepicker/date-picker';
import type { OptionType } from '@/components/dropdown/dropdown';
import Dropdown from '@/components/dropdown/dropdown';
import CustomInput from '@/components/input/custom-input';
import { Skeleton } from '@/components/skeleton/skeleton';
import React, { useState, useMemo, useEffect } from 'react';

type FilterVoucherListProps = {
  loadingDataVoucher?: boolean;
  search?: string;
  setSearch: (searchTerm: string) => void;
  status?: string;
  setStatus?: (status: string) => void;
  to?: string;
  setTo: (to: string) => void;
  from?: string;
  setFrom: (from: string) => void;
};

export default function Index({
  loadingDataVoucher = false,
  search,
  setSearch,
  status,
  setStatus,
  to,
  setTo,
  from,
  setFrom,
}: FilterVoucherListProps) {
  const optionsStatus: OptionType[] = [
    { label: 'Semua status voucher', value: 'all' },
    { label: 'Aktif', value: 'active' },
    { label: 'Tidak Aktif', value: 'inactive' },
  ];
  const [searchInput, setSearchInput] = useState(search);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput || '');
    }, 500);

    return () => clearTimeout(timer);
  }, [setSearch, searchInput]);

  const selectedStatus = useMemo(
    () => optionsStatus.find((option) => option.value === status),
    [status]
  );

  return (
    <>
      <div>
        <div className="gap-6 py-6 w-full p-6">
          <div>
            {loadingDataVoucher ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            ) : (
              <div className="flex flex-row items-end gap-4">
                <Dropdown
                  label="Filter Status"
                  options={optionsStatus}
                  value={selectedStatus || { label: 'Semua status voucher', value: 0 }}
                  onChange={(option) => {
                    if (option && setStatus) {
                      setStatus(String(option.value));
                    }
                  }}
                  placeholder="Pilih Status Voucher"
                  classDiv="mb-0"
                />
                <div className="w-[249px]">
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
                <CustomInput
                  label="Cari Voucher"
                  prependIcon="Search"
                  placeholder="Cari..."
                  className="h-10"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
