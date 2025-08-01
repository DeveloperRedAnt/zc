'use client';

import type { OptionType } from '@/components/dropdown/dropdown';
import CustomInput from '@/components/input/custom-input';
import { Skeleton } from '@/components/skeleton/skeleton';
import React, { useEffect, useState } from 'react';

type FilterOrganizationListProps = {
  loadingDataOrganization?: boolean;
  onStatusChange?: (status: OptionType | null) => void;
  onSearch?: (searchTerm: string) => void;
  search?: string;
};

export default function Index({
  loadingDataOrganization = false,
  onSearch,
  search,
}: FilterOrganizationListProps) {
  const [searchInput, setSearchInput] = useState(search);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch?.(searchInput || '');
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, onSearch]);

  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 w-1/2">
          <div>
            {loadingDataOrganization ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            ) : (
              <CustomInput
                label="Cari Organisasi"
                prependIcon="Search"
                placeholder="Cari..."
                className="h-10 w-[220px]"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
