'use client';

import { InformationText } from '@/components/information-text/information-text';
import CustomInput from '@/components/input/custom-input';
import InputFile from '@/components/input/input-file';
import { Text } from '@/components/text/text';
import VariantOptionsList from '@/components/variant-options-list/variant-options-list';
import VariantSelector from '@/components/variant-selector/variant-selector';
import { MultiUnitPrice } from '@/modules/product-variant/components/variant-options/multi-unit-price';
import { useVariantOptionsStore } from '@/modules/products-edit/components/options/stores';
import React from 'react';

const FormAddVariant = ({ checkEditVariant }) => {
  const { setThumbnail, variantOptionsData, updateVariantOptionsData, minStock, setMinStock } =
    useVariantOptionsStore();

  const handleInputChange = (
    field: 'file' | 'barcode' | 'sku' | 'minStock',
    inputValue: string | number | File | null
  ) => {
    switch (field) {
      case 'file':
        setThumbnail(inputValue instanceof File ? inputValue : null);
        break;
      case 'barcode':
        updateVariantOptionsData('barcode', inputValue as string);
        break;
      case 'sku':
        updateVariantOptionsData('sku_code', inputValue as string);
        break;
      case 'minStock':
        setMinStock(Number(inputValue));
        break;
    }
  };

  return (
    <div>
      <VariantOptionsList options={checkEditVariant.combinations} />

      <div className="flex gap-2">
        <div className="w-full p-5">
          <InputFile
            label="Unggah Thumbnail"
            accept="image/*"
            onChange={(e) => {
              handleInputChange('file', e as File);
            }}
          />
        </div>
      </div>

      <VariantSelector variants={[checkEditVariant.attribute_variant_options]} />

      <div className="py-6 border-b-gray-200 border-t-gray-200 px-4">
        <p className="font-medium"> Informasi Produk </p>
        <div className="w-full py-5 flex flex-row gap-2">
          <div className="w-1/2">
            <CustomInput
              label="Barcode"
              placeholder="cth: 1199922838920"
              isWidthFull
              value={variantOptionsData.barcode}
              onChange={(e) => {
                handleInputChange('barcode', e.target.value);
              }}
            />
          </div>
          <div className="w-1/2">
            <CustomInput
              label="SKU"
              placeholder="cth: 782217821"
              isWidthFull
              value={variantOptionsData.sku_code}
              onChange={(e) => {
                handleInputChange('sku', e.target.value);
              }}
            />
          </div>
        </div>
        <div className="w-full py-5 flex flex-col">
          <div className="flex flex-col gap-2">
            <Text size="md" className="font-semibold text-[#555555]">
              Peringatan Stok Minimum
            </Text>
            <InformationText text="Penentuan peringatan minimum sebelum stok produk habis" />
            <CustomInput
              appendText="Produk"
              inputNumber
              placeholder="0"
              value={minStock}
              onChange={(e) => {
                handleInputChange('minStock', Number(e.target.value));
              }}
            />
          </div>
        </div>
      </div>

      <MultiUnitPrice />
    </div>
  );
};

export default FormAddVariant;
