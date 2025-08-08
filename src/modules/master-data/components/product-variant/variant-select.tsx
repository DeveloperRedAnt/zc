'use client';

import { listVariantAttributes } from '@/__generated__/api/client/product.client';
import type { VariantAttributeItem } from '@/__generated__/api/dto/product.dto';

import { useEffect, useState } from 'react';
import type { GroupBase, OptionsOrGroups } from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';

// Define option type for variant attributes
export type VariantAttributeOptionType = {
  label: string;
  value: number;
  data: VariantAttributeItem;
};

// Create a function to load variant attributes
const createLoadOptions = () => {
  return async (
    _search: string,
    prevOptions: OptionsOrGroups<VariantAttributeOptionType, GroupBase<VariantAttributeOptionType>>
  ) => {
    try {
      // Calculate current page based on previous options
      const currentPage = Math.floor(prevOptions.length / 10) + 1;

      const params = {
        page: currentPage,
        per_page: 10,
      };

      const response = await listVariantAttributes(params);

      // Check if response has expected structure
      if (!response || !response.data || !Array.isArray(response.data)) {
        console.error('Invalid response structure:', response);
        return {
          options: [],
          hasMore: false,
        };
      }

      const options: VariantAttributeOptionType[] = response.data.map(
        (attribute: VariantAttributeItem) => {
          return {
            label: attribute.variant_attribute_name,
            value: attribute.id,
            data: attribute,
          };
        }
      );

      // Check if there are more pages available
      const hasMore = response.pagination ? currentPage < response.pagination.last_page : false;

      return {
        options,
        hasMore,
      };
    } catch (error) {
      console.error('Error loading variant attribute options:', error);
      return {
        options: [],
        hasMore: false,
      };
    }
  };
};

type VariantSelectProps = {
  value?: VariantAttributeOptionType | null;
  onChange?: (option: VariantAttributeOptionType | null) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  required?: boolean;
};

export default function VariantSelect({
  value,
  onChange,
  placeholder = 'Pilih Atribut Varian',
  className = '',
  label = 'Atribut Varian',
  required = false,
}: VariantSelectProps) {
  const [isMounted, setIsMounted] = useState(false);

  // Handle client-side hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Create loadOptions function
  const loadOptions = createLoadOptions();

  // Handle selection change
  const handleChange = (option: VariantAttributeOptionType | null) => {
    onChange?.(option);
  };
  return (
    <>
      {label && (
        <div className="mb-2">
          <label className="text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        </div>
      )}
      <div className={`flex items-center ${className}`}>
        <AsyncPaginate
          defaultOptions
          value={isMounted ? value : null}
          loadOptions={loadOptions}
          onChange={handleChange}
          placeholder={placeholder}
          className="min-w-[12rem] w-full"
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
