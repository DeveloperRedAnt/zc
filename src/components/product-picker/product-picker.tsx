'use client';

import { listProducts } from '@/__generated__/api/client';
import type { ProductSchema } from '@/__generated__/api/dto';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import type { GroupBase, OptionsOrGroups } from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';

// Define the actual API response structure based on real API response
interface ActualProductListResponse {
  code: number;
  status: string;
  name: string;
  message: string;
  data: ActualApiProduct[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

// Define the actual product structure from API response
interface ActualApiProduct {
  id: number;
  type: string;
  is_favorite: boolean;
  thumbnail: string | null;
  name: string | null;
  package: string | null;
  content: string | null;
  current_stock: string;
  maximum_retail_price: string;
  is_active: boolean;
  variants: unknown[];
}

export type ProductOptionType = {
  value: number;
  label: string;
  data: ActualApiProduct;
};

interface ProductPickerProps {
  value?: ProductOptionType | null;
  onChange?: (option: ProductOptionType | null) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  required?: boolean;
}

// Create a function that handles the API call
const createLoadOptions = () => {
  return async (
    search: string,
    prevOptions: OptionsOrGroups<ProductOptionType, GroupBase<ProductOptionType>>
  ) => {
    try {
      // Calculate current page based on previous options
      const currentPage = Math.floor(prevOptions.length / 10) + 1;

      const params: ProductSchema = {
        page: currentPage,
        per_page: 10,
        search: search || undefined,
        sort_by: 'brand',
        sort_direction: 'asc' as const,
        status: 'Aktif', // Only show active products
      };

      const response = (await listProducts(params)) as unknown as ActualProductListResponse;

      // Check if response has expected structure
      if (!response || !response.data || !Array.isArray(response.data)) {
        return {
          options: [],
          hasMore: false,
        };
      }

      const options: ProductOptionType[] = response.data.map((product: ActualApiProduct) => {
        // Handle the actual API response structure
        const productName = product.name || `Nama Product - ${product.id}`;
        const packageInfo = product.package ? ` - ${product.package}` : '';
        const contentInfo = product.content ? ` (${product.content})` : '';

        return {
          label: `${productName}${packageInfo}${contentInfo}`,
          value: product.id,
          data: product,
        };
      });

      // Check if there are more pages available
      const hasMore = response.pagination ? currentPage < response.pagination.last_page : false;

      return {
        options,
        hasMore,
      };
    } catch (_error) {
      return {
        options: [],
        hasMore: false,
      };
    }
  };
};

const ProductPicker = memo(function ProductPicker({
  value,
  onChange,
  placeholder = 'Pilih Produk',
  className = '',
  label,
  required = false,
}: ProductPickerProps) {
  const [isClient, setIsClient] = useState(false);

  // Set required headers in localStorage for API calls and handle client-side hydration
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('x-device-id', '1');
      localStorage.setItem('x-store-id', '1');
      localStorage.setItem('x-organization-id', '1');
    }
  }, []);

  // Create loadOptions function
  const loadOptions = useMemo(() => createLoadOptions(), []);

  // Handle selection change
  const handleChange = useCallback(
    (option: ProductOptionType | null) => {
      if (onChange) {
        onChange(option);
      }
    },
    [onChange]
  );

  return (
    <div className={className}>
      {label && (
        <label className="block mb-1 text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <AsyncPaginate
        defaultOptions
        value={isClient ? value : null}
        loadOptions={loadOptions}
        onChange={handleChange}
        placeholder={placeholder}
        className="min-w-[16rem]"
        styles={{
          container: (base) => ({
            ...base,
            width: '100%',
            fontSize: '14px',
          }),
          control: (base, state) => ({
            ...base,
            minHeight: '38px',
            height: '38px',
            backgroundColor: 'white',
            borderRadius: '8px',
            // @ts-ignore - state mungkin tidak sesuai tipe secara tepat tapi aman digunakan
            borderColor: state?.isFocused ? 'var(--color-zycas-primary)' : 'var(--color-gray-300)',
            // @ts-ignore - state mungkin tidak sesuai tipe secara tepat tapi aman digunakan
            boxShadow: state?.isFocused ? '0 0 0 1px var(--color-zycas-primary)' : 'none',
            '&:hover': {
              // @ts-ignore - state mungkin tidak sesuai tipe secara tepat tapi aman digunakan
              borderColor: state?.isFocused
                ? 'var(--color-zycas-primary)'
                : 'var(--color-gray-300)',
            },
            fontSize: '14px',
          }),
          valueContainer: (base) => ({
            ...base,
            padding: '0 8px',
            marginTop: '-2px',
            fontSize: '14px',
          }),
          input: (base) => ({
            ...base,
            margin: '0px',
            color: 'black',
            fontSize: '14px',
          }),
          indicatorsContainer: (base) => ({
            ...base,
            height: '38px',
          }),
          dropdownIndicator: (base) => ({
            ...base,
            padding: '0 8px',
          }),
          menu: (base) => ({
            ...base,
            fontSize: '14px',
            zIndex: 50,
          }),
          option: (base) => ({
            ...base,
            fontSize: '14px',
            padding: '8px 12px',
          }),
          singleValue: (base) => ({
            ...base,
            fontSize: '14px',
          }),
          multiValue: (base) => ({
            ...base,
            fontSize: '14px',
          }),
          multiValueLabel: (base) => ({
            ...base,
            fontSize: '14px',
          }),
        }}
      />
    </div>
  );
});

export default ProductPicker;
