'use client';

import type { VariantAttributeOptionType } from '@/modules/master-data/components/product-variant/variant-select';
import { useEffect, useState } from 'react';
import type { GroupBase, OptionsOrGroups } from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';
import { useProductVariantStore } from '../store';

type SimpleCachedVariantSelectProps = {
  value?: VariantAttributeOptionType | null;
  onChange?: (option: VariantAttributeOptionType | null) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  required?: boolean;
};

export default function SimpleCachedVariantSelect({
  value,
  onChange,
  placeholder = 'Pilih Atribut Varian',
  className = '',
  label = 'Atribut Varian',
  required = false,
}: SimpleCachedVariantSelectProps) {
  const [isMounted, setIsMounted] = useState(false);

  const { variantAttributesLoading, loadVariantAttributes } = useProductVariantStore();

  // Handle client-side hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Simple loadOptions that always calls the store method
  const loadOptions = async (
    search: string,
    prevOptions: OptionsOrGroups<VariantAttributeOptionType, GroupBase<VariantAttributeOptionType>>
  ) => {
    try {
      // Calculate page for pagination
      const page = Math.floor(prevOptions.length / 10) + 1;

      // Always call loadVariantAttributes - let the store handle caching logic
      const options = await loadVariantAttributes(page, search);

      return {
        options,
        hasMore: options.length === 10, // Simple hasMore logic
      };
    } catch (error) {
      console.error('SimpleCachedVariantSelect loadOptions error:', error);
      return {
        options: [],
        hasMore: false,
      };
    }
  };

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
          isLoading={variantAttributesLoading}
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
              // @ts-ignore
              borderColor: state?.isFocused
                ? 'var(--color-zycas-primary)'
                : 'var(--color-gray-300)',
              // @ts-ignore
              boxShadow: state?.isFocused ? '0 0 0 1px var(--color-zycas-primary)' : 'none',
              '&:hover': {
                // @ts-ignore
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
          }}
        />
      </div>
    </>
  );
}
