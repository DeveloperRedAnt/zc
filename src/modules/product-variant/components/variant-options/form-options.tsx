'use client';

import { Button } from '@/components/button/button';
import { Text } from '@/components/text/text';
import { toast } from '@/components/toast/toast';
import { FormValidationProvider } from '@/hooks/use-form-validator/form-validation-context';
import DetailVariantList from '@/modules/product-variant/components/detail-variant-list';
import type { ProductCardValue } from '@/modules/product-variant/components/detail-variant-list';
import { useProductVariantStore } from '@/modules/product-variant/store';
import type {
  FormattedData as FormattedDataType,
  ProductVariants,
} from '@/modules/product-variant/types';
import { usePriceMultiPackStore } from '@/modules/products/storing-data/product-multi-pack/stores';
import { Check } from '@icon-park/react';
import React, { useRef, useState } from 'react';
import { ZodError, z } from 'zod';
import { DeleteDialog } from './dialog-opsi-varian';

// Dummy data untuk testing
const sampleFormattedData: FormattedDataType[] = [
  {
    id: 'VAR001',
    name: 'Kemeja Lengan Panjang - Biru',
    thumbnail: 'https://example.com/images/kemeja-biru.jpg',
    barcode: 'BR123456789',
    sku: 'SKU-KMJ-BIRU',
    minStock: 5,
    prices: [],
    typeprice: 'single',
    isActive: true,
    options: [
      { id: 'OPT001', type: 'Warna', name: 'Biru', selected_id: 'SEL001' },
      { id: 'OPT002', type: 'Ukuran', name: 'L', selected_id: 'SEL002' },
    ],
  },
];

const variantSchema = z.object({
  name: z.string().min(1, 'Nama harus diisi'),
  thumbnail: z.string().url('Thumbnail harus berupa URL').optional(),
  barcode: z
    .string()
    .min(1, 'Barcode harus diisi')
    .max(13, 'Barcode maksimal 13 karakter')
    .optional(),
  sku: z.string().min(1, 'SKU harus diisi').max(20, 'SKU maksimal 20 karakter').optional(),
  minStock: z.number().min(1, 'Stok minimal harus lebih dari 0'),
});

