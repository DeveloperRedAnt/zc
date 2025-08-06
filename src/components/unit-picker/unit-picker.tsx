'use client';

import { listProductUnits } from '@/__generated__/api/client';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import type { GroupBase, OptionsOrGroups } from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';

// Define the actual API response structure based on provided example
interface ActualUnitListResponse {
  status: string;
  message: string;
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  data: ActualApiUnit[];
}

// Define the actual unit structure from API response
interface ActualApiUnit {
  id: number;
  unit_name: string;
}

export type UnitOptionType = {
  value: number;
  label: string;
  data: ActualApiUnit;
};

interface UnitPickerProps {
  value?: UnitOptionType | null;
  onChange?: (option: UnitOptionType | null) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  required?: boolean;
}

// Create a function that handles the API call
const createLoadOptions = () => {
  return async (
    search: string,
    prevOptions: OptionsOrGroups<UnitOptionType, GroupBase<UnitOptionType>>
  ) => {
    try {
      // Calculate current page based on previous options
      const currentPage = Math.floor(prevOptions.length / 10) + 1;

      const params = {
        page: currentPage,
        per_page: 10,
        search: search || undefined,
      };

      const response = (await listProductUnits(params)) as ActualUnitListResponse;

      // Check if response has expected structure
      if (!response || !response.data || !Array.isArray(response.data)) {
        return {
          options: [],
          hasMore: false,
        };
      }

      const options: UnitOptionType[] = response.data.map((unit: ActualApiUnit) => ({
        label: unit.unit_name,
        value: unit.id,
        data: unit,
      }));

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

const UnitPicker = memo(function UnitPicker({
  value,
  onChange,
  placeholder = 'Pilih Unit',
  className = '',
  label,
  required = false,
}: UnitPickerProps) {
  const [isClient, setIsClient] = useState(false);

  // Set required headers in localStorage for API calls and handle client-side hydration
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('x-device-id', '1');
      localStorage.setItem('x-organization-id', '1');
    }
  }, []);

  // Create loadOptions function
  const loadOptions = useMemo(() => createLoadOptions(), []);

  // Handle selection change
  const handleChange = useCallback(
    (option: UnitOptionType | null) => {
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

export default UnitPicker;
