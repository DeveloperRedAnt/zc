'use client';

import { listStore } from '@/__generated__/api/client';
import type { StoreItem } from '@/__generated__/api/dto';
import {
  type PaginationState,
  type StoreOptionType,
  useStoreFilter,
} from '@/hooks/use-store-filter/use-store-filter';
import { zeroPad } from '@/utils/pad-start';
import { invalidateStoreQueries } from '@/utils/store-query-invalidation';
import { useQueryClient } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';
import { useCallback, useEffect, useState } from 'react';
import type { GroupBase, OptionsOrGroups } from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';

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
        page: currentPage,
        per_page: 10,
        search: search || undefined,
        sort_by: 'name',
        sort_direction: 'asc' as const,
      };

      const response = await listStore(params);

      // Check if response is a direct array or has data property
      let storeData: StoreItem[];
      let metaData: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
      } | null = null;

      if (Array.isArray(response)) {
        // Direct array response
        storeData = response;
      } else if (response?.data && Array.isArray(response.data)) {
        // Object with data property
        storeData = response.data;
        metaData = response.meta;
      } else {
        console.error('Invalid response structure:', response);
        return {
          options: [],
          hasMore: false,
        };
      }

      const options: StoreOptionType[] = storeData.map((store: StoreItem) => {
        return {
          label: `#${zeroPad(store.id, 4)} - ${store.name}`,
          value: store.id,
          data: store,
        };
      });

      // Add "Semua Toko" option at the beginning if it's the first page and no search
      if (currentPage === 1 && !search) {
        options.unshift({
          label: 'Semua Toko',
          value: 0,
          data: {
            id: 0,
            name: 'Semua Toko',
            // Add other required properties with default values
            address: '',
            phone: '',
            email: '',
            lat: 0,
            long: 0,
            image: '',
            type: '',
            category: '',
          } as unknown as StoreItem,
        });
      }

      // Save to Zustand store - handle pagination
      let paginationState: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
      };
      let hasMore = false;

      if (metaData) {
        // Object response with meta
        paginationState = {
          current_page: metaData.current_page,
          last_page: metaData.last_page,
          per_page: metaData.per_page,
          total: metaData.total,
        };
        hasMore = currentPage < metaData.last_page;
      } else {
        // Direct array response - assume single page
        paginationState = {
          current_page: 1,
          last_page: 1,
          per_page: storeData.length,
          total: storeData.length,
        };
        hasMore = false;
      }

      addLoadedOptions(options, paginationState, search || '');

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

export type StoreFilterProps = {
  disabled?: boolean;
  organizationId?: string;
};

export default function StoreFilter({ disabled }: StoreFilterProps) {
  const { setSelectedStore, addLoadedOptions, selectedStore } = useStoreFilter();
  const queryClient = useQueryClient();

  // Use nuqs for URL query state management
  const [_page, setPage] = useQueryState('page', { defaultValue: '1' });

  const [value, onChange] = useState<StoreOptionType | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Helper function to get cookie value
  const getCookie = useCallback((name: string): string | null => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }, []);

  // Set required headers in localStorage for API calls and handle client-side hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load selected store from cookies/localStorage on mount
  useEffect(() => {
    if (!isMounted) return;

    // First, try to get from Zustand store (which persists to localStorage)
    if (selectedStore) {
      onChange(selectedStore);
      return;
    }

    // If not in Zustand store, try to get from cookies
    const cookieStoreId = getCookie('x-store-id');
    const localStorageStoreId = localStorage.getItem('x-store-id');

    const storeIdToLoad = cookieStoreId || localStorageStoreId;

    if (storeIdToLoad && storeIdToLoad !== '1') {
      // Handle "Semua Toko" option (ID 0)
      if (storeIdToLoad === '0') {
        const semuaTokoOption: StoreOptionType = {
          label: 'Semua Toko',
          value: 0,
          data: {
            id: 0,
            name: 'Semua Toko',
            address: '',
            phone: '',
            email: '',
            lat: 0,
            long: 0,
            image: '',
            type: '',
            category: '',
          } as unknown as StoreItem,
        };

        onChange(semuaTokoOption);
        setSelectedStore(semuaTokoOption);
        return;
      }

      // Load the store data from API to reconstruct the option
      const loadStoreFromId = async (storeId: string) => {
        try {
          const response = await listStore({
            page: 1,
            per_page: 100,
            sort_by: 'name',
            sort_direction: 'asc' as const,
          });

          let storeData: StoreItem[];
          if (Array.isArray(response)) {
            storeData = response;
          } else if (response?.data && Array.isArray(response.data)) {
            storeData = response.data;
          } else {
            return;
          }

          const foundStore = storeData.find((store) => store.id.toString() === storeId);
          if (foundStore) {
            const storeOption: StoreOptionType = {
              label: `#${zeroPad(foundStore.id, 4)} - ${foundStore.name}`,
              value: foundStore.id,
              data: foundStore,
            };

            onChange(storeOption);
            setSelectedStore(storeOption);
          }
        } catch (error) {
          console.error('Error loading store from cookie:', error);
        }
      };

      loadStoreFromId(storeIdToLoad);
    }
  }, [isMounted, selectedStore, setSelectedStore, getCookie]);

  // Create loadOptions function with Zustand integration
  const loadOptions = createLoadOptions(addLoadedOptions);

  // Handle selection change with useCallback to prevent rerenders
  const handleChange = useCallback(
    (option: StoreOptionType | null) => {
      onChange(option);
      setSelectedStore(option);

      if (!isMounted) return;

      // Determine store ID
      const storeId = option ? option.value.toString() : '1';

      // Set in localStorage and cookies
      localStorage.setItem('x-store-id', storeId);
      document.cookie = `x-store-id=${storeId}; path=/; max-age=${60 * 60 * 24 * 30}`; // 30 days

      // Reset page to 1 via nuqs
      setPage('1');

      // Simple query invalidation
      invalidateStoreQueries(queryClient, storeId);
    },
    [isMounted, setSelectedStore, setPage, queryClient]
  );

  return (
    <>
      <div className="flex items-center">
        <p className="font-semibold mr-2 text-sm flex basis-[380px]"> Tampilan Data untuk: </p>
        {isMounted ? (
          <AsyncPaginate
            defaultOptions
            value={value}
            loadOptions={loadOptions}
            onChange={handleChange}
            placeholder="Pilih Toko"
            className="min-w-[12rem]"
            isDisabled={disabled}
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
        ) : (
          <div className="min-w-[12rem] h-[40px] bg-gray-100 animate-pulse rounded" />
        )}
      </div>
    </>
  );
}
