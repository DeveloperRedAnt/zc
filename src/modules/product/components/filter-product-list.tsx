'use client';

import { ProductSchema } from '@/__generated__/api/dto';
import Dropdown from '@/components/dropdown/dropdown';
import type { OptionType } from '@/components/dropdown/dropdown';
import CustomInput from '@/components/input/custom-input';
import { Skeleton } from '@/components/skeleton/skeleton';
import React, { useState, useEffect } from 'react';

const optionsStatus: OptionType[] = [
  { label: 'Semua status produk', value: '' }, // Changed to empty string for "all"
  { label: 'Aktif', value: 'Aktif' },
  { label: 'Non-Aktif', value: 'Non Aktif' },
];

type FilterProductListProps = {
  loadingDataProduct?: boolean;
  onFilterChange: (filters: Partial<ProductSchema>) => void;
  currentFilters: ProductSchema;
};

export default function FilterProductList({
  loadingDataProduct = false,
  onFilterChange,
  currentFilters,
}: FilterProductListProps) {
  const [selectedStatus, setSelectedStatus] = useState<OptionType | null>(
    optionsStatus[0] as OptionType // Default to "Semua status produk"
  );
  const [searchTerm, setSearchTerm] = useState<string>(currentFilters.search || '');

  // Update local state when currentFilters change
  useEffect(() => {
    setSearchTerm(currentFilters.search || '');

    // Find matching status option
    const statusOption = optionsStatus.find(
      (option) => option.value === (currentFilters.status || '')
    );
    setSelectedStatus(statusOption ?? optionsStatus[0] ?? null);
  }, [currentFilters]);

  // Handle status change
  const handleStatusChange = (option: OptionType | null) => {
    setSelectedStatus(option);
    onFilterChange({
      status: option?.value === '' ? undefined : (option?.value as 'Aktif' | 'Non Aktif'),
    });
  };

  // Handle search change with debounce
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onFilterChange({
        search: searchTerm || undefined,
      });
    }, 500); // 500ms debounce

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, onFilterChange]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 w-full md:w-1/2">
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
              onChange={handleStatusChange}
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
