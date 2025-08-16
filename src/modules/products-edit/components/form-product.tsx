// form-product.tsx
'use client';

import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import type { useFormValidator } from '@/hooks/use-form-validator/use-form-validator';
import FormPriceMultiPack from '@/modules/products-edit/components/form-price-multi-pack';
import FormProductComposite from '@/modules/products-edit/components/form-product-composite';
import FormProductDetail from '@/modules/products-edit/components/form-product-detail';
import FormProductInformation from '@/modules/products-edit/components/form-product-information';
import FormProductVariant from '@/modules/products-edit/components/form-product-variant';
import FormTrackStockProduct from '@/modules/products-edit/components/form-track-stock-product';
import { Check } from '@icon-park/react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { useGetProductDetail, useUpdateProduct } from '@/__generated__/api/hooks/product.hooks';
import { useToast } from '@/components/toast/toast';
import { useFormValidationContext } from '@/hooks/use-form-validator/form-validation-context';
import { useProductCompositeStore } from '@/modules/products-edit/storing-data/product-composite/stores';
import { useProductDetailStore } from '@/modules/products-edit/storing-data/product-detail/stores';
import { useProductInformationStore } from '@/modules/products-edit/storing-data/product-information/stores';
import { usePriceMultiPackStore } from '@/modules/products-edit/storing-data/product-multi-pack/stores';
import { useProductVariantStore } from '@/modules/products-edit/storing-data/product-variant/store';
import { useTrackStockProductStore } from '@/modules/products-edit/storing-data/track-stock-product/stores';
import {
  createEnhancedFormDataInput,
  mapFormDataToApiPayload,
} from '@/modules/products-edit/utils/apiHelper';
import { format } from 'date-fns';
import { useParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';

type FormProductFormProps = {
  toggleStatusTrackingEnabled: boolean;
  onTrackStockChange: (enabled: boolean) => void;
  validateFields: ReturnType<typeof useFormValidator>['validateFields'];
  router: AppRouterInstance;
};

export default function FormProductForm({
  onTrackStockChange,
  validateFields,
  router,
}: FormProductFormProps) {
  const params = useParams();
  const productId = Number(params?.id);

  // Use the enhanced hook that includes localStorage integration
  const { data: productDetailData } = useGetProductDetail({ id: productId });

  // Get product data for current product ID with proper selectors to avoid infinite loops
  const productInfo = useProductInformationStore((state) => state.products[productId]) ?? {
    thumbnailFile: null,
    thumbnailUrl: null,
    productName: '',
    isActiveProduct: true,
    isFavorite: false,
    selectedTags: [],
  };
  const productDetail = useProductDetailStore((state) => state.products[productId]) ?? {};
  const multiPackData = usePriceMultiPackStore((state) => state.products[productId]) ?? {
    priceMultiPackList: [],
  };
  const trackStockData = useTrackStockProductStore((state) => state.products[productId]) ?? {};
  const composite = useProductCompositeStore((state) => state.products[productId]) ?? {};
  const variants = useProductVariantStore((state) => state.productVariantsStore[productId]) ?? [];

  // Extract store actions separately to avoid re-renders
  const setProductName = useProductInformationStore((state) => state.setProductName);
  const setIsActiveProduct = useProductInformationStore((state) => state.setIsActiveProduct);
  const setIsFavorite = useProductInformationStore((state) => state.setIsFavorite);
  const setThumbnailUrl = useProductInformationStore((state) => state.setThumbnailUrl);
  const setSelectedTags = useProductInformationStore((state) => state.setSelectedTags);
  const setProductDetailAction = useProductDetailStore((state) => state.setProductDetail);
  const setTrackStock = useTrackStockProductStore((state) => state.setTrackStock);
  const setWholesale = usePriceMultiPackStore((state) => state.setWholesale);
  const setMultiPackList = usePriceMultiPackStore((state) => state.setMultiPackList);
  const setComposite = useProductCompositeStore((state) => state.setComposite);
  const setProductVariants = useProductVariantStore((state) => state.setProductVariants);

  // Map productDetailData to stores when data is available
  // biome-ignore lint/correctness/useExhaustiveDependencies: Zustand setters are stable
  useEffect(() => {
    if (!productDetailData) return;

    // Map to Product Information Store
    setProductName(productId, productDetailData.name || '');
    setIsActiveProduct(productId, productDetailData.is_active ?? true);
    setIsFavorite(productId, productDetailData.is_favorite ?? false);
    setThumbnailUrl(productId, productDetailData.thumbnail || null);

    // Map tags
    if (Array.isArray(productDetailData.tags) && productDetailData.tags.length > 0) {
      const mappedTags = productDetailData.tags.map((tag) => ({
        label: tag.name,
        value: tag.id,
      }));
      setSelectedTags(productId, mappedTags);
    }

    // Map barcode, sku, wholesale, multipack dari variant pertama
    const firstVariant = productDetailData.variants?.[0];
    if (firstVariant) {
      const barcode = firstVariant.barcode || '';
      const sku = firstVariant.sku_code || '';
      setWholesale(productId, firstVariant.is_wholesale ?? false);

      const multiPackList =
        firstVariant.variant_units?.map((unit) => ({
          id: Number(unit.id) || Number(Date.now()),
          itemName: unit.unit_name,
          quantity: Number(unit.conversion_value),
          price: Number(
            typeof unit.price === 'string' ? unit.price.replace(/[Rp.,\s]/g, '') : unit.price
          ),
        })) ?? [];
      setMultiPackList(productId, multiPackList);

      // Map to Product Detail Store
      setProductDetailAction(productId, {
        content: productDetailData.content || '',
        package: productDetailData.package || '',
        barcode,
        sku,
        unit_id: productDetailData.unit?.id || null,
        unit_string: productDetailData.unit?.name || '',
      });
    }

    // Track stock
    const trackStockUpdateData: Partial<{
      is_track_stock: boolean;
      current_stock: number;
      is_enable_expired_reminder: boolean;
      expired_reminder_in_days: number | null;
      expired_reminder_in_date: string | null;
    }> = { current_stock: productDetailData.current_stock };

    if (productDetailData.stock_tracking) {
      trackStockUpdateData.is_track_stock = productDetailData.stock_tracking.is_enabled;
    }

    if (productDetailData.expired_reminder) {
      trackStockUpdateData.is_enable_expired_reminder =
        productDetailData.expired_reminder.is_enabled;

      const countdown = productDetailData.expired_reminder.countdown;
      let expiredDays: number | null = null;
      if (typeof countdown === 'number') expiredDays = countdown;
      else if (typeof countdown === 'string') {
        const match = countdown.match(/(\d+)/);
        expiredDays = match ? Number(match[1]) : null;
      }

      trackStockUpdateData.expired_reminder_in_days = expiredDays;
      trackStockUpdateData.expired_reminder_in_date = format(new Date(), 'yyyy-MM-dd');
    }

    if (Object.keys(trackStockUpdateData).length > 0) {
      setTrackStock(productId, trackStockUpdateData);
    }

    // Variants list (semua variant, bukan cuma pertama)
    if (productDetailData.variants?.length) {
      const cleanedVariants = productDetailData.variants.map((variant) => ({
        ...variant,
        variant_units: variant.variant_units?.map((unit) => ({
          ...unit,
          price: typeof unit.price === 'string' ? unit.price.replace(/[Rp.,\s]/g, '') : unit.price,
        })),
      }));
      setProductVariants(productId.toString(), cleanedVariants);
    }

    // Composite
    if (productDetailData.composite) {
      const compositeData = {
        ...productDetailData.composite,
        current_stock: +productDetailData.composite.current_stock || 0,
        components: (productDetailData.composite.components || []).map(({ name, ...rest }) => ({
          name: name ?? null,
          ...rest,
        })),
      };
      setComposite(productId, compositeData);
    }
  }, [
    productDetailData,
    productDetailData?.variants, // tambahin ini biar aman
    productId,
    setProductName,
    setIsActiveProduct,
    setIsFavorite,
    setThumbnailUrl,
    setSelectedTags,
    setProductDetailAction,
    setTrackStock,
    setWholesale,
    setMultiPackList,
    setComposite,
  ]);

  const toast = useToast();

  const { getRegisteredFields, setErrors } = useFormValidationContext();

  const { mutate: updateProduct, isPending } = useUpdateProduct();

  const finalPayload = useMemo(() => {
    const payload = {
      ...productInfo,
      ...productDetail,
      ...trackStockData,
      current_stock:
        trackStockData &&
        'current_stock' in trackStockData &&
        typeof trackStockData.current_stock === 'number'
          ? trackStockData.current_stock
          : 0,
      thumbnail: productInfo.thumbnailUrl ?? '',
      default_prices: [],
      is_wholesale: false,
      composite,
      variants: variants,
      id: productId,
      priceMultiPackList: multiPackData.priceMultiPackList ?? [],
      type: productDetailData?.type === 'simple' ? 'single' : productDetailData?.type, // Convert 'simple' to 'single'
    };

    // Use the enhanced form data input creator for proper typing
    return createEnhancedFormDataInput(payload);
  }, [
    productInfo,
    productDetail,
    composite,
    variants,
    trackStockData,
    productId,
    multiPackData,
    productDetailData?.type,
  ]);

  const handleSubmit = () => {
    const fields = getRegisteredFields();
    const { isValid, errors } = validateFields(fields);

    setErrors(errors);

    if (!isValid) return;

    const mappedData = mapFormDataToApiPayload(finalPayload);

    updateProduct(
      {
        body: mappedData,
      },
      {
        onSuccess: () => {
          toast.showSuccess('Tersimpan', 'Produk Paduan Anda telah berhasil disimpan');
          // Clear localStorage after successful save
          if (typeof window !== 'undefined') {
            localStorage.removeItem('Single-variant-edit-data');
          }
          router.push('/dashboard/products');
        },
        onError: (error) => {
          toast.showError('Gagal', `Produk Anda gagal disimpan karena ${error.message}`);
        },
      }
    );
  };

  const handleOutPage = () => {
    router.push('/dashboard/products');
  };

  return (
    <Card className="my-[1rem] text-[#555555] px-2 font-normal">
      <CardHeader className="border-b-gray-200">
        <CardTitle className="text-[1rem]"> Edit Produk </CardTitle>
      </CardHeader>
      <CardContent className="p-4 text-sm">
        <form>
          <p> Silahkan isikan Informasi Produk Anda </p>
          <p className="text-danger"> Form bertanda (*) harus diisi </p>
          <FormProductInformation productId={productId} />

          {productDetailData?.type === 'composite' ? (
            <FormProductComposite productId={productId} />
          ) : (
            <FormProductVariant />
          )}

          <FormProductDetail productId={productId} />
          <FormPriceMultiPack productId={productId} />
          <FormTrackStockProduct productId={productId} onTrackStockChange={onTrackStockChange} />

          {/* Footer */}
          <div className="mt-10 border-t-gray-200 pt-4">
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                className="mt-2 ml-[1px] flex items-center"
                onClick={handleOutPage}
              >
                Batal
              </Button>
              <Button
                type="button"
                variant="outline"
                className="mt-2 ml-[1px] flex items-center bg-[#75BF85] text-white"
                onClick={handleSubmit}
                isLoading={isPending}
              >
                Simpan Produk
                <Check />
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
