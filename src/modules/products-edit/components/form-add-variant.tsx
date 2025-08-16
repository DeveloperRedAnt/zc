'use client';

import { InformationText } from '@/components/information-text/information-text';
import CustomInput from '@/components/input/custom-input';
import InputFile from '@/components/input/input-file';
import { Text } from '@/components/text/text';
import VariantOptionsList from '@/components/variant-options-list/variant-options-list';
import VariantSelector from '@/components/variant-selector/variant-selector';
import { MultiUnitPrice } from '@/modules/product-variant/components/variant-options/multi-unit-price';
import type { FormattedData } from '@/modules/product-variant/types';
import React, { useState, useEffect } from 'react';

export type ProductCardValue = {
  file: string;
  barcode: string;
  sku: string;
  minStock: number;
};

type ProductCardListProps = {
  formattedData: FormattedData;
  onChange?: (values: ProductCardValue) => void; // Changed from array to single value
  errors?: { [field: string]: string };
};

const DetailVariantList = ({ formattedData, onChange, errors = {} }: ProductCardListProps) => {
  const [cardValue, setCardValue] = useState<ProductCardValue>({
    file: formattedData.thumbnail || '',
    barcode: formattedData.barcode || '',
    sku: formattedData.sku || '',
    minStock: formattedData.minStock ?? 0,
  });

  // Sync cardValue with formattedData changes (without triggering onChange)
  useEffect(() => {
    setCardValue({
      file: formattedData.thumbnail || '',
      barcode: formattedData.barcode || '',
      sku: formattedData.sku || '',
      minStock: formattedData.minStock ?? 0,
    });
  }, [formattedData.thumbnail, formattedData.barcode, formattedData.sku, formattedData.minStock]);

  const handleCardChange = (value: ProductCardValue) => {
    setCardValue(value);
    // Only call onChange when user actually changes values
    onChange?.(value);
  };

  return (
    <>
      <ProductCard
        option={formattedData}
        value={cardValue}
        onChange={handleCardChange}
        errors={errors}
      />
    </>
  );
};

const options = [
  {
    type: 'Warna',
    variant: 'Biru',
  },
  {
    type: 'Ukuran',
    variant: 'L',
  },
  {
    type: 'Warna',
    variant: 'Merah',
  },
  {
    type: 'Ukuran',
    variant: 'M',
  },
];

type ProductCardProps = {
  option: FormattedData;
  value: ProductCardValue;
  onChange: (value: ProductCardValue) => void;
  errors?: { [field: string]: string };
};

const ProductCard = ({ value, onChange, errors = {} }: ProductCardProps) => {
  const [file, setFile] = useState<string>(value.file);
  const [barcode, setBarcode] = useState<string>(value.barcode);
  const [sku, setSKU] = useState<string>(value.sku);
  const [minStock, setMinStock] = useState<number>(value.minStock);

  // Update local state when value prop changes
  useEffect(() => {
    setFile(value.file);
    setBarcode(value.barcode);
    setSKU(value.sku);
    setMinStock(value.minStock);
  }, [value]);

  const handleInputChange = (
    field: keyof ProductCardValue,
    inputValue: string | number | File | null
  ) => {
    let newFile = file;
    let newBarcode = barcode;
    let newSku = sku;
    let newMinStock = minStock;

    switch (field) {
      case 'file':
        newFile = inputValue instanceof File ? URL.createObjectURL(inputValue) : '';
        setFile(newFile);
        break;
      case 'barcode':
        newBarcode = inputValue as string;
        setBarcode(newBarcode);
        break;
      case 'sku':
        newSku = inputValue as string;
        setSKU(newSku);
        break;
      case 'minStock':
        newMinStock = Number(inputValue);
        setMinStock(newMinStock);
        break;
    }
    const updatedValue = {
      file: newFile,
      barcode: newBarcode,
      sku: newSku,
      minStock: newMinStock,
    };

    onChange(updatedValue);
  };

  return (
    <div>
      <VariantOptionsList options={options} />
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
      <div className="w-full p-5 flex flex-row gap-2">
        <div className="w-1/2">
          <CustomInput
            label="Barcode"
            placeholder="cth: 1199922838920"
            isWidthFull
            value={barcode}
            onChange={(e) => {
              handleInputChange('barcode', e.target.value);
            }}
          />
          {errors.barcode && (
            <span className="text-red-500 text-xs" style={{ marginTop: '-11px', display: 'block' }}>
              {errors.barcode}
            </span>
          )}
        </div>
        <div className="w-1/2">
          <CustomInput
            label="SKU"
            placeholder="cth: 782217821"
            isWidthFull
            value={sku}
            onChange={(e) => {
              handleInputChange('sku', e.target.value);
            }}
          />
          {errors.sku && (
            <span className="text-red-500 text-xs" style={{ marginTop: '-11px', display: 'block' }}>
              {errors.sku}
            </span>
          )}
        </div>
      </div>
      <div className="w-full p-5 flex flex-col">
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
          {errors.minStock && (
            <span className="text-red-500 text-xs" style={{ marginTop: '-6px', display: 'block' }}>
              {errors.minStock}
            </span>
          )}
        </div>
      </div>
      <VariantSelector
        variants={[
          {
            id: 1,
            name: 'warna',
            title: 'Warna',
            options: [
              { id: 'merah', value: 'merah', label: 'Merah' },
              { id: 'putih', value: 'putih', label: 'Putih' },
              { id: 'hitam', value: 'hitam', label: 'Hitam' },
              { id: 'kuning', value: 'kuning', label: 'Kuning' },
              { id: 'hijau', value: 'hijau', label: 'Hijau' },
              { id: 'biru', value: 'biru', label: 'Biru' },
            ],
          },
          {
            id: 2,
            name: 'ukuran',
            title: 'Ukuran',
            options: [
              { id: 'small', value: 'small', label: 'Small' },
              { id: 'medium', value: 'medium', label: 'Medium' },
              { id: 'large', value: 'large', label: 'Large' },
            ],
          },
        ]}
      />

      <MultiUnitPrice />
    </div>
  );
};

export default DetailVariantList;
