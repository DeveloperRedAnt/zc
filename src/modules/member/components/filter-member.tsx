'use client';

import Dropdown from '@/components/dropdown/dropdown';
import type { OptionType } from '@/components/dropdown/dropdown';
import CustomInput from '@/components/input/custom-input';
import React, { useEffect, useState } from 'react';

const optionsStatus: OptionType[] = [
  { label: 'Semua status member', value: 'all' },
  { label: 'Aktif', value: 'active' },
  { label: 'Non-Aktif', value: 'inactive' },
];

export type FilterMemberProps = {
  search: string;
  setSearch: (search: string) => void;
  status: string;
  setStatus: (status: string) => void;
  loadingDataMember?: boolean;
};

export default function FilterMember({
  search: searchParams,
  setSearch,
  status,
  setStatus,
  loadingDataMember = false,
}: FilterMemberProps) {
  const [searchInput, setSearchInput] = useState(searchParams);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput || '');
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput, setSearch]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 w-1/2">
        <div>
          <Dropdown
            label="Filter Status"
            options={optionsStatus}
            value={optionsStatus.find((o) => o.value === status) ?? null}
            onChange={(option) => {
              if (option?.value) setStatus(option.value as string);
            }}
            placeholder="Pilih Status"
            className="mt-2"
            isDisabled={loadingDataMember}
          />
        </div>
        <div>
          <CustomInput
            label="Cari Member"
            prependIcon="Search"
            placeholder="Cari nama atau nomor telepon..."
            className="h-10"
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            value={searchInput}
            disabled={loadingDataMember}
          />
        </div>
      </div>
    </div>
  );
}
