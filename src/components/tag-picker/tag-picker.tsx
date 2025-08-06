'use client';

import { listProductTags } from '@/__generated__/api/client/product.client';
import React, { useCallback, useMemo, useState } from 'react';
import type { MultiValue } from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';

// Types for the API response
export interface ActualTagListResponse {
  status: string;
  message: string;
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  data: ActualApiTag[];
}

export interface ActualApiTag {
  id: number;
  name: string;
}

// Type for the select option format
export interface TagOptionType {
  label: string;
  value: string;
  data: ActualApiTag;
}

interface TagPickerProps {
  value?: readonly TagOptionType[] | null;
  onChange?: (value: readonly TagOptionType[] | null) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  required?: boolean;
  isLoading?: boolean;
}

const TagPicker: React.FC<TagPickerProps> = React.memo(
  ({
    value,
    onChange,
    placeholder = 'Pilih tag',
    className = '',
    label,
    required = false,
    isLoading: externalLoading = false,
  }) => {
    const [isClient, setIsClient] = useState(false);

    React.useEffect(() => {
      setIsClient(true);
    }, []);

    const loadOptions = useCallback(
      async (search: string, _loadedOptions: unknown, additional?: { page: number }) => {
        const page = additional?.page || 1;
        try {
          // Get headers from localStorage (similar to how other components do it)
          const deviceId = localStorage.getItem('x-device-id') || '';
          const storeId = localStorage.getItem('x-store-id') || '';
          const organizationId = localStorage.getItem('x-organization-id') || '';

          const response: ActualTagListResponse = await listProductTags({
            'x-device-id': deviceId,
            'x-store-id': storeId,
            'x-organization-id': organizationId,
            page,
            per_page: 10,
            search: search || undefined,
          });

          const options: TagOptionType[] = response.data.map((tag) => ({
            label: tag.name,
            value: tag.id.toString(),
            data: tag,
          }));

          return {
            options,
            hasMore: response.pagination.current_page < response.pagination.last_page,
            additional: {
              page: page + 1,
            },
          };
        } catch (error) {
          console.error('Error loading tags:', error);
          return {
            options: [],
            hasMore: false,
            additional: {
              page: 1,
            },
          };
        }
      },
      []
    );

    const handleChange = useCallback(
      (selectedOptions: MultiValue<TagOptionType>) => {
        onChange?.(selectedOptions as readonly TagOptionType[]);
      },
      [onChange]
    );

    const selectStyles = useMemo(
      () => ({
        control: (provided: Record<string, unknown>, state: { isFocused: boolean }) => ({
          ...provided,
          minHeight: '40px',
          borderColor: state.isFocused ? '#3B82F6' : '#C2C7D0',
          boxShadow: state.isFocused ? '0 0 0 1px #3B82F6' : 'none',
          '&:hover': {
            borderColor: state.isFocused ? '#3B82F6' : '#9CA3AF',
          },
        }),
        multiValue: (provided: Record<string, unknown>) => ({
          ...provided,
          backgroundColor: 'transparent',
          border: '1px solid #E5E7EB',
          borderRadius: '4px',
          padding: '4px 4px',
          margin: '2px',
          fontSize: '14px',
        }),
        multiValueLabel: (provided: Record<string, unknown>) => ({
          ...provided,
          color: '#374151',
          fontSize: '14px',
          fontWeight: '400',
          padding: '0 4px 0 0',
        }),
        multiValueRemove: (provided: Record<string, unknown>) => ({
          ...provided,
          color: '#6B7280',
          cursor: 'pointer',
          backgroundColor: 'transparent',
          borderRadius: '4px',
          width: '20px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          '&:hover': {
            backgroundColor: '#F3F4F6',
            borderColor: '#9CA3AF',
          },
        }),
        placeholder: (provided: Record<string, unknown>) => ({
          ...provided,
          color: '#9CA3AF',
          fontSize: '14px',
        }),
        option: (
          provided: Record<string, unknown>,
          state: { isSelected: boolean; isFocused: boolean }
        ) => ({
          ...provided,
          backgroundColor: state.isSelected ? '#3B82F6' : state.isFocused ? '#EFF6FF' : 'white',
          color: state.isSelected ? 'white' : '#374151',
          '&:hover': {
            backgroundColor: state.isSelected ? '#3B82F6' : '#EFF6FF',
          },
        }),
      }),
      []
    );

    // SSR safety - render nothing on server
    if (!isClient) {
      return (
        <div className={className}>
          {label && (
            <label className="block mb-2 text-sm font-medium">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          )}
          <div className="h-[40px] border border-gray-300 rounded-md bg-gray-50" />
        </div>
      );
    }

    return (
      <div className={className}>
        {label && (
          <label className="block mb-2 text-sm font-medium">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <AsyncPaginate
          value={value}
          onChange={handleChange}
          loadOptions={loadOptions}
          placeholder={placeholder}
          isMulti={true}
          isLoading={externalLoading}
          styles={selectStyles}
          additional={{
            page: 1,
          }}
          debounceTimeout={300}
          noOptionsMessage={({ inputValue }) =>
            inputValue
              ? `Tidak ada tag yang ditemukan untuk "${inputValue}"`
              : 'Ketik untuk mencari tag'
          }
          loadingMessage={() => 'Memuat tag...'}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          isClearable={true}
          isSearchable={true}
        />
      </div>
    );
  }
);

TagPicker.displayName = 'TagPicker';

export default TagPicker;