const FormOptions = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, _setIsLoading] = useState(false);

  // Ref untuk menyimpan data dari setiap DetailVariantList
  const detailVariantRefs = useRef<{ [key: string]: ProductCardValue }>({});
  // State untuk error per field per varian
  const [fieldErrors, setFieldErrors] = useState<{
    [variantId: string]: { [field: string]: string };
  }>({});

  const { formattedData, updateFormattedData } = useProductVariantStore() as {
    productVariants: ProductVariants;
    formattedData: FormattedDataType[];
    updateFormattedData: (id: string, data: Partial<FormattedDataType>) => void;
  };

  // MultiPack hooks
  const { priceMultiPackList, multiPackErrors, setMultiPackErrors } = usePriceMultiPackStore();

  // Use formattedData directly from store instead of creating it
  const FormattedData = formattedData.length > 0 ? formattedData : sampleFormattedData;

  // Callback untuk menerima data dari DetailVariantList
  const handleDetailVariantChange = (id: string, values: ProductCardValue) => {
    detailVariantRefs.current[id] = values;
    updateFormattedData(id, {
      thumbnail: values.file,
      barcode: values.barcode,
      sku: values.sku,
      minStock: values.minStock,
    });
    // Clear error on change
    setFieldErrors((prev) => ({ ...prev, [id]: {} }));
  };

  React.useEffect(() => {
    for (const item of FormattedData) {
      if (!detailVariantRefs.current[item.id]) {
        detailVariantRefs.current[item.id] = {
          file: item.thumbnail ?? '',
          barcode: item.barcode ?? '',
          sku: item.sku ?? '',
          minStock: item.minStock ?? 0,
        };
      }
    }
  }, [FormattedData]);

  const handleSave = () => {
    // Validasi MultiPackItem
    const newMultiPackErrors: typeof multiPackErrors = {};

    for (const item of priceMultiPackList) {
      if (!item || item.id === undefined) continue;
      if (!newMultiPackErrors[item.id]) {
        newMultiPackErrors[item.id] = {};
      }
      // Ensure newMultiPackErrors[item.id] is always an object
      const errorObj = newMultiPackErrors[item.id]!;
      if (!item.itemName) {
        errorObj.itemName = 'Nama satuan wajib diisi';
      }
      if (item.quantity === undefined || item.quantity <= 0) {
        errorObj.quantity = 'Kuantitas harus lebih dari 0';
      }
      if (item.price === undefined || item.price <= 0) {
        errorObj.price = 'Harga harus lebih dari 0';
      }
    }
    setMultiPackErrors(newMultiPackErrors);

    const hasMultiPackError = Object.values(newMultiPackErrors).some(
      (errObj) => Object.keys(errObj).length > 0
    );

    if (hasMultiPackError) {
      toast.error('Validasi Multi Satuan gagal', {
        description: 'Periksa kembali data multi satuan Anda.',
        className: 'bg-red-500 text-white',
      });
      return;
    }
    let isValid = true;
    let errorMsg = '';
    const errors: { [variantId: string]: { [field: string]: string } } = {};

    for (const formattedItem of FormattedData) {
      const cardValue = detailVariantRefs.current[formattedItem.id];
      try {
        variantSchema.parse({
          name: formattedItem.name,
          thumbnail: cardValue?.file ?? '',
          barcode: cardValue?.barcode ?? '',
          sku: cardValue?.sku ?? '',
          minStock: cardValue?.minStock ?? 0,
        });
      } catch (err) {
        if (err instanceof ZodError) {
          isValid = false;
          errorMsg = err.errors?.[0]?.message || 'Validasi gagal';
          if (!errors[formattedItem.id]) {
            errors[formattedItem.id] = {};
          }
          for (const e of err.errors) {
            if (!errors[formattedItem.id]) {
              errors[formattedItem.id] = {};
            }
            // Ensure errors[formattedItem.id] is initialized
            const variantErrors = errors[formattedItem.id] ?? {};
            if (e.path && e.path.length > 0) {
              const fieldName = e.path[0] as string;
              variantErrors[fieldName] = e.message;
            } else {
              variantErrors.unknown = e.message;
            }
            errors[formattedItem.id] = variantErrors;
          }
        }
      }
    }
    setFieldErrors(errors);
    if (!isValid) {
      toast.error('Validasi gagal', {
        description: errorMsg,
        className: 'bg-red-500 text-white',
      });
      return;
    }

    setDialogOpen(true);
  };

  const handleConfirmSave = () => {
    const payload: FormattedDataType[] = [];

    for (const formattedItem of FormattedData) {
      const cardValue = detailVariantRefs.current[formattedItem.id];
      if (cardValue) {
        payload.push({
          id: formattedItem.id,
          name: formattedItem.name,
          thumbnail: cardValue.file,
          barcode: cardValue.barcode,
          sku: cardValue.sku,
          minStock: cardValue.minStock,
          prices: [],
          typeprice: '',
          isActive: true,
          options: formattedItem.options,
        });
        updateFormattedData(formattedItem.id, {
          name: formattedItem.name,
          thumbnail: cardValue.file,
          barcode: cardValue.barcode,
          sku: cardValue.sku,
          minStock: cardValue.minStock,
          prices: [],
          typeprice: '',
        });
      }
    }

    setDialogOpen(false);
    toast.success('Data berhasil disimpan!', {
      description: 'Semua detail varian telah berhasil disimpan',
      className: 'bg-[#16a34a]',
    });
  };

  return (
    <FormValidationProvider>
      <div className="p-[10px] flex flex-col gap-2">
        <div className="flex flex-row justify-between w-full gap-2">
          <div>
            <Text size="sm" className="mb-2">
              Silahkan isikan Informasi Opsi Varian Anda
            </Text>
            <Text size="sm" className="text-red">
              Form bertanda (*) harus diisi
            </Text>
          </div>
        </div>
      </div>
      {FormattedData.map((data) => (
        <React.Fragment key={data.id}>
          <DetailVariantList
            formattedData={data || []}
            onChange={(values) => handleDetailVariantChange(data.id, values)}
            errors={fieldErrors?.[data.id] ?? {}} // error varian
          />
        </React.Fragment>
      ))}
      <div className="mt-2 flex justify-between items-center">
        <div />
        <div className="flex gap-2">
          <Button type="button" variant="outline">
            Kembali ke Edit Produk
          </Button>
          <Button type="button" variant="success" onClick={handleSave}>
            Simpan Varian <Check />
          </Button>
        </div>
      </div>
      <DeleteDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onRemove={handleConfirmSave}
        loading={isLoading}
        title="Anda akan menyimpan Varian Produk"
        description="Apakah Anda yakin akan menyimpan data Opsi Varian Produk tersebut?"
        buttonText="Ya, Saya Yakin"
      />
    </FormValidationProvider>
  );
};

export default FormOptions;
