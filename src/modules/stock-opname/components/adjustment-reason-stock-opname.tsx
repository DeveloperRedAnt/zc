'use client';

import { Button } from '@/components/button/button';
import Dropdown, { OptionType } from '@/components/dropdown/dropdown';
import CustomInput from '@/components/input/custom-input';
import { cn } from '@/libs/utils';
import { Check, Delete, Plus } from 'lucide-react';
import React, { useState } from 'react';
import {
  type Control,
  Controller,
  type FieldErrors,
  type FieldPath,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { z } from 'zod';

// Zod schema for form validation
const adjustmentReasonSchema = z.object({
  id: z.string(),
  quantity: z
    .string()
    .min(1, 'Jumlah harus diisi')
    .refine((val) => {
      const num = parseInt(val);
      return !Number.isNaN(num) && num > 0;
    }, 'Jumlah harus berupa angka positif'),
  reason: z
    .object({
      label: z.string(),
      value: z.union([z.string(), z.number()]),
    })
    .nullable(),
});

const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  systemStock: z.number(),
  physicalStock: z.number(),
  unit: z.string(),
  currentQuantity: z.number(),
  currentReason: z.string(),
  canAddMoreReasons: z.boolean().optional(),
  maxReasons: z.number().optional(),
  adjustmentReasons: z.array(adjustmentReasonSchema),
});

const formSchema = z.object({
  products: z.array(productSchema),
});

type FormData = z.infer<typeof formSchema>;
type ProductData = z.infer<typeof productSchema>;

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
  productIndex: number;
  reasonIndex: number;
  reasonOptions: OptionType[];
  control: Control<FormData>;
  onDelete: () => void;
  onCreateReason: (inputValue: string) => void;
  onQuantityChange: (productIndex: number, reasonIndex: number, value: string) => void;
  shouldShowError: boolean;
  totalQuantity: number;
  maxAllowed: number;
  errors?: FieldErrors<FormData>;
}

function AdjustmentReasonField({
  productIndex,
  reasonIndex,
  reasonOptions,
  control,
  onDelete,
  onCreateReason,
  onQuantityChange,
  shouldShowError,
  totalQuantity,
  maxAllowed,
  errors,
}: AdjustmentReasonFieldProps) {
  const quantityError =
    errors?.products?.[productIndex]?.adjustmentReasons?.[reasonIndex]?.quantity;
  const reasonError = errors?.products?.[productIndex]?.adjustmentReasons?.[reasonIndex]?.reason;

  // Custom error message untuk validasi total
  const customQuantityError = shouldShowError
    ? `Total jumlah (${totalQuantity}) melebihi selisih maksimum (${maxAllowed}). Kurangi jumlah di field lain.`
    : null;

  return (
    <div>
      <div className="flex gap-4 items-start">
        <div className="">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jumlah <span className="text-red-500">*</span>
          </label>
          <Controller
            name={`products.${productIndex}.adjustmentReasons.${reasonIndex}.quantity`}
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  onQuantityChange(productIndex, reasonIndex, e.target.value);
                }}
                placeholder="Cth: 1"
                className={cn('h-10', (quantityError || customQuantityError) && 'border-red-500')}
                type="number"
              />
            )}
          />
          {(quantityError || customQuantityError) && (
            <p className="text-xs text-red-500 mt-1">
              {customQuantityError || quantityError?.message}
            </p>
          )}
        </div>
        <div className="flex-[2] max-w-[30rem]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pilih Alasan <span className="text-red-500">*</span>
          </label>
          <Controller
            name={`products.${productIndex}.adjustmentReasons.${reasonIndex}.reason`}
            control={control}
            render={({ field }) => (
              <Dropdown
                options={reasonOptions}
                value={field.value}
                onChange={field.onChange}
                onCreateOption={onCreateReason}
                isCreatable={true}
                placeholder="Pilih atau ketik alasan baru"
                className={cn(
                  'h-12 border-gray-300 rounded-lg bg-white',
                  reasonError && 'border-red-500'
                )}
                classDiv="mb-1"
              />
            )}
          />
          {reasonError && <p className="text-xs text-red-500 mt-1">{reasonError.message}</p>}
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
          onClick={onDelete}
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
  productIndex: number;
  product: ProductData;
  reasonOptions: OptionType[];
  control: Control<FormData>;
  reasonFields: Array<{ id: string }>;
  onAddReason: () => void;
  onDeleteReason: (index: number) => void;
  onCreateReason: (inputValue: string, productIndex: number, reasonIndex: number) => void;
  onQuantityChange: (productIndex: number, reasonIndex: number, value: string) => void;
  shouldShowQuantityError: (productIndex: number, reasonIndex: number) => boolean;
  calculateTotalQuantity: (productIndex: number) => number;
  getMaxAllowedDifference: (productIndex: number) => number;
  isLastItem?: boolean;
  errors?: FieldErrors<FormData>;
}

