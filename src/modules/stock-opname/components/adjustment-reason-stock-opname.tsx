'use client';

import { useAdjustmentStockTakings } from '@/__generated__/api/hooks/product.hooks';
import { Button } from '@/components/button/button';
import Dropdown, { OptionType } from '@/components/dropdown/dropdown';
import CustomInput from '@/components/input/custom-input';
import { useToast } from '@/components/toast/toast';
import { cn } from '@/libs/utils';
import { useStockOpnameById } from '@/modules/stock-opname/store/stock-opname.store';
import { Check, Delete, Plus } from '@icon-park/react';
import { useRouter } from 'next/navigation';
import React, { useState, useCallback, useEffect } from 'react';
import {
  type Control,
  Controller,
  type FieldErrors,
  type FieldPath,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { z } from 'zod';

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
  // Add properties to track data source
  stockType: z.enum([
    'incoming_less_than_system_stock',
    'incoming_equal_to_system_stock',
    'incoming_greater_than_system_stock',
    'incoming_without_initial_stock',
  ]),
  originalProductId: z.number(),
  originalVariantId: z.number(),
  originalDifference: z.number(),
});

const formSchema = z.object({
  products: z.array(productSchema),
});

type FormData = z.infer<typeof formSchema>;
type ProductData = z.infer<typeof productSchema>;

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
    ? `Total jumlah yang diinput (${totalQuantity}) melebihi sisa selisih yang perlu dijelaskan (${maxAllowed}). Kurangi jumlah.`
    : null;

  return (
    <div>
      {/* Layout dengan 2 kolom yang sejajar */}
      <div className="flex gap-4">
        {/* Kolom 1: Jumlah */}
        <div className="w-32">
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
                min={0}
              />
            )}
          />
        </div>

        {/* Kolom 2: Pilih Alasan */}
        <div className="flex-1 max-w-[30rem]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pilih Alasan <span className="text-red-500">*</span>
          </label>
          <Controller
            name={`products.${productIndex}.adjustmentReasons.${reasonIndex}.reason`}
            control={control}
            render={({ field }) => (
              <Dropdown
                {...field}
                options={reasonOptions}
                placeholder="Pilih atau ketik alasan baru..."
                isCreatable={true}
                onCreateOption={(inputValue) => onCreateReason(inputValue)}
                className={cn('h-10', reasonError && 'border-red-500')}
              />
            )}
          />
          <p className="text-xs text-gray-600 mt-1">
            Ketik alasan baru jika tidak tersedia di pilihan, lalu tekan Enter
          </p>
        </div>
      </div>
      {/* Error message untuk quantity */}
      {(quantityError || customQuantityError) && (
        <p className="text-xs text-red-500 mt-1">{customQuantityError || quantityError?.message}</p>
      )}

      {/* Delete Button */}
      <div className="mt-4 mb-4">
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
  const physicalStock = typeof product.physicalStock === 'number' ? product.physicalStock : 0;
  const systemStock = typeof product.systemStock === 'number' ? product.systemStock : 0;
  const difference = physicalStock - systemStock;

  return (
    <div className={cn('mb-2 pb-2', !isLastItem ? 'border-b-gray-200' : '')}>
      <div className="mb-2">
        <table className="w-full table-fixed">
          <tbody>
            <tr>
              <td className="w-1/2 px-4 py-3 text-xs text-gray-900">{product.name}</td>
              <td className="w-1/6 px-4 py-3 text-xs text-center text-gray-700">
                {systemStock} {product.unit}
              </td>
              <td className="w-1/6 px-4 py-3 text-xs text-center text-gray-700">
                {physicalStock} {product.unit}
              </td>
              <td className="w-1/6 px-4 py-3 text-xs text-center text-red-500 font-medium">
                {Math.abs(difference)} {product.unit}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {(product.currentQuantity > 0 || product.currentReason) && (
        <div className="flex gap-8 text-sm mt-1 mb-6">
          {product.currentQuantity > 0 && (
            <div>
              <span className="font-semibold text-gray-700">Jumlah:</span>
              <div className="text-gray-900">
                {product.currentQuantity} {product.unit}
              </div>
            </div>
          )}
          {product.currentReason && (
            <div>
              <span className="font-semibold text-gray-700">Alasan Selisih:</span>
              <div className="text-gray-900">{product.currentReason}</div>
            </div>
          )}
        </div>
      )}

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

          <Button type="button" variant="outline" onClick={onAddReason} className="mb-4">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Alasan
          </Button>
        </div>
      )}
    </div>
  );
}

