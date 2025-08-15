// form-options.tsx - Refactored with separated structure
'use client';

import { Button } from '@/components/button/button';
import { Text } from '@/components/text/text';
import { toast } from '@/components/toast/toast';
import { FormValidationProvider } from '@/hooks/use-form-validator/form-validation-context';
import DetailVariantList from '@/modules/products-edit/components/options/detail-variant-list-option';
import { usePriceMultiPackStore } from '@/modules/products/storing-data/product-multi-pack/stores';
import { Check } from '@icon-park/react';
import { useParams } from 'next/navigation';
import React, { useRef, useState, useEffect } from 'react';
import { DeleteDialog } from './dialog-opsi-varian';

import * as DTO from '@/__generated__/api/dto/products-edit.dto';
// Import the separated structure
import { useFieldValidation, useVariantForm } from '@/__generated__/api/hooks/products-edit.hooks';

const FormOptions = () => {
  const params = useParams();
  const productId = params?.id as string;

  const [dialogOpen, setDialogOpen] = useState(false);

  // Use the custom hook for managing variant form state
  const {
    formattedVariants,
    isLoading: dataLoading,
    error,
    refetch,
    handleSaveVariants,
    isSaving,
  } = useVariantForm(productId);

  const { validateVariant } = useFieldValidation();

  // Ref untuk menyimpan data dari setiap DetailVariantList
  const detailVariantRefs = useRef<{ [key: number]: DTO.ProductCardValue }>({});

  // State untuk error per field per varian
  const [fieldErrors, setFieldErrors] = useState<DTO.FieldErrors>({});

  // MultiPack hooks
  const { priceMultiPackList, multiPackErrors, setMultiPackErrors } = usePriceMultiPackStore();

  // Initialize refs when data is loaded
  useEffect(() => {
    if (formattedVariants.length > 0) {
      for (const variant of formattedVariants) {
        if (!detailVariantRefs.current[variant.id]) {
          detailVariantRefs.current[variant.id] = {
            file: variant.thumbnail,
            barcode: variant.barcode,
            sku: variant.sku,
            minStock: variant.minStock,
          };
        }
      }
    }
  }, [formattedVariants]);

  // console.log(formattedVariants, 'formattedVariants')

  // Callback untuk menerima data dari DetailVariantList
  const handleDetailVariantChange = (id: number, values: DTO.ProductCardValue) => {
    detailVariantRefs.current[id] = values;

    // Clear error on change
    setFieldErrors((prev) => ({ ...prev, [id]: {} }));
  };

  const handleSave = () => {
    // Validasi MultiPackItem
    const newMultiPackErrors: typeof multiPackErrors = {};

    for (const item of priceMultiPackList) {
      if (!item || item.id === undefined) continue;
      if (!newMultiPackErrors[item.id]) {
        newMultiPackErrors[item.id] = {};
      }

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
    const errors: DTO.FieldErrors = {};

    // Validate each variant using the validation hook
    for (const variant of formattedVariants) {
      const cardValue = detailVariantRefs.current[variant.id];

      const validationData: DTO.ProductVariantValidationSchema = {
        name: variant.name,
        thumbnail: cardValue?.file ?? '',
        barcode: cardValue?.barcode ?? '',
        sku: cardValue?.sku ?? '',
        minStock: cardValue?.minStock ?? 0,
      };

      const variantErrors = validateVariant(validationData);

      if (Object.keys(variantErrors).length > 0) {
        isValid = false;
        errorMsg = Object.values(variantErrors)[0] || 'Validasi gagal';
        errors[variant.id] = variantErrors;
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

  const handleConfirmSave = async () => {
    try {
      await handleSaveVariants(formattedVariants, detailVariantRefs.current);
      setDialogOpen(false);
    } catch (error) {
      console.error('Error saving variants:', error);
      // Error handling is done in the hook
    }
  };

  if (dataLoading) {
    return (
      <div className="p-[10px] flex justify-center items-center min-h-[200px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2" />
          <Text size="sm">Memuat data produk...</Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-[10px] flex justify-center items-center min-h-[200px]">
        <div className="text-center">
          <Text size="sm" className="text-red-500 mb-2">
            {error}
          </Text>
          <Button type="button" variant="outline" onClick={() => refetch()}>
            Muat Ulang
          </Button>
        </div>
      </div>
    );
  }

  if (formattedVariants.length === 0) {
    return (
      <div className="p-[10px] flex justify-center items-center min-h-[200px]">
        <div className="text-center">
          <Text size="sm" className="text-gray-500">
            Tidak ada varian ditemukan untuk produk ini
          </Text>
        </div>
      </div>
    );
  }

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

      {formattedVariants.map((variant) => (
        <React.Fragment key={variant.id}>
          <DetailVariantList
            formattedData={{
              id: variant.id,
              name: variant.name,
              thumbnail: variant.thumbnail,
              barcode: variant.barcode,
              sku: variant.sku,
              minStock: variant.minStock,
              variantUnits: variant.variantUnits,
            }}
            onChange={(values) => handleDetailVariantChange(variant.id, values)}
            errors={fieldErrors?.[variant.id] ?? {}}
          />
        </React.Fragment>
      ))}

      <div className="mt-2 flex justify-between items-center">
        <div />
        <div className="flex gap-2">
          <Button type="button" variant="outline">
            Kembali ke Edit Produk
          </Button>
          <Button type="button" variant="success" onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Menyimpan...' : 'Simpan Varian'} <Check />
          </Button>
        </div>
      </div>

      <DeleteDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onRemove={handleConfirmSave}
        loading={isSaving}
        title="Anda akan menyimpan Varian Produk"
        description="Apakah Anda yakin akan menyimpan data Opsi Varian Produk tersebut?"
        buttonText="Ya, Saya Yakin"
      />
    </FormValidationProvider>
  );
};

export default FormOptions;
