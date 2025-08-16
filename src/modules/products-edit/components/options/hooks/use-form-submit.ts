import { useCreateVariantOption } from '@/__generated__/api/hooks/variant-options.hooks';
import { toast } from '@/components/toast/toast';
import { usePriceMultiPackStore } from '@/modules/product-variant/components/variant-options/multi-pack-stores';
import { useVariantOptionsStore } from '@/modules/products-edit/components/options/stores';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export const useFormSubmit = () => {
  const params = useParams();
  const router = useRouter();
  const productId = Number(params?.id);

  const variantStore = useVariantOptionsStore();
  const multiPackStore = usePriceMultiPackStore();

  const [isOpenVariant, onOpenChangeVariant] = useState(false);
  const [isOpenConfirm, onOpenChangeConfirm] = useState(false);

  const createVariantOption = useCreateVariantOption({
    onSuccess: (response) => {
      const variantId = response.id;
      toast.success('Tersimpan!', {
        description: 'Opsi Varian Produk telah berhasil disimpan',
      });
      onOpenChangeConfirm(false);
      if (variantId) {
        setTimeout(() => {
          router.push(
            `/dashboard/products/${productId}/edit/variant-options/${variantId}/create/init-stock`
          );
        }, 1000);
      }
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleSave = () => {
    if (!variantStore.validateForm()) {
      toast.error('Gagal!', {
        description: 'Form bertanda (*) harus diisi',
      });
      return;
    }

    if (variantStore.isDuplicateCombination()) {
      onOpenChangeVariant(true);
      return;
    }
    onOpenChangeConfirm(true);
  };

  const handleSubmit = () => {
    // Build variant_units dari multi pack store
    const variant_units = multiPackStore.priceMultiPackList.map((item) => ({
      id: item.id || `vu_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      unit_name: item.unit_name,
      conversion_value: item.conversion_value,
      price: item.price,
    }));

    // Build payload dari store
    const payload = variantStore.buildPayload(productId, variant_units, multiPackStore.isWholesale);

    createVariantOption.mutate({
      productId,
      payload,
    });
  };

  return {
    handleSubmit,
    isSubmitting: createVariantOption.isPending,
    hasErrors: Object.keys(variantStore.validationErrors).length > 0,
    generalError: variantStore.validationErrors.general,
    isOpenVariant,
    onOpenChangeVariant,
    isOpenConfirm,
    onOpenChangeConfirm,
    handleSave,
  };
};
