'use client';

import { listStore } from '@/__generated__/api/client';
import type { StoreItem } from '@/__generated__/api/dto';
import {
  type PaginationState,
  type StoreOptionType,
  useStoreFilter,
} from '@/hooks/use-store-filter/use-store-filter';
import { useEffect, useState } from 'react';
import type { GroupBase, OptionsOrGroups } from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';

// Define the actual API response structure
interface ActualStoreListResponse {
  code: number;
  status: string;
  name: string;
  message: string;
  data: StoreItem[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

// Use the type from the Zustand store
export type { StoreOptionType as OptionType } from '@/hooks/use-store-filter/use-store-filter';

// Create a function that has access to the Zustand store
const createLoadOptions = (
  addLoadedOptions: (
    options: StoreOptionType[],
    pagination: PaginationState,
    search: string
  ) => void
) => {
  return async (
    search: string,
    prevOptions: OptionsOrGroups<StoreOptionType, GroupBase<StoreOptionType>>
  ) => {
    try {
      // Calculate current page based on previous options
      const currentPage = Math.floor(prevOptions.length / 10) + 1;

      const params = {
        'x-device-id': '1',
        'x-store-id': '1',
        'x-organization-id': '1',
        body: {
          page: currentPage,
          per_page: 10,
          search: search || undefined,
          sort_by: 'name',
          sort_direction: 'asc' as const,
        },
      };

      const response = (await listStore(params)) as unknown as ActualStoreListResponse;

      // Check if response has expected structure
      if (!response || !response.data || !Array.isArray(response.data)) {
        console.error('Invalid response structure:', response);
        return {
          options: [],
          hasMore: false,
        };
      }

      const options: StoreOptionType[] = response.data.map((store: StoreItem) => {
        return {
          label: `#${store.id} - ${store.name}`,
          value: store.id,
          data: store,
        };
      });

      // Save to Zustand store
      addLoadedOptions(options, response.pagination, search || '');

      // Check if there are more pages available
      const hasMore = response.pagination ? currentPage < response.pagination.last_page : false;

      return {
        options,
        hasMore,
      };
    } catch (error) {
      console.error('Error loading store options:', error);
      return {
        options: [],
        hasMore: false,
      };
    }
  };
};

export default function StoreFilter() {
  const { selectedStore, setSelectedStore, addLoadedOptions } = useStoreFilter();

  const [value, onChange] = useState<StoreOptionType | null>(null);
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

  // Sync local state with Zustand store after client hydration
  useEffect(() => {
    if (isClient) {
      onChange(selectedStore);
    }
  }, [selectedStore, isClient]);

  // Create loadOptions function with Zustand integration
  const loadOptions = createLoadOptions(addLoadedOptions);

  // Handle selection change
  const handleChange = (option: StoreOptionType | null) => {
    onChange(option);
    setSelectedStore(option);

    // Set x-store-id in both localStorage and cookies when store is selected
    if (isClient && option) {
      const storeId = option.value.toString();

      // Set in localStorage
      localStorage.setItem('x-store-id', storeId);

      // Set in cookies
      document.cookie = `x-store-id=${storeId}; path=/; max-age=${60 * 60 * 24 * 30}`; // 30 days;
    } else if (isClient && !option) {
      // Clear x-store-id when no store is selected
      localStorage.setItem('x-store-id', '1'); // Default value
      document.cookie = `x-store-id=1; path=/; max-age=${60 * 60 * 24 * 30}`; // 30 days;
    }
  };

  return (
    <>
      <div className="flex items-center">
        <p className="font-semibold mr-2 text-sm flex basis-[380px]"> Tampilan Data untuk: </p>
        <AsyncPaginate
          defaultOptions
          value={isClient ? value : null}
          loadOptions={loadOptions}
          onChange={handleChange}
          placeholder="Pilih Toko"
          className="min-w-[12rem]"
          styles={{
            container: (base) => ({
              ...base,
              width: '100%',
              fontSize: '14px',
            }),
            control: (base, state) => ({
              ...base,
              minHeight: '40px',
              height: '40px',
              backgroundColor: 'white',
              borderRadius: '8px',
              // @ts-ignore - state mungkin tidak sesuai tipe secara tepat tapi aman digunakan
              borderColor: state?.isFocused
                ? 'var(--color-zycas-primary)'
                : 'var(--color-gray-300)',
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
              height: '40px',
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
    </>
  );
}
