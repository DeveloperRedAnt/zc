'use client';

import CustomInput from '@/components/input/custom-input';
import { RadioGroup, RadioGroupItem } from '@/components/radio-group/radio-group';
import { useVariantValidation } from '@/modules/products-edit/components/options/hooks/use-variant-validation';
import { useVariantOptionsStore } from '@/modules/products-edit/components/options/stores';
import React, { useRef } from 'react';

export default function VariantSelector({ variants }) {
  const {
    selectedVariantOptions,
    setSelectedVariantOption,
    validationErrors,
    setValidationError,
    clearValidationError,
  } = useVariantOptionsStore();

  const { getAttributeError } = useVariantValidation();

  const customInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  // Hapus error untuk attribute tertentu
  const clearAttributeError = (attributeId: number) => {
    if (validationErrors.attributes?.[attributeId]) {
      const newErrors = { ...validationErrors.attributes };
      delete newErrors[attributeId];
      if (Object.keys(newErrors).length === 0) {
        clearValidationError('attributes');
      } else {
        setValidationError('attributes', newErrors);
      }
    }
  };

  // Handler perubahan pilihan radio
  const handleSelectionChange = (attributeId: number, value: string) => {
    if (value === 'custom') {
      setSelectedVariantOption(attributeId, null, '');
      setTimeout(() => {
        customInputRefs.current[attributeId]?.focus();
      }, 100);
    } else {
      setSelectedVariantOption(attributeId, Number(value), '');
    }
    clearAttributeError(attributeId);
  };

  // Handler perubahan nilai custom input
  const handleCustomValueChange = (attributeId: number, customValue: string) => {
    const currentSelection = selectedVariantOptions[attributeId];
    if (currentSelection?.valueId === null) {
      setSelectedVariantOption(attributeId, null, customValue);
      if (customValue.trim()) clearAttributeError(attributeId);
    }
  };

  return (
    <div className="space-y-12 p-5">
      {variants[0].map((variant, index) => {
        const attributeError = getAttributeError(variant.attribute.id);
        const selectedOption = selectedVariantOptions[variant.attribute.id] ?? {
          valueId: undefined,
          customValue: '',
        };
        const isCustomSelected = selectedOption?.valueId === null;

        return (
          <div key={variant.attribute.id} className="space-y-6">
            <div>
              <h3 className="text-md font-medium text-gray-800 mb-2">Varian {index + 1}:</h3>
              <p className="text-gray-600 text-sm">{variant.attribute.name}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-800 mb-4">
                Pilih Opsi <span className="text-red-500">*</span>
              </h4>

              <RadioGroup
                className="space-y-4"
                value={
                  selectedOption.valueId != null
                    ? selectedOption.valueId.toString()
                    : isCustomSelected
                      ? 'custom'
                      : ''
                }
                onValueChange={(value) => handleSelectionChange(variant.attribute.id, value)}
              >
                {/* Pilihan bawaan */}
                <div className="grid grid-cols-5 gap-4">
                  {variant.attribute.values.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={option.id.toString()}
                        id={`${variant.attribute.id}-${option.id}`}
                        className="text-blue-500"
                      />
                      <label
                        htmlFor={`${variant.attribute.id}-${option.id}`}
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        {option.value}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Opsi custom */}
                {variant.attribute.values.length < 10 && (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="custom"
                        id={`${variant.attribute.id}-custom`}
                        className="text-blue-500"
                      />
                      <label
                        htmlFor={`${variant.attribute.id}-custom`}
                        className="text-sm font-medium text-gray-800 cursor-pointer"
                      >
                        Opsi Baru
                      </label>
                    </div>
                    <div className="ml-6">
                      <CustomInput
                        placeholder="cth: Coklat"
                        className={`max-w-md ${
                          attributeError ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={isCustomSelected ? selectedOption.customValue || '' : ''}
                        onChange={(e) =>
                          handleCustomValueChange(variant.attribute.id, e.target.value)
                        }
                        disabled={!isCustomSelected}
                      />
                    </div>
                  </div>
                )}
              </RadioGroup>

              {/* Error message */}
              {attributeError && <p className="text-red-500 text-sm mt-2">{attributeError}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