interface ProductFieldArrayWrapperProps {
  product: ProductData;
  productIndex: number;
  reasonOptions: OptionType[];
  control: Control<FormData>;
  handleCreateReason: (inputValue: string, productIndex: number, reasonIndex: number) => void;
  handleQuantityChange: (productIndex: number, reasonIndex: number, value: string) => void;
  shouldShowQuantityError: (productIndex: number, reasonIndex: number) => boolean;
  calculateTotalQuantity: (productIndex: number) => number;
  getMaxAllowedDifference: (productIndex: number) => number;
  isLastItem: boolean;
  errors?: FieldErrors<FormData>;
}

const ProductFieldArrayWrapper = React.memo(function ProductFieldArrayWrapper({
  product,
  productIndex,
  reasonOptions,
  control,
  handleCreateReason,
  handleQuantityChange,
  shouldShowQuantityError,
  calculateTotalQuantity,
  getMaxAllowedDifference,
  isLastItem,
  errors,
}: ProductFieldArrayWrapperProps) {
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
      productIndex={productIndex}
      product={product}
      reasonOptions={reasonOptions}
      control={control}
      reasonFields={reasonFields}
      onAddReason={() => addReason({ id: Date.now().toString(), quantity: '', reason: null })}
      onDeleteReason={removeReason}
      onCreateReason={handleCreateReason}
      onQuantityChange={handleQuantityChange}
      shouldShowQuantityError={shouldShowQuantityError}
      calculateTotalQuantity={calculateTotalQuantity}
      getMaxAllowedDifference={getMaxAllowedDifference}
      isLastItem={isLastItem}
      errors={errors}
    />
  );
});

interface AdjustmentReasonStockOpnameFormProps {
  stockOpnameId: string;
}

