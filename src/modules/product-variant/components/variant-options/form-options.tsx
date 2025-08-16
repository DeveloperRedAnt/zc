'use client';

import * as DTO from '@/__generated__/api/dto/products-edit.dto';
import { useFieldValidation, useVariantForm } from '@/__generated__/api/hooks/products-edit.hooks';
import { Button } from '@/components/button/button';
import { Text } from '@/components/text/text';
import { toast } from '@/components/toast/toast';
import { FormValidationProvider } from '@/hooks/use-form-validator/form-validation-context';
import DetailVariantList from '@/modules/products-edit/components/options/detail-variant-list-option';
import { useVariantMultiPackStore } from '@/modules/products-edit/storing-data/product-variant-edit-option/multi-pack-store';
import { useSingleVariantEditStore } from '@/modules/products-edit/storing-data/product-variant-edit-option/single-variant-store';
import { Check } from '@icon-park/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useRef, useState, useEffect } from 'react';
import { DeleteDialog } from './dialog-opsi-varian';

type ApiVariantData = {
  id: number;
  name: string;
  thumbnail: string;
  barcode: string;
  sku: string;
  minStock: number;
  variantUnits: unknown[]; // ganti unknown[] dengan tipe unit yang tepat
};

type LocalVariantData = {
  variantId: number;
  name: string;
  cardValue?: DTO.ProductCardValue;
  priceMultiPackList?: unknown[]; // ganti unknown[] dengan tipe multi-pack yang tepat
};

type VariantUnit = {
  id: number;
  unitName: string;
  conversionValue: number;
  price: number;
};

type FormattedData = {
  id: number;
  name: string;
  thumbnail: string;
  barcode: string;
  sku: string;
  minStock: number;
  variantUnits: VariantUnit[];
};

