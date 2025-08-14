'use client';

import { listStore } from '@/__generated__/api/client';
import type { StoreItem } from '@/__generated__/api/dto';
import {
  type PaginationState,
  type StoreOptionType,
  useStoreFilter,
} from '@/hooks/use-store-filter/use-store-filter';
import { zeroPad } from '@/utils/pad-start';
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
      // Return empty options instead of throwing error to prevent component crash
      return {
        options: [],
        hasMore: false,
      };
    }
  };
};

// Props interface for composable store filter
export interface StoreFilterComposableProps {
  selectedStore?: {
    id: number | string;
    name: string;
  } | null;
  onChangeSelect?: (storeId: number | string | null, store: StoreOptionType | null) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  showLabel?: boolean;
  label?: string;
}

export default function StoreFilterComposable({
  selectedStore,
  onChangeSelect,
  disabled = false,
  placeholder = 'Pilih Toko',
  className,
  showLabel = true,
  label = 'Tampilan Data untuk:',
}: StoreFilterComposableProps) {
  const { addLoadedOptions, loadedOptions } = useStoreFilter();

  // Internal state for the selected value
  const [value, setValue] = useState<StoreOptionType | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Handle client-side hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Create loadOptions function with Zustand integration
  const loadOptions = useCallback(() => createLoadOptions(addLoadedOptions), [addLoadedOptions]);

  // Initialize selected store from props
  useEffect(() => {
    if (!isMounted) return;

    if (!selectedStore) {
      setValue(null);
      return;
    }

    // Check if selected store is already in loaded options
    const existingOption = loadedOptions.find(
      (option) =>
        option.value === selectedStore.id ||
        option.value === Number(selectedStore.id) ||
        option.data?.id === selectedStore.id ||
        option.data?.id === Number(selectedStore.id)
    );

    if (existingOption) {
      setValue(existingOption);
    } else {
      // Create option from provided selectedStore props
      const option: StoreOptionType = {
        label: `#${zeroPad(Number(selectedStore.id), 4)} - ${selectedStore.name}`,
        value: Number(selectedStore.id),
        data: {
          id: Number(selectedStore.id),
          name: selectedStore.name,
        } as StoreItem,
      };
      setValue(option);
    }
  }, [selectedStore, loadedOptions, isMounted]);

  // Handle selection change
  const handleChange = useCallback(
    (option: StoreOptionType | null) => {
      setValue(option);

      // Call parent's onChangeSelect if provided
      if (onChangeSelect) {
        const storeId = option ? option.value : null;
        onChangeSelect(storeId, option);
      }
    },
    [onChangeSelect]
  );

  // Don't render on server-side to avoid hydration mismatch
  if (!isMounted) {
    return (
      <div className={`h-[38px] border border-gray-300 rounded-[8px] px-2 ${className || ''}`} />
    );
  }

  return (
    <div className={`flex items-center ${className || ''}`}>
      {showLabel && <p className="font-semibold mr-2 text-sm flex basis-[380px]">{label}</p>}
      <AsyncPaginate
        defaultOptions
        value={value}
        loadOptions={loadOptions()}
        onChange={handleChange}
        placeholder={placeholder}
        className="min-w-[12rem]"
        isDisabled={disabled}
        isClearable
        noOptionsMessage={({ inputValue }) =>
          inputValue ? `Tidak ditemukan toko "${inputValue}"` : 'Ketik untuk mencari toko'
        }
        loadingMessage={() => 'Memuat...'}
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
            borderColor: state.isFocused ? 'var(--color-zycas-primary)' : 'var(--color-gray-300)',
            boxShadow: state.isFocused ? '0 0 0 1px var(--color-zycas-primary)' : 'none',
            '&:hover': {
              borderColor: state.isFocused ? 'var(--color-zycas-primary)' : 'var(--color-gray-300)',
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
          clearIndicator: (base) => ({
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
}
