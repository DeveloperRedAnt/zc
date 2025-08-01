'use client';

import Dropdown from '@/components/dropdown/dropdown';
import type { OptionType } from '@/components/dropdown/dropdown';
import CustomInput from '@/components/input/custom-input';
import { type StatusFilter } from '@/modules/user/store';
import React, { useEffect, useState } from 'react';

const optionsStatus: OptionType[] = [
  { label: 'Semua status user', value: 'all' },
  { label: 'Aktif', value: 'active' },
  { label: 'Dicabut', value: 'inactive' },
];

export type FilterUserListProps = {
  search: string;
  setSearch: (search: string) => void;
  status: string;
  setStatus: (status: string) => void;
};

export default function Index({
  search: searchParams,
  setSearch,
  status,
  setStatus,
}: FilterUserListProps) {
  const [searchInput, setSearchInput] = useState(searchParams);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput || '');
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput, setSearch]);

  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 w-1/2">
          <div>
            <Dropdown
              label="Filter Status"
              options={optionsStatus}
              value={optionsStatus.find((o) => o.value === status) ?? null}
              onChange={(option) => {
                if (option?.value) setStatus(option.value as StatusFilter);
              }}
              placeholder="Pilih Status"
              className="mt-2"
            />
          </div>
          <div>
            <CustomInput
              label="Cari User"
              prependIcon="Search"
              placeholder="Cari..."
              className="h-10"
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              value={searchInput}
            />
          </div>
        </div>
      </div>
    </>
  );
}