const FormOptions = () => {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;
  const variantId = params?.variantId as string;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [useLocalData, setUseLocalData] = useState(false);
  const [skipApiCall, setSkipApiCall] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Fungsi helper untuk convert
  const toFormattedData = (apiData: ApiVariantData): FormattedData => {
    return {
      id: apiData.id,
      name: apiData.name,
      thumbnail: apiData.thumbnail ?? '',
      barcode: apiData.barcode ?? '',
      sku: apiData.sku ?? '',
      minStock: apiData.minStock ?? 0,
      variantUnits: (apiData.variantUnits as VariantUnit[]) ?? [],
    };
  };

  const {
    initializeSingleVariant,
    updateCardValue,
    updateMultiPack,
    setMultiPackErrors,
    saveSingleVariant,
    hasValidData,
    getCurrentVariant,
    clearSingleVariant,
  } = useSingleVariantEditStore();

  // Only call API if we don't have local data
  const {
    formattedVariants,
    isLoading: dataLoading,
    error,
    refetch,
  } = useVariantForm(skipApiCall ? '' : productId);

  const { validateVariant } = useFieldValidation();

  const detailVariantRef = useRef<DTO.ProductCardValue | null>(null);
  const [fieldErrors, setFieldErrors] = useState<DTO.FieldErrors>({});

  // Check localStorage on component mount
  useEffect(() => {
    if (productId && variantId) {
      const currentVariantId = parseInt(variantId);
      const hasValid = hasValidData(productId, currentVariantId);

      if (hasValid) {
        setUseLocalData(true);
        setSkipApiCall(true);

        // Initialize ref with stored data
        const currentVariant = getCurrentVariant();
        if (currentVariant) {
          detailVariantRef.current = currentVariant.cardValue;
        }
      } else {
        setUseLocalData(false);
        setSkipApiCall(false);
        // Clear any stale data
        clearSingleVariant();
      }
    }
  }, [productId, variantId, hasValidData, getCurrentVariant, clearSingleVariant]);

  // Initialize variant from API data when it's loaded
  useEffect(() => {
    if (formattedVariants && formattedVariants.length > 0 && !useLocalData && variantId) {
      const currentVariantId = parseInt(variantId);
      const currentVariantData = formattedVariants.find((v) => v.id === currentVariantId);

      if (currentVariantData) {
        initializeSingleVariant(productId, currentVariantId, {
          name: currentVariantData.name,
          thumbnail: currentVariantData.thumbnail || '',
          barcode: currentVariantData.barcode || '',
          sku: currentVariantData.sku || '',
          minStock: currentVariantData.minStock ?? 0,
          variantUnits: currentVariantData.variantUnits || [],
        });

        detailVariantRef.current = {
          file: currentVariantData.thumbnail || '',
          barcode: currentVariantData.barcode || '',
          sku: currentVariantData.sku || '',
          minStock: currentVariantData.minStock ?? 0,
        };
      }
    }
  }, [formattedVariants, useLocalData, variantId, productId, initializeSingleVariant]);

  const handleDetailVariantChange = (values: DTO.ProductCardValue) => {
    detailVariantRef.current = values;
    updateCardValue(values);
    setFieldErrors({});
  };

  const handleSave = () => {
    const currentVariantId = parseInt(variantId);
    const currentVariant = getCurrentVariant();

    if (!currentVariant) {
      toast.error('Data variant tidak ditemukan');
      return;
    }

    // Validate multi-pack data for current variant only
    const { priceMultiPackList } = useVariantMultiPackStore
      .getState()
      .getVariantData(currentVariantId);
    const newMultiPackErrors: Record<number, { [field: string]: string }> = {};

    for (const item of priceMultiPackList) {
      if (!item || item.id === undefined) continue;
      if (!newMultiPackErrors[item.id]) {
        newMultiPackErrors[item.id] = {};
      }

      const errorObj = newMultiPackErrors[item.id]!;
      if (!item.unitName) {
        errorObj.unitName = 'Nama satuan wajib diisi';
      }
      if (item.conversionValue === undefined || item.conversionValue <= 0) {
        errorObj.conversionValue = 'Kuantitas harus lebih dari 0';
      }
      if (item.price === undefined || item.price <= 0) {
        errorObj.price = 'Harga harus lebih dari 0';
      }
    }

    // Update errors to both stores
    useVariantMultiPackStore.getState().setMultiPackErrors(currentVariantId, newMultiPackErrors);
    setMultiPackErrors(newMultiPackErrors);

    if (Object.values(newMultiPackErrors).some((errObj) => Object.keys(errObj).length > 0)) {
      toast.error('Validasi Multi Satuan gagal', {
        description: 'Periksa kembali data multi satuan Anda.',
        className: 'bg-red-500 text-white',
      });
      return;
    }

    // Validate card data
    const cardValue = detailVariantRef.current;
    if (!cardValue) {
      toast.error('Data kartu variant belum lengkap');
      return;
    }

    const validationData: DTO.ProductVariantValidationSchema = {
      name: currentVariant.name,
      thumbnail: cardValue.file,
      barcode: cardValue.barcode,
      sku: cardValue.sku,
      minStock: cardValue.minStock,
    };

    const variantErrors = validateVariant(validationData);

    if (Object.keys(variantErrors).length > 0) {
      const errorMsg = Object.values(variantErrors)[0] || 'Validasi gagal';
      setFieldErrors({ [currentVariantId]: variantErrors });

      toast.error('Validasi gagal', {
        description: errorMsg,
        className: 'bg-red-500 text-white',
      });
      return;
    }

    setFieldErrors({});
    setDialogOpen(true);
  };

  const handleConfirmSave = async () => {
    try {
      setIsSaving(true);
      const currentVariantId = parseInt(variantId);

      // Get multi-pack data for current variant
      const multiPackStore = useVariantMultiPackStore.getState();
      const variantMultiPackData = multiPackStore.getVariantData(currentVariantId);

      // Get card data
      const cardValue = detailVariantRef.current;

      if (!cardValue) {
        toast.error('Data varian belum lengkap. Silakan lengkapi data terlebih dahulu.');
        setIsSaving(false);
        return;
      }
      if (!variantMultiPackData) {
        toast.error('Data multi-pack belum tersedia untuk varian ini.');
        setIsSaving(false);
        return;
      }

      // Update the single variant store with latest data
      updateCardValue(cardValue);
      updateMultiPack(variantMultiPackData.priceMultiPackList, variantMultiPackData.isWholesale);
      setMultiPackErrors(variantMultiPackData.multiPackErrors);

      // Save to localStorage
      await saveSingleVariant();

      setDialogOpen(false);
      toast.success('Varian berhasil disimpan', {
        description: 'Data varian telah disimpan ke localStorage.',
        className: 'bg-green-500 text-white',
      });
      router.push(`/dashboard/products/${productId}/edit`);
    } catch (error) {
      console.error('Error saving variant:', error);
      toast.error('Gagal menyimpan varian', {
        description: 'Terjadi kesalahan saat menyimpan data.',
        className: 'bg-red-500 text-white',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Loading state
  if (!useLocalData && !skipApiCall && dataLoading) {
    return (
      <div className="p-[10px] flex justify-center items-center min-h-[200px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2" />
          <Text size="sm">Memuat data produk...</Text>
        </div>
      </div>
    );
  }

  // Error state
  if (!useLocalData && !skipApiCall && error) {
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

  // Get current variant to display
  let currentVariantData: ApiVariantData | LocalVariantData | null = null;

  const currentVariantId = parseInt(variantId);

  if (useLocalData) {
    // Get from single variant store
    currentVariantData = getCurrentVariant();
  } else {
    // Get from API data
    const apiVariant = formattedVariants?.find((variant) => variant.id === currentVariantId);
    if (apiVariant) {
      currentVariantData = {
        id: apiVariant.id,
        name: apiVariant.name,
        thumbnail: apiVariant.thumbnail || '',
        barcode: apiVariant.barcode || '',
        sku: apiVariant.sku || '',
        minStock: apiVariant.minStock ?? 0,
        variantUnits: apiVariant.variantUnits || [],
      };
    }
  }

  // If no variant found with the specified ID
  if (!currentVariantData) {
    return (
      <div className="p-[10px] flex justify-center items-center min-h-[200px]">
        <div className="text-center">
          <Text size="sm" className="text-gray-500">
            Variant dengan ID {variantId} tidak ditemukan
          </Text>
          <Button
            type="button"
            variant="outline"
            className="mt-2"
            onClick={() => router.push(`/dashboard/products/${productId}/edit`)}
          >
            Kembali ke Edit Produk
          </Button>
        </div>
      </div>
    );
  }

  // Helper function to get variant data in correct format
  const getVariantDataForComponent = () => {
    if (useLocalData && currentVariantData && 'variantId' in currentVariantData) {
      const singleVariant: LocalVariantData = currentVariantData;
      return {
        id: singleVariant.variantId,
        name: singleVariant.name,
        thumbnail: singleVariant.cardValue?.file || '',
        barcode: singleVariant.cardValue?.barcode || '',
        sku: singleVariant.cardValue?.sku || '',
        minStock: singleVariant.cardValue?.minStock ?? 0,
        variantUnits: singleVariant.priceMultiPackList || [],
      };
    }
    return currentVariantData as ApiVariantData;
  };

  const variantForComponent = getVariantDataForComponent();

  return (
    <FormValidationProvider>
      <div className="p-[10px] flex flex-col gap-2">
        <div className="flex flex-row justify-between w-full gap-2">
          <div>
            <Text size="sm" className="mb-2">
              Silahkan isikan Informasi Opsi Varian: <strong>{variantForComponent.name}</strong>
              {useLocalData && (
                <span className="ml-2 text-blue-500 text-xs">(Menggunakan data tersimpan)</span>
              )}
            </Text>
            <Text size="sm" className="text-red">
              Form bertanda (*) harus diisi
            </Text>
          </div>
        </div>
      </div>

      {/* Render only the specific variant */}
      <DetailVariantList
        key={variantForComponent.id}
        formattedData={toFormattedData(variantForComponent)}
        onChange={handleDetailVariantChange}
        errors={fieldErrors?.[currentVariantId] ?? {}}
      />

      <div className="mt-2 flex justify-between items-center">
        <div />
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/dashboard/products/${productId}/edit`)}
          >
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
        description={`Apakah Anda yakin akan menyimpan data Opsi Varian "${variantForComponent.name}"?`}
        buttonText="Ya, Saya Yakin"
      />
    </FormValidationProvider>
  );
};

export default FormOptions;