function ProductAdjustmentSection({
  productIndex,
  product,
  reasonOptions,
  control,
  reasonFields,
  onAddReason,
  onDeleteReason,
  onCreateReason,
  onQuantityChange,
  shouldShowQuantityError,
  calculateTotalQuantity,
  getMaxAllowedDifference,
  isLastItem,
  errors,
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
          {reasonFields.map((field, reasonIndex) => (
            <AdjustmentReasonField
              key={field.id}
              productIndex={productIndex}
              reasonIndex={reasonIndex}
              reasonOptions={reasonOptions}
              control={control}
              onDelete={() => onDeleteReason(reasonIndex)}
              onCreateReason={(inputValue) => onCreateReason(inputValue, productIndex, reasonIndex)}
              onQuantityChange={onQuantityChange}
              shouldShowError={shouldShowQuantityError(productIndex, reasonIndex)}
              totalQuantity={calculateTotalQuantity(productIndex)}
              maxAllowed={getMaxAllowedDifference(productIndex)}
              errors={errors}
            />
          ))}

          {/* Add Reason Button - Always show if canAddMoreReasons is true */}
          <Button type="button" variant="outline" onClick={onAddReason} className="mb-4">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Alasan
          </Button>
        </div>
      )}
    </div>
  );
}

export default function AdjustmentReasonStockOpnameForm() {
  // State untuk mengelola opsi alasan yang dapat ditambah secara dinamis
  const [reasonOptions, setReasonOptions] = useState(initialReasonOptions);
  // State untuk tracking field yang terakhir diubah (untuk validasi)
  const [lastChangedField, setLastChangedField] = useState<string | null>(null);

  // Default form data
  const defaultValues: FormData = {
    products: [
      {
        id: '1',
        name: 'Papua New Guinea Organic Robusta 250 gr',
        systemStock: 80,
        physicalStock: 68,
        unit: 'Zak',
        currentQuantity: 5,
        currentReason: 'Kedaluwarsa',
        canAddMoreReasons: true,
        adjustmentReasons: [
          {
            id: '1',
            quantity: '',
            reason: null,
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
        canAddMoreReasons: false,
        adjustmentReasons: [
          {
            id: '2',
            quantity: '',
            reason: null,
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
        adjustmentReasons: [
          {
            id: '3',
            quantity: '',
            reason: null,
          },
        ],
      },
    ],
  };

  // Initialize react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<FormData>({
    defaultValues,
  });

  // Watch all form values untuk validasi real-time
  const watchedValues = watch();

  // Fungsi untuk menghitung total quantity per produk
  const calculateTotalQuantity = (productIndex: number): number => {
    const product = watchedValues.products?.[productIndex];
    if (!product?.adjustmentReasons) return 0;

    return product.adjustmentReasons.reduce((total, reason) => {
      const quantity = parseInt(reason.quantity || '0');
      return total + (Number.isNaN(quantity) ? 0 : quantity);
    }, 0);
  };

  // Fungsi untuk mendapatkan selisih maksimum yang diizinkan
  const getMaxAllowedDifference = (productIndex: number): number => {
    const product = watchedValues.products?.[productIndex];
    if (!product) return 0;
    return Math.abs(product.physicalStock - product.systemStock);
  };

  // Fungsi untuk mengecek apakah field harus menampilkan error
  const shouldShowQuantityError = (productIndex: number, reasonIndex: number): boolean => {
    const totalQuantity = calculateTotalQuantity(productIndex);
    const maxAllowed = getMaxAllowedDifference(productIndex);
    const currentFieldPath = `products.${productIndex}.adjustmentReasons.${reasonIndex}.quantity`;

    // Jika total tidak melebihi, tidak ada error
    if (totalQuantity <= maxAllowed) return false;

    // Jika total melebihi, tampilkan error pada semua field kecuali yang terakhir diubah
    return lastChangedField !== currentFieldPath;
  };

  // Fungsi untuk handle perubahan quantity
  const handleQuantityChange = (productIndex: number, reasonIndex: number, value: string) => {
    const fieldPath =
      `products.${productIndex}.adjustmentReasons.${reasonIndex}.quantity` as FieldPath<FormData>;
    setLastChangedField(fieldPath);
    setValue(fieldPath, value);
  };

  // Handler untuk menambah alasan baru ke daftar opsi dan langsung memilihnya
  const handleCreateReason = (inputValue: string, productIndex: number, reasonIndex: number) => {
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
      // Update reason menggunakan setValue dari react-hook-form
      setValue(`products.${productIndex}.adjustmentReasons.${reasonIndex}.reason`, optionToSelect);
    }
  };

  // Form submission handler
  const onSubmit = (_data: FormData) => {
    // Handle form submission logic here
  };

  // Get products from form data
  const products = getValues('products');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6">
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
      {products.map((product, productIndex) => {
        // Create field array for this product's adjustment reasons
        const ProductFieldArray = () => {
          const {
            fields: reasonFields,
            append: addReason,
            remove: removeReason,
          } = useFieldArray({
            control,
            name: `products.${productIndex}.adjustmentReasons`,
          });

          return (
            <ProductAdjustmentSection
              key={product.id}
              productIndex={productIndex}
              product={product}
              reasonOptions={reasonOptions}
              control={control}
              reasonFields={reasonFields}
              onAddReason={() =>
                addReason({ id: Date.now().toString(), quantity: '', reason: null })
              }
              onDeleteReason={removeReason}
              onCreateReason={handleCreateReason}
              onQuantityChange={handleQuantityChange}
              shouldShowQuantityError={shouldShowQuantityError}
              calculateTotalQuantity={calculateTotalQuantity}
              getMaxAllowedDifference={getMaxAllowedDifference}
              isLastItem={products.length === productIndex + 1}
              errors={errors}
            />
          );
        };

        return <ProductFieldArray key={product.id} />;
      })}

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
