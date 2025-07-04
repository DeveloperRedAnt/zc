'use client';

import type { OptionType } from '@/components/dropdown/dropdown';
import CustomInput from '@/components/input/custom-input';
import { Skeleton } from '@/components/skeleton/skeleton';
import React from 'react';

type FilterOrganizationListProps = {
  loadingDataProduct?: boolean;
  onStatusChange?: (status: OptionType | null) => void;
  onSearch?: (searchTerm: string) => void;
};

export default function Index({ loadingDataProduct = false }: FilterOrganizationListProps) {
  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 w-1/2">
          <div>
            {loadingDataProduct ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            ) : (
              <CustomInput
                label="Cari Organisasi"
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
