// detail-variant-list-option.tsx
'use client';

import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader } from '@/components/card/card';
import { InformationText } from '@/components/information-text/information-text';
import CustomInput from '@/components/input/custom-input';
import InputFile from '@/components/input/input-file';
import { Text } from '@/components/text/text';
import { MultiUnitPrice } from '@/modules/product-variant/components/variant-options/multi-unit-price';
import type { FormattedData } from '@/modules/products-edit/storing-data/product-variant-edit-option/types';
import { Refresh } from '@icon-park/react';
import React, { useState, useEffect, useRef } from 'react';

export type ProductCardValue = {
  file: string;
  barcode: string;
  sku: string;
  minStock: number;
};

type ProductCardListProps = {
  formattedData: FormattedData;
  onChange?: (values: ProductCardValue) => void;
  errors?: { [field: string]: string };
};

const DetailVariantList = ({ formattedData, onChange, errors = {} }: ProductCardListProps) => {
  const [cardValue, setCardValue] = useState<ProductCardValue>({
    file: formattedData.thumbnail || '',
    barcode: formattedData.barcode || '',
    sku: formattedData.sku || '',
    minStock: formattedData.minStock ?? 0,
  });

  // Simpan data awal di ref supaya tidak berubah walau state berubah
  const initialValueRef = useRef<ProductCardValue>({
    file: formattedData.thumbnail || '',
    barcode: formattedData.barcode || '',
    sku: formattedData.sku || '',
    minStock: formattedData.minStock ?? 0,
  });

  // Sync state jika formattedData berubah (misal karena reload data)
  useEffect(() => {
    const newVal = {
      file: formattedData.thumbnail || '',
      barcode: formattedData.barcode || '',
      sku: formattedData.sku || '',
      minStock: formattedData.minStock ?? 0,
    };
    setCardValue(newVal);
    initialValueRef.current = newVal; // update nilai awal ketika data baru masuk
  }, [formattedData.thumbnail, formattedData.barcode, formattedData.sku, formattedData.minStock]);

  const handleCardChange = (value: ProductCardValue) => {
    setCardValue(value);
    onChange?.(value);
  };

  const handleReset = () => {
    const initial = initialValueRef.current;
    setCardValue(initial);
    onChange?.(initial);
  };
  return (
    <>
      <ProductCard
        option={formattedData}
        value={cardValue}
        onChange={handleCardChange}
        errors={errors}
        isEdit={true}
        onReset={handleReset}
      />
    </>
  );
};

type ProductCardProps = {
  option: FormattedData;
  value: ProductCardValue;
  onChange: (value: ProductCardValue) => void;
  errors?: { [field: string]: string };
  isEdit: boolean;
  onReset?: () => void;
};

const ProductCard = ({
  option,
  value,
  onChange,
  errors = {},
  isEdit = false,
  onReset,
}: ProductCardProps) => {
  const [file, setFile] = useState<string>(value.file);
  const [barcode, setBarcode] = useState<string>(value.barcode);
  const [sku, setSKU] = useState<string>(value.sku);
  const [minStock, setMinStock] = useState<number>(value.minStock);

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
    <Card className="m-4">
      <CardHeader className="text-lg font-semibold border-b border-gray-300 group flex flex-row justify-between items-center text-[#555555]">
        {option.name}

        {isEdit && (
          <Button type="button" variant="outline" onClick={onReset}>
            <Refresh />
            Reset
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4 pt-3">
        <div className="flex gap-2">
          <div className="w-1/2 p-5">
            <InputFile
              label="Unggah Thumbnail"
              accept="image/*"
              onChange={(e) => {
                handleInputChange('file', e as File);
              }}
            />
          </div>
          <div className="w-1/2 p-5 flex flex-col gap-5">
            <div className="flex flex-col gap-4">
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
                <span
                  className="text-red-500 text-xs"
                  style={{ marginTop: '-11px', display: 'block' }}
                >
                  {errors.barcode}
                </span>
              )}
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
                <span
                  className="text-red-500 text-xs"
                  style={{ marginTop: '-11px', display: 'block' }}
                >
                  {errors.sku}
                </span>
              )}
            </div>
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
                <span
                  className="text-red-500 text-xs"
                  style={{ marginTop: '-6px', display: 'block' }}
                >
                  {errors.minStock}
                </span>
              )}
            </div>
          </div>
        </div>
        <MultiUnitPrice variantUnits={option.variantUnits} variantId={option.id} />
      </CardContent>
    </Card>
  );
};

export default DetailVariantList;
