'use client';

import { useGetVariantProductList } from '@/__generated__/api/hooks/reports/sales-variant.hooks';
import React, { useState, useMemo } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';

type Option = { value: string; label: string };

type Props = {
  label?: string;
  className?: string;
  value?: Option | null;
  onChange?: (option: Option | null) => void;
};

const PAGE_SIZE = 10;

export function VariantDropdown({ label = '', className, value, onChange }: Props) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data: variantResponse, isLoading } = useGetVariantProductList({
    page,
    per_page: PAGE_SIZE,
    search,
  });

  // Extract products from response
  const variants = Array.isArray(variantResponse?.data) ? variantResponse.data : [];

  // Get pagination info
  const pagination = variantResponse?.pagination || {
    current_page: page,
    last_page: 1,
    per_page: PAGE_SIZE,
    total: 0,
  };

  const lastPage = pagination.last_page;

  const options: Option[] = useMemo(
    () =>
      variants.map((variant) => ({
        value: String(variant.id),
        label:
          variant.product_name && variant.variant_name
            ? `${variant.product_name} - ${variant.variant_name}`
            : variant.product_name || variant.variant_name || '-',
      })),
    [variants]
  );

  const handleMenuOpen = () => {
    if (page === null) setPage(1);
  };

  const handleLoadOptions = async (
    inputValue: string,
    _unused: unknown,
    additional?: { page: number }
  ) => {
    setSearch(inputValue);
    setPage(additional?.page ?? 1);

    return {
      options,
      hasMore: pagination.current_page < lastPage,
      additional: {
        page: pagination.current_page + 1,
      },
    };
  };

  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <AsyncPaginate
        value={value}
        loadOptions={handleLoadOptions}
        additional={{ page: 1 }}
        options={options}
        placeholder={isLoading ? 'Memuat data...' : 'Semua Varian'}
        isClearable
        onChange={onChange}
        getOptionValue={(option) => option.value}
        getOptionLabel={(option) => option.label}
        debounceTimeout={300}
        classNamePrefix="react-select"
        className="w-full rounded-md h-13"
        isLoading={isLoading}
        onMenuOpen={handleMenuOpen}
        styles={{
          control: (provided) => ({
            ...provided,
            minHeight: '52px',
            borderRadius: '8px',
          }),
        }}
      />
    </div>
  );
}
