'use client';

import React from 'react';

import { Button } from '@/components/button/button';
import Dropdown from '@/components/dropdown/dropdown';
import CustomInput from '@/components/input/custom-input';
import { Delete } from '@icon-park/react';

interface StockOpnameItemProps {
  onDelete?: () => void;
  productOptions?: Array<{ label: string; value: string | number }>;
  selectedProduct?: { label: string; value: string | number } | null;
  onProductChange?: (product: { label: string; value: string | number } | null) => void;
  stockValue?: string | number;
  onStockChange?: (value: string) => void;
}

export default function StockOpnameItem({
  onDelete,
  productOptions = [],
  selectedProduct = null,
  onProductChange,
  stockValue = '',
  onStockChange,
}: StockOpnameItemProps) {
  return (
    <>
      <div className="flex flex-row gap-5 mb-2">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Produk <span className="text-red-500">*</span>
          </label>
          <Dropdown
            options={productOptions}
            value={selectedProduct}
            onChange={onProductChange || (() => {})}
            placeholder="Papua New Guinea Organic Robusta 250 gr"
            className="h-10 w-[24rem]"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Stok Baik <span className="text-red-500">*</span>
          </label>
          <CustomInput
            className="border-[#C2C7D0] h-10"
            placeholder="20"
            inputNumber
            isWidthFull
            value={stockValue}
            onChange={(e) => onStockChange?.(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-start mb-6">
        <Button
          type="button"
          variant="ghost"
          className="text-red-500 hover:text-red-700 p-0 h-auto font-normal"
          onClick={onDelete}
        >
          <Delete className="mr-2 h-4 w-4" /> Hapus
        </Button>
      </div>
    </>
  );
}
