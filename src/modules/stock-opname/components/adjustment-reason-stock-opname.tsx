'use client';

import { Button } from '@/components/button/button';
import Dropdown, { OptionType } from '@/components/dropdown/dropdown';
import CustomInput from '@/components/input/custom-input';
import { cn } from '@/libs/utils';
import { Check, Delete, Plus } from '@icon-park/react';
import React, { useState } from 'react';

// Types for adjustment reasons
interface AdjustmentReason {
  id: string;
  quantity: string;
  reason: OptionType | null;
}

// Types for product data
interface ProductData {
  id: string;
  name: string;
  systemStock: number;
  physicalStock: number;
  unit: string;
  currentQuantity: number;
  currentReason: string;
  adjustmentReasons: AdjustmentReason[];
  canAddMoreReasons?: boolean; // Optional: controls if more reasons can be added
  maxReasons?: number; // Optional: maximum number of reasons allowed
}

// Initial reason options
const initialReasonOptions: OptionType[] = [
  { label: 'Kedaluwarsa', value: 'expired' },
  { label: 'Rusak', value: 'damaged' },
  { label: 'Hilang', value: 'lost' },
  { label: 'Salah Hitung', value: 'miscount' },
  { label: 'Lainnya', value: 'other' },
];

// Individual Adjustment Reason Field Component
interface AdjustmentReasonFieldProps {
  reason: AdjustmentReason;
  reasonOptions: OptionType[];
  onUpdate: (id: string, field: keyof AdjustmentReason, value: string | OptionType | null) => void;
  onDelete: (id: string) => void;
  onCreateReason: (inputValue: string, reasonId: string) => void;
}

function AdjustmentReasonField({
  reason,
  reasonOptions,
  onUpdate,
  onDelete,
  onCreateReason,
}: AdjustmentReasonFieldProps) {
  // Handler untuk membuat opsi baru dan langsung memilihnya
  const handleCreateAndSelect = (inputValue: string) => {
    onCreateReason(inputValue, reason.id);
  };

  return (
    <div>
      <div className="flex gap-4 items-start">
        <div className="">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jumlah <span className="text-red-500">*</span>
          </label>
          <CustomInput
            value={reason.quantity}
            onChange={(e) => onUpdate(reason.id, 'quantity', e.target.value)}
            placeholder="Cth: 1"
            className="h-10"
            type="number"
          />
        </div>
        <div className="flex-[2] max-w-[30rem]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pilih Alasan <span className="text-red-500">*</span>
          </label>
          <Dropdown
            options={reasonOptions}
            value={reason.reason}
            onChange={(value) => onUpdate(reason.id, 'reason', value)}
            onCreateOption={handleCreateAndSelect}
            isCreatable={true}
            placeholder="Pilih atau ketik alasan baru"
            className="h-12 border-gray-300 rounded-lg bg-white"
            classDiv="mb-1"
          />
          <p className="text-xs text-gray-600">
            Ketik alasan baru jika tidak tersedia di pilihan, lalu tekan Enter
          </p>
        </div>
      </div>

      {/* Individual Delete Button */}
      <div className="mb-4">
        <Button
          type="button"
          variant="ghost"
          onClick={() => onDelete(reason.id)}
          className="text-red-500 border-red-300 hover:bg-red-50"
          size="default"
        >
          <Delete className="h-4 w-4 mr-2" />
          Hapus
        </Button>
      </div>
    </div>
  );
}

// Product Data and Adjustment Section Component
interface ProductAdjustmentSectionProps {
  product: ProductData;
  reasonOptions: OptionType[];
  onUpdateReason: (
    productId: string,
    reasonId: string,
    field: keyof AdjustmentReason,
    value: string | OptionType | null
  ) => void;
  onDeleteReason: (productId: string, reasonId: string) => void;
  onAddReason: (productId: string) => void;
  onCreateReason: (inputValue: string, reasonId: string) => void;
  isLastItem?: boolean;
}

