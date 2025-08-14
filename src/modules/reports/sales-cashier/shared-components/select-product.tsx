'use client';

import { useListProducts } from '@/__generated__/api/hooks/product.hooks';
import { useMemo, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';

type Option = { value: string; label: string };

type Props = {
  label?: string;
  className?: string;
  value?: Option | null;
  onChange?: (option: Option | null) => void;
};

const PAGE_SIZE = 10;

export function ProductDropdown({ label = '', className, value, onChange }: Props) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data: productsResponse, isLoading } = useListProducts({
    body: {
      page,
      per_page: PAGE_SIZE,
      search,
      sort_by: 'name',
      sort_direction: 'asc',
    },
  });

  // Extract products from response
  const products = Array.isArray(productsResponse?.data) ? productsResponse.data : [];

  // Get pagination info
  const pagination = productsResponse?.pagination || {
    current_page: page,
    last_page: 1,
    per_page: PAGE_SIZE,
    total: 0,
  };

  const lastPage = 'last_page' in pagination ? pagination.last_page : pagination.total_pages;

  const options: Option[] = useMemo(
    () =>
      products.map((product) => ({
        value: String(product.id),
        label: product.content
          ? `${product.name} (${product.content})`
          : product.name || `Product ${product.id}`,
      })),
    [products]
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
        placeholder={isLoading ? 'Memuat data...' : 'Semua Produk'}
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
