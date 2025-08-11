'use client';

import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import type { useFormValidator } from '@/hooks/use-form-validator/use-form-validator';
import FormPriceMultiPack from '@/modules/product/components/form-price-multi-pack';
import FormProductComposite from '@/modules/product/components/form-product-composite';
import FormProductDetail from '@/modules/product/components/form-product-detail';
import FormProductInformation from '@/modules/product/components/form-product-information';
import FormProductVariant from '@/modules/product/components/form-product-variant';
import FormTrackStockProduct from '@/modules/product/components/form-track-stock-product';
import { ArrowRight, Check } from '@icon-park/react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import * as DTO from '@/__generated__/api/dto';
import { useCreateProduct } from '@/__generated__/api/hooks/product.hooks';
import { useToast } from '@/components/toast/toast';
import { useFormValidationContext } from '@/hooks/use-form-validator/form-validation-context';
import { useProductVariantStore } from '@/modules/product-variant/store';
import { mapFormDataToApiPayload } from '@/modules/product/utils/apiHelper';
import { useProductCompositeStore } from '@/modules/products/storing-data/product-composite/stores';
import { useProductDetailStore } from '@/modules/products/storing-data/product-detail/stores';
import { useProductInformationStore } from '@/modules/products/storing-data/product-information/stores';
import { usePriceMultiPackStore } from '@/modules/products/storing-data/product-multi-pack/stores';
import { useProductTaxStore } from '@/modules/products/storing-data/product-tax/stores';
import { useTrackStockProductStore } from '@/modules/products/storing-data/track-stock-product/stores';
import { useMemo } from 'react';
import FormTax from './form-tax';

type FormProductFormProps = {
  toggleStatusTrackingEnabled: boolean;
  onTrackStockChange: (enabled: boolean) => void;
  validateFields: ReturnType<typeof useFormValidator>['validateFields'];
  router: AppRouterInstance;
};

export default function FormProductForm({
  toggleStatusTrackingEnabled,
  onTrackStockChange,
  validateFields,
  router,
}: FormProductFormProps) {
  const productInfo = useProductInformationStore((state) => state);
  const productDetail = useProductDetailStore((state) => state);
  const multiPack = usePriceMultiPackStore((state) => state.priceMultiPackList);
  const isWholesale = usePriceMultiPackStore((state) => state.isWholesale);
  const trackStock = useTrackStockProductStore((state) => state.data);
  const composite = useProductCompositeStore((state) => state.data);
  const variants = useProductVariantStore((state) => state.finalData);
  const isTaxable = useProductTaxStore((state) => state.isTax);

  const toast = useToast();

  const { getRegisteredFields, setErrors } = useFormValidationContext();

  const { mutate: createProduct, isPending } = useCreateProduct();

  // Gabungkan semua store
  //@ts-ignore
  const finalPayload = useMemo(() => {
    return {
      ...productInfo,
      ...productDetail,
      ...trackStock,
      default_prices: multiPack,
      composite,
      variants: variants,
      is_wholesale: isWholesale,
      is_taxable: isTaxable,
    };
  }, [
    productInfo,
    productDetail,
    multiPack,
    composite,
    variants,
    trackStock,
    isWholesale,
    isTaxable,
  ]);
  const handleSubmit = () => {
    const fields = getRegisteredFields();
    const { isValid, errors } = validateFields(fields);

    setErrors(errors);

    if (!isValid) return;

    const mappedData = mapFormDataToApiPayload(finalPayload);

    createProduct(
      {
        body: mappedData,
      },
      {
        onSuccess: (data: DTO.CreateProductResponseData) => {
          const productId =
            data.products && data.products.length > 0 ? data.products[0]?.product_id : null;
          toast.showSuccess('Tersimpan', 'Produk Paduan Anda telah berhasil disimpan');
          if (productId) {
            router.push(`/dashboard/products/${productId}/create/set-first-stock`);
          }
        },
        onError: (error) => {
          toast.showError('Gagal', `Produk Anda gagal disimpan karena ${error.message}`);
        },
      }
    );

    //
  };

  return (
    <Card className="my-[1rem] text-[#555555] px-2 text-[#555555] font-normal">
      <CardHeader className="border-b-gray-200">
        <CardTitle className="text-[1rem]"> Tambah Produk </CardTitle>
      </CardHeader>
      <CardContent className="p-4 text-sm">
        <form>
          <p> Silahkan isikan Informasi Produk Anda </p>
          <p className="text-[#F08181]"> Form bertanda (*) harus diisi </p>

          {/* Subform-modular yang masing-masing terhubung ke validation context */}
          <FormProductInformation />
          <FormProductComposite />
          <FormProductVariant />
          <FormProductDetail />
          <FormTax />
          <FormPriceMultiPack />
          <FormTrackStockProduct onTrackStockChange={onTrackStockChange} />

          {/* Footer */}
          <div className="mt-10 border-t-gray-200 pt-4">
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" className="mt-2 ml-[1px] flex items-center">
                Batal
              </Button>
              {toggleStatusTrackingEnabled ? (
                <Button
                  type="button"
                  variant="primary"
                  className="mt-2 ml-[1px] flex items-center"
                  onClick={handleSubmit}
                  isLoading={isPending}
                >
                  Simpan dan Input Stok Awal
                  <ArrowRight />
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2 ml-[1px] flex items-center"
                  onClick={handleSubmit}
                >
                  Simpan Produk
                  <Check />
                </Button>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