function ProductAdjustmentSection({
  product,
  reasonOptions,
  onUpdateReason,
  onDeleteReason,
  onAddReason,
  onCreateReason,
  isLastItem,
}: ProductAdjustmentSectionProps) {
  const difference = product.physicalStock - product.systemStock;

  return (
    <div className={cn('mb-2 pb-2', !isLastItem ? 'border-b-gray-200' : '')}>
      {/* Product Data Table */}
      <div className="mb-2">
        <table className="w-full table-fixed">
          <tbody>
            <tr>
              <td className="w-1/2 px-4 py-3 text-xs text-gray-900">{product.name}</td>
              <td className="w-1/6 px-4 py-3 text-xs text-center text-gray-700">
                {product.systemStock} {product.unit}
              </td>
              <td className="w-1/6 px-4 py-3 text-xs text-center text-gray-700">
                {product.physicalStock} {product.unit}
              </td>
              <td className="w-1/6 px-4 py-3 text-xs text-center text-red-500 font-medium">
                {Math.abs(difference)} {product.unit}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Current Summary */}
      <div className="flex gap-8 text-sm mt-1 mb-6">
        <div>
          <span className="font-semibold text-gray-700">Jumlah:</span>
          <div className="text-gray-900">
            {product.currentQuantity} {product.unit}
          </div>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Alasan Selisih:</span>
          <div className="text-gray-900">{product.currentReason}</div>
        </div>
      </div>

      {/* Adjustment Form - Only show if product can have adjustment reasons */}
      {product.canAddMoreReasons !== false && (
        <div className="space-y-6">
          {product.adjustmentReasons.map((reason) => (
            <AdjustmentReasonField
              key={reason.id}
              reason={reason}
              reasonOptions={reasonOptions}
              onUpdate={(reasonId, field, value) =>
                onUpdateReason(product.id, reasonId, field, value)
              }
              onDelete={(reasonId) => onDeleteReason(product.id, reasonId)}
              onCreateReason={(inputValue, reasonId) => onCreateReason(inputValue, reasonId)}
            />
          ))}

          {/* Add Reason Button - Conditional */}
          {(!product.maxReasons || product.adjustmentReasons.length < product.maxReasons) && (
            <Button
              type="button"
              variant="outline"
              onClick={() => onAddReason(product.id)}
              className="mb-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Alasan
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default function AdjustmentReasonStockOpnameForm() {
  // State untuk mengelola opsi alasan yang dapat ditambah secara dinamis
  const [reasonOptions, setReasonOptions] = useState(initialReasonOptions);

  const [products, setProducts] = useState<ProductData[]>([
    {
      id: '1',
      name: 'Papua New Guinea Organic Robusta 250 gr',
      systemStock: 80,
      physicalStock: 68,
      unit: 'Zak',
      currentQuantity: 5,
      currentReason: 'Kedaluwarsa',
      canAddMoreReasons: true, // This product can add more reasons
      maxReasons: 5, // Maximum 5 reasons allowed
      adjustmentReasons: [
        {
          id: '1',
          quantity: '',
          reason: { label: 'Hilang', value: 'lost' },
        },
      ],
    },
    {
      id: '2',
      name: 'Kaos Combed 34 cm (Hitam - Small)',
      systemStock: 20,
      physicalStock: 10,
      unit: 'Plastik',
      currentQuantity: 5,
      currentReason: 'Kedaluwarsa',
      canAddMoreReasons: false, // This product CANNOT add more reasons
      adjustmentReasons: [
        {
          id: '2',
          quantity: '',
          reason: { label: 'Rusak', value: 'damaged' },
        },
      ],
    },
    {
      id: '3',
      name: 'Buku Tulis A4 (50 Lembar)',
      systemStock: 100,
      physicalStock: 95,
      unit: 'Pcs',
      currentQuantity: 3,
      currentReason: 'Hilang',
      canAddMoreReasons: true,
      maxReasons: 2, // Limited to maximum 2 reasons
      adjustmentReasons: [
        {
          id: '3',
          quantity: '',
          reason: { label: 'Kedaluwarsa', value: 'expired' },
        },
      ],
    },
  ]);

  const addAdjustmentReason = (productId: string) => {
    const newReason: AdjustmentReason = {
      id: Date.now().toString(),
      quantity: '',
      reason: null,
    };
    setProducts(
      products.map((product) =>
        product.id === productId
          ? { ...product, adjustmentReasons: [...product.adjustmentReasons, newReason] }
          : product
      )
    );
  };

  const updateAdjustmentReason = (
    productId: string,
    reasonId: string,
    field: keyof AdjustmentReason,
    value: string | OptionType | null
  ) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? {
              ...product,
              adjustmentReasons: product.adjustmentReasons.map((reason) =>
                reason.id === reasonId ? { ...reason, [field]: value } : reason
              ),
            }
          : product
      )
    );
  };

  const deleteAdjustmentReason = (productId: string, reasonId: string) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? {
              ...product,
              adjustmentReasons: product.adjustmentReasons.filter(
                (reason) => reason.id !== reasonId
              ),
            }
          : product
      )
    );
  };

  // Handler untuk menambah alasan baru ke daftar opsi dan langsung memilihnya
  const handleCreateReason = (inputValue: string, reasonId: string) => {
    const newOption: OptionType = {
      label: inputValue,
      value: inputValue.toLowerCase().replace(/\s+/g, '_'),
    };

    // Cek apakah opsi sudah ada
    const exists = reasonOptions.some(
      (option) => option.label.toLowerCase() === inputValue.toLowerCase()
    );

    if (!exists) {
      setReasonOptions((prev) => [...prev, newOption]);
    }

    // Langsung pilih opsi yang baru dibuat/sudah ada
    const optionToSelect = exists
      ? reasonOptions.find((option) => option.label.toLowerCase() === inputValue.toLowerCase())
      : newOption;

    if (optionToSelect) {
      // Update reason untuk produk dan reasonId yang spesifik
      updateAdjustmentReason(
        products.find((p) => p.adjustmentReasons.some((r) => r.id === reasonId))?.id || '',
        reasonId,
        'reason',
        optionToSelect
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      {/* Table Headers */}
      <div className="mb-2">
        <table className="w-full table-fixed">
          <thead className="">
            <tr>
              <th className="w-1/2 px-2 py-0 text-left text-xs font-semibold text-gray-700">
                Produk
              </th>
              <th className="w-1/6 px-2 py-0 text-center text-xs font-semibold text-gray-700">
                Stok Sistem
              </th>
              <th className="w-1/6 px-2 py-0 text-center text-xs font-semibold text-gray-700">
                Stok Baik
              </th>
              <th className="w-1/6 px-2 py-0 text-center text-xs font-semibold text-gray-700">
                Selisih
              </th>
            </tr>
          </thead>
        </table>
      </div>

      {/* Multiple Product Sections */}
      {products.map((product, index) => (
        <ProductAdjustmentSection
          key={product.id}
          product={product}
          reasonOptions={reasonOptions}
          onUpdateReason={updateAdjustmentReason}
          onDeleteReason={deleteAdjustmentReason}
          onAddReason={addAdjustmentReason}
          onCreateReason={(inputValue) => handleCreateReason(inputValue, '')}
          isLastItem={products.length === index + 1}
        />
      ))}

      {/* Form Submit Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end mt-8 pt-6">
        <Button type="button" variant="outline" className="h-11">
          Kembali ke List Stok Opname
        </Button>
        <Button type="submit" className="h-11 bg-green-600 hover:bg-green-700">
          Simpan Alasan Selisih <Check />
        </Button>
      </div>
    </form>
  );
}
