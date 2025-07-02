'use client';

import Dropdown from '@/components/dropdown/dropdown';
import type { OptionType } from '@/components/dropdown/dropdown';
import CustomInput from '@/components/input/custom-input';
import { Skeleton } from '@/components/skeleton/skeleton';
import React, { useState } from 'react';

const optionsStatus: OptionType[] = [
  { label: 'Semua status produk', value: 1 },
  { label: 'Aktif', value: 2 },
  { label: 'Non-Aktif', value: 3 },
];

type FilterProductListProps = {
  loadingDataProduct?: boolean;
  onStatusChange?: (status: OptionType | null) => void;
  onSearch?: (searchTerm: string) => void;
};

export default function Index({ loadingDataProduct = false }: FilterProductListProps) {
  const [selectedStatus, setSelectedStatus] = useState<OptionType | null>({
    label: 'Semua status produk',
    value: 1,
  });

  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 w-1/2">
          <div>
            {loadingDataProduct ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            ) : (
              <Dropdown
                label="Filter Status"
                options={optionsStatus}
                value={selectedStatus}
                onChange={setSelectedStatus}
                placeholder="Pilih Status"
                className="mt-2"
              />
            )}
          </div>
          <div>
            {loadingDataProduct ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            ) : (
              <CustomInput
                label="Cari Produk"
                prependIcon="Search"
                placeholder="Cari..."
                className="h-10"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
