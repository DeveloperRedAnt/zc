'use client';

import type { OptionType } from '@/components/dropdown/dropdown';
import CustomInput from '@/components/input/custom-input';
import { Skeleton } from '@/components/skeleton/skeleton';
import React from 'react';

type FilterStoreListProps = {
  loadingDataStore?: boolean;
  onStatusChange?: (status: OptionType | null) => void;
  onSearch?: (searchTerm: string) => void;
};

export default function Index({ loadingDataStore = false }: FilterStoreListProps) {
  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 w-1/2">
          <div>
            {loadingDataStore ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            ) : (
              <CustomInput
                label="Cari Toko"
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
