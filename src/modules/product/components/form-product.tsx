'use client';

import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import FormPriceMultiPack from '@/modules/product/components/form-price-multi-pack';
import FormProductComposite from '@/modules/product/components/form-product-composite';
import FormProductDetail from '@/modules/product/components/form-product-detail';
import FormProductInformation from '@/modules/product/components/form-product-information';
import FormProductVariant from '@/modules/product/components/form-product-variant';
import FormTrackStockProduct from '@/modules/product/components/form-track-stock-product';
import { ArrowRight, Check } from '@icon-park/react';
import { useFormValidationContext } from '@/hooks/use-form-validator/form-validation-context';
import type { useFormValidator } from '@/hooks/use-form-validator/use-form-validator';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

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
  const { getRegisteredFields, setErrors } = useFormValidationContext();

  const handleSubmit = () => {
    const fields = getRegisteredFields();
    const { isValid, errors } = validateFields(fields);

    setErrors(errors);

    if (!isValid) return;

    router.push('/dashboard/product/add/set-first-stock');
  };

  return (
    <Card className="my-[1rem] text-[#555555] px-2 text-[#555555] font-normal">
      <CardHeader className="border-b border-[#C2C7D0]">
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
          <FormPriceMultiPack />
          <FormTrackStockProduct onTrackStockChange={onTrackStockChange} />

          {/* Footer */}
          <div className="mt-10 border-t pt-4">
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" className="mt-2 ml-[1px] flex items-center">
                Batal
              </Button>
              {toggleStatusTrackingEnabled ? (
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2 ml-[1px] flex items-center"
                  onClick={handleSubmit}
                >
                  Simpan dan Input Stok Awal
                  <ArrowRight />
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2 ml-[1px] flex items-center"
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
