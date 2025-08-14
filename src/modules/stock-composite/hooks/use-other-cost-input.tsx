import { usePostCompositeStock } from '@/__generated__/api/hooks/init-first-stock/composite.hooks';
import { useGetProductDetail } from '@/__generated__/api/hooks/product.hooks';
import { useOrganizationStore } from '@/store/organization-store';
import { getStoreID } from '@/utils/cookies-helper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormValues } from '../types/form-values';
import { formValuesSchema } from '../types/form-values';

export function useCompositeStockForm(productId: number) {
  const storeId = getStoreID();

  const {
    data: productDetail,
    error: productDetailError,
    isLoading: productDetailLoading,
  } = useGetProductDetail({ id: productId }, storeId);

  const [openSaveDialogComposite, setOpenSaveDialogComposite] = useState(false);

  const [formData, setFormData] = useState<FormValues | null>(null);

  const org = useOrganizationStore((state) => state.organization);

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formValuesSchema),
    defaultValues: {
      batch_stock: '',
      other_cost: '',
      store_id: '',
      expired_date: undefined,
      stock_date: undefined,
    },
  });

  const productMixes = useMemo(() => {
    return (
      productDetail?.composite?.components?.map((comp) => ({
        name: comp.name ?? comp.product_name ?? '',
        qty: comp.quantity !== undefined && comp.quantity !== null ? String(comp.quantity) : '',
      })) ?? []
    );
  }, [productDetail]);

  const productMixesPayload = useMemo(() => {
    return (
      productDetail?.composite?.components?.map((comp) => ({
        id: comp.id,
        product_id: comp.product_id,
        product_variant_id: comp.product_variant_id ?? null,
        name: comp.name ?? comp.product_name ?? '',
        quantity: comp.quantity ?? '',
      })) ?? []
    );
  }, [productDetail]);

  const productionPerBatch = productDetail?.composite?.production_per_batch ?? 0;
  const purchase_price = productDetail?.composite?.purchase_price ?? 0;

  const batchStock = watch('batch_stock');

  const totalInitialStock = useMemo(() => {
    return Number(batchStock) * productionPerBatch;
  }, [batchStock, productionPerBatch]);

  const organizationOptions = useMemo(() => {
    return org ? [{ value: String(org.id), label: org.name }] : [];
  }, [org]);

  const {
    mutate: saveCompositeStock,
    isPending: isSaving,
    data: saveResult,
    error: saveError,
  } = usePostCompositeStock();

  const popUpClikSaveDialogComposite = (data: FormValues) => {
    setFormData(data);
    setOpenSaveDialogComposite(true);
  };

  const handleCancel = () => setOpenSaveDialogComposite(false);

  const saveFirstStock = () => {
    if (!formData) return;

    // Helper format tanggal
    const formatDate = (date?: Date | string) => {
      if (!date) return '';
      if (typeof date === 'string') return date.slice(0, 10);
      return date.toISOString().slice(0, 10);
    };

    const products = productMixesPayload.map((mix) => {
      const production_per_batch = Number(productionPerBatch);
      const stock_batch_realization = Number(formData.batch_stock);

      return {
        product_id: Number(mix.product_id),
        product_variant_id: Number(mix.product_variant_id),
        store_id: Number(formData.store_id),
        production_per_batch,
        stock_batch_realization,
        quantity: production_per_batch * stock_batch_realization,
        purchase_price: Number(purchase_price),
        purchase_date: formatDate(formData.stock_date),
        expired_at: formatDate(formData.expired_date),
      };
    });

    const payload = {
      product_type: 'composite' as const,
      stock_date: formatDate(formData.stock_date),
      other_cost: Number(formData.other_cost) || 0,
      note: `INIT-STOCK-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
      stock_reason_code_id: 1,
      type: 'in' as const,
      products,
    };
    saveCompositeStock({ body: payload, store_id: Number(formData.store_id) });
    setOpenSaveDialogComposite(false);
  };

  return {
    org,
    control,
    errors,
    handleSubmit,
    getValues,
    popUpClikSaveDialogComposite,
    setOpenSaveDialogComposite,
    handleCancel,
    saveFirstStock,
    openSaveDialogComposite,
    totalInitialStock,
    organizationOptions,
    purchase_price,
    isLoading: productDetailLoading,
    error: productDetailError,
    productionPerBatch,
    productMixes,
    productMixesPayload,
    saveCompositeStock,
    isSaving,
    saveResult,
    saveError,
    productDetail,
  };
}