export default function AdjustmentReasonStockOpnameForm({
  stockOpnameId,
}: AdjustmentReasonStockOpnameFormProps) {
  const [reasonOptions, setReasonOptions] = useState(initialReasonOptions);
  const { mutate: fetchAdjustStockOpname } = useAdjustmentStockTakings();

  // Get data from stock opname store
  const stockOpnameData = useStockOpnameById(stockOpnameId);

  const router = useRouter();

  // Convert stock opname data to form data format
  const getFormDataFromStore = (): FormData => {
    const allProducts: ProductData[] = [];

    // Process incoming_less_than_system_stock (these need reason input)
    if (stockOpnameData?.stockData?.incoming_less_than_system_stock) {
      const lessThanProducts = stockOpnameData.stockData.incoming_less_than_system_stock.map(
        (item, index) => ({
          id: `less_${item.product_id}-${item.product_variant_id}`,
          name: `[KURANG] ${item.name}`,
          systemStock: item.stock.system_stock,
          physicalStock: item.stock.physical_stock,
          unit: 'Pcs',
          currentQuantity: 0,
          currentReason: '',
          canAddMoreReasons: true,
          stockType: 'incoming_less_than_system_stock' as const,
          originalProductId: item.product_id,
          originalVariantId: item.product_variant_id,
          originalDifference: item.stock.difference,
          adjustmentReasons: [
            {
              id: `${index + 1}`,
              quantity: '',
              reason: null,
            },
          ],
        })
      );
      allProducts.push(...lessThanProducts);
    }

    // Process incoming_equal_to_system_stock (informational, no reason needed)
    if (stockOpnameData?.stockData?.incoming_equal_to_system_stock) {
      const equalProducts = stockOpnameData.stockData.incoming_equal_to_system_stock.map(
        (item) => ({
          id: `equal_${item.product_id}-${item.product_variant_id}`,
          name: `[SESUAI] ${item.name}`,
          systemStock: item.stock.system_stock,
          physicalStock: item.stock.physical_stock,
          unit: 'Pcs',
          currentQuantity: 0,
          currentReason: '',
          canAddMoreReasons: false, // No reason needed for equal stock
          stockType: 'incoming_equal_to_system_stock' as const,
          originalProductId: item.product_id,
          originalVariantId: item.product_variant_id,
          originalDifference: item.stock.difference,
          adjustmentReasons: [],
        })
      );
      allProducts.push(...equalProducts);
    }

    // Process incoming_greater_than_system_stock (informational, handled elsewhere)
    if (stockOpnameData?.stockData?.incoming_greater_than_system_stock) {
      const greaterProducts = stockOpnameData.stockData.incoming_greater_than_system_stock.map(
        (item) => ({
          id: `greater_${item.product_id}-${item.product_variant_id}`,
          name: `[LEBIH] ${item.name}`,
          systemStock: item.stock.system_stock,
          physicalStock: item.stock.physical_stock,
          unit: 'Pcs',
          currentQuantity: 0,
          currentReason: '',
          canAddMoreReasons: false, // Handled in different flow
          stockType: 'incoming_greater_than_system_stock' as const,
          originalProductId: item.product_id,
          originalVariantId: item.product_variant_id,
          originalDifference: item.stock.difference,
          adjustmentReasons: [],
        })
      );
      allProducts.push(...greaterProducts);
    }

    // Process incoming_without_initial_stock
    if (stockOpnameData?.stockData?.incoming_without_initial_stock) {
      const withoutInitialProducts = stockOpnameData.stockData.incoming_without_initial_stock.map(
        (item) => ({
          id: `without_${item.product_id}-${item.product_variant_id}`,
          name: `[TANPA STOK AWAL] ${item.name}`,
          systemStock: item.stock.system_stock,
          physicalStock: item.stock.physical_stock,
          unit: 'Pcs',
          currentQuantity: 0,
          currentReason: '',
          canAddMoreReasons: false,
          stockType: 'incoming_without_initial_stock' as const,
          originalProductId: item.product_id,
          originalVariantId: item.product_variant_id,
          originalDifference: item.stock.difference,
          adjustmentReasons: [],
        })
      );
      allProducts.push(...withoutInitialProducts);
    }

    return { products: allProducts };
  };

  const defaultValues: FormData = getFormDataFromStore();

  // Initialize react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
    reset,
  } = useForm<FormData>({
    defaultValues,
  });
  const toast = useToast();

  // Reset form when stock opname data changes
  useEffect(() => {
    if (stockOpnameData) {
      const formData = getFormDataFromStore();
      reset(formData);
    }
  }, [stockOpnameData, reset, getFormDataFromStore]);

  const watchedValues = watch();

  const calculateTotalQuantity = (productIndex: number): number => {
    const product = watchedValues.products?.[productIndex];
    if (!product?.adjustmentReasons) return 0;

    return product.adjustmentReasons.reduce((total, reason) => {
      const quantity = parseInt(reason.quantity || '0');
      return total + (Number.isNaN(quantity) ? 0 : quantity);
    }, 0);
  };

  const getMaxAllowedDifference = (productIndex: number): number => {
    const product = watchedValues.products?.[productIndex];
    if (!product) return 0;

    // Ensure values are numbers to prevent NaN
    const physicalStock = typeof product.physicalStock === 'number' ? product.physicalStock : 0;
    const systemStock = typeof product.systemStock === 'number' ? product.systemStock : 0;
    const currentQuantity =
      typeof product.currentQuantity === 'number' ? product.currentQuantity : 0;

    // Total selisih yang perlu dijelaskan
    const totalDifference = Math.abs(physicalStock - systemStock);

    // Sisa yang perlu dijelaskan setelah dikurangi currentQuantity
    return Math.max(0, totalDifference - currentQuantity);
  };

  const shouldShowQuantityError = useCallback(
    (productIndex: number, _reasonIndex: number): boolean => {
      const totalQuantity = calculateTotalQuantity(productIndex);
      const maxAllowed = getMaxAllowedDifference(productIndex);

      return totalQuantity > maxAllowed;
    },
    [calculateTotalQuantity, getMaxAllowedDifference]
  );

  const handleQuantityChange = useCallback(
    (productIndex: number, reasonIndex: number, value: string) => {
      const fieldPath =
        `products.${productIndex}.adjustmentReasons.${reasonIndex}.quantity` as FieldPath<FormData>;
      setValue(fieldPath, value);
    },
    [setValue]
  );

  const handleCreateReason = useCallback(
    (inputValue: string, productIndex: number, reasonIndex: number) => {
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

      const optionToSelect = exists
        ? reasonOptions.find((option) => option.label.toLowerCase() === inputValue.toLowerCase())
        : newOption;

      if (optionToSelect) {
        setValue(
          `products.${productIndex}.adjustmentReasons.${reasonIndex}.reason`,
          optionToSelect
        );
      }
    },
    [reasonOptions, setValue]
  );

  // Form submission handler
  const onSubmit = (data: FormData) => {
    if (!stockOpnameData) return;

    // Group products by stockType and prepare payload
    const payload = {
      note: stockOpnameData.note || 'Stock taking for adjustment', // Use stored note or default
      store_id: stockOpnameData.store_id || 1, // Use stored store_id or default
      incoming_equal_to_system_stock: [] as Array<{
        product_id: number;
        product_variant_id: number;
        stock: {
          system_stock: number;
          physical_stock: number;
          difference: number;
        };
      }>,
      incoming_less_than_system_stock: [] as Array<{
        product_id: number;
        product_variant_id: number;
        stock: {
          system_stock: number;
          physical_stock: number;
          difference: number;
          reasons: Array<{
            stock: number;
            reason: string;
          }>;
        };
      }>,
    };

    // Process each product based on stockType
    for (const product of data.products) {
      if (product.stockType === 'incoming_equal_to_system_stock') {
        payload.incoming_equal_to_system_stock.push({
          product_id: product.originalProductId,
          product_variant_id: product.originalVariantId,
          stock: {
            system_stock: product.systemStock,
            physical_stock: product.physicalStock,
            difference: product.originalDifference,
          },
        });
      } else if (product.stockType === 'incoming_less_than_system_stock') {
        // Process adjustment reasons for less than system stock
        const reasons = product.adjustmentReasons
          .filter((reason) => reason.quantity && reason.reason)
          .map((reason) => ({
            stock: parseInt(reason.quantity),
            reason:
              typeof reason.reason === 'object' && reason.reason !== null
                ? reason.reason.label
                : reason.reason || '',
          }));

        payload.incoming_less_than_system_stock.push({
          product_id: product.originalProductId,
          product_variant_id: product.originalVariantId,
          stock: {
            system_stock: product.systemStock,
            physical_stock: product.physicalStock,
            difference: product.originalDifference,
            reasons,
          },
        });
      }
      // Note: incoming_greater_than_system_stock and incoming_without_initial_stock
      // are handled in different flows, so they're not included in this payload
    }

    fetchAdjustStockOpname(
      { body: payload },
      {
        onSuccess: () => {
          toast.showSuccess('Stock opname berhasil disimpan');
          router.push('/dashboard/stock-opname');
        },
        onError: (error) => {
          toast.showError('Gagal menyimpan stock opname');
          console.error('Error submitting stock opname:', error);
        },
      }
    );

    // TODO: Call API to submit the data
    // await submitStockOpnameAdjustment(payload);
  };

  const products = getValues('products');

  // Show loading state if no data available
  if (!stockOpnameData) {
    return (
      <div className="p-6">
        {/* Table Headers Skeleton */}
        <div className="mb-2">
          <table className="w-full table-fixed">
            <thead>
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

        {/* Skeleton Items */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="mb-2 pb-2 border-b border-gray-200">
            {/* Product Row Skeleton */}
            <div className="mb-2">
              <table className="w-full table-fixed">
                <tbody>
                  <tr>
                    <td className="w-1/2 px-4 py-3">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                    </td>
                    <td className="w-1/6 px-4 py-3 text-center">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-16 mx-auto" />
                    </td>
                    <td className="w-1/6 px-4 py-3 text-center">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-16 mx-auto" />
                    </td>
                    <td className="w-1/6 px-4 py-3 text-center">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-16 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Form Fields Skeleton */}
            <div className="space-y-6">
              <div className="flex gap-4">
                {/* Quantity Field Skeleton */}
                <div className="w-32">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-16 mb-2" />
                  <div className="h-10 bg-gray-200 rounded animate-pulse" />
                </div>

                {/* Reason Field Skeleton */}
                <div className="flex-1 max-w-[30rem]">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-2" />
                  <div className="h-10 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-64 mt-1" />
                </div>
              </div>

              {/* Delete Button Skeleton */}
              <div className="mt-4 mb-4">
                <div className="h-9 bg-gray-200 rounded animate-pulse w-20" />
              </div>
            </div>

            {/* Add Reason Button Skeleton */}
            <div className="h-11 bg-gray-200 rounded animate-pulse w-32 mb-4" />
          </div>
        ))}

        {/* Submit Buttons Skeleton */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end mt-8 pt-6">
          <div className="h-11 bg-gray-200 rounded animate-pulse w-48" />
          <div className="h-11 bg-gray-200 rounded animate-pulse w-44" />
        </div>
      </div>
    );
  }

  // Show empty state if no data items
  const hasAnyData =
    (stockOpnameData.stockData?.incoming_less_than_system_stock &&
      stockOpnameData.stockData.incoming_less_than_system_stock.length > 0) ||
    (stockOpnameData.stockData?.incoming_equal_to_system_stock &&
      stockOpnameData.stockData.incoming_equal_to_system_stock.length > 0) ||
    (stockOpnameData.stockData?.incoming_greater_than_system_stock &&
      stockOpnameData.stockData.incoming_greater_than_system_stock.length > 0) ||
    (stockOpnameData.stockData?.incoming_without_initial_stock &&
      stockOpnameData.stockData.incoming_without_initial_stock.length > 0);

  if (!hasAnyData) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Tidak ada data stock opname untuk diproses.</p>
      </div>
    );
  }

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

      {products.map((product, productIndex) => (
        <ProductFieldArrayWrapper
          key={product.id}
          product={product}
          productIndex={productIndex}
          reasonOptions={reasonOptions}
          control={control}
          handleCreateReason={handleCreateReason}
          handleQuantityChange={handleQuantityChange}
          shouldShowQuantityError={shouldShowQuantityError}
          calculateTotalQuantity={calculateTotalQuantity}
          getMaxAllowedDifference={getMaxAllowedDifference}
          isLastItem={products.length === productIndex + 1}
          errors={errors}
        />
      ))}

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
