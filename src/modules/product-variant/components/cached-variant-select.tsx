'use client';

import type { VariantAttributeOptionType } from '@/modules/master-data/components/product-variant/variant-select';
import { useEffect, useState } from 'react';
import type { GroupBase, OptionsOrGroups } from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';
import { useProductVariantStore } from '../store';

type CachedVariantSelectProps = {
  value?: VariantAttributeOptionType | null;
  onChange?: (option: VariantAttributeOptionType | null) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  required?: boolean;
};

export default function CachedVariantSelect({
  value,
  onChange,
  placeholder = 'Pilih Atribut Varian',
  className = '',
  label = 'Atribut Varian',
  required = false,
}: CachedVariantSelectProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    variantAttributes,
    variantAttributesLoading,
    variantAttributesPagination,
    loadVariantAttributes,
  } = useProductVariantStore();

  // Handle client-side hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load initial data if not already loaded
  useEffect(() => {
    if (isMounted && variantAttributes.length === 0 && !variantAttributesLoading) {
      loadVariantAttributes(1);
    }
  }, [isMounted, variantAttributes.length, variantAttributesLoading, loadVariantAttributes]);

  // Debug logging
  useEffect(() => {});

  // Create loadOptions function that uses cached data
  const loadOptions = async (
    search: string,
    prevOptions: OptionsOrGroups<VariantAttributeOptionType, GroupBase<VariantAttributeOptionType>>
  ) => {
    try {
      // Calculate current page for pagination
      const currentPage = Math.floor(prevOptions.length / 10) + 1;

      // If search term changed, reset and load new data
      if (search !== searchTerm) {
        setSearchTerm(search);
        const newOptions = await loadVariantAttributes(1, search);
        return {
          options: newOptions,
          hasMore: variantAttributesPagination.hasMore,
        };
      }

      // For pagination (loading more pages)
      if (!search && currentPage > 1) {
        const newOptions = await loadVariantAttributes(currentPage);
        return {
          options: newOptions,
          hasMore: variantAttributesPagination.hasMore,
        };
      }

      // Initial load or search
      const newOptions = await loadVariantAttributes(currentPage, search);
      return {
        options: newOptions,
        hasMore: variantAttributesPagination.hasMore,
      };
    } catch (error) {
      console.error('Error loading variant attribute options:', error);
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
