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
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Index() {
  const [toggleStatusTrackingEnabled, setToggleStatusTrackingEnabled] = useState(true);
  const router = useRouter();

  return (
    <>
      <Card className="my-[1rem] text-[#555555] px-2 text-[#555555] font-normal">
        <CardHeader className="border-b border-[#C2C7D0]">
          <CardTitle className="text-[1rem]"> Tambah Produk </CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-sm">
          <form>
            <p> Silahkan isikan Informasi Produk Anda </p>
            <p className="text-[#F08181]"> Form bertanda (*) harus diisi </p>
            <FormProductInformation />
            <FormProductComposite />
            <FormProductVariant />
            <FormProductDetail />
            <FormPriceMultiPack />
            <FormTrackStockProduct onTrackStockChange={setToggleStatusTrackingEnabled} />
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
                    onClick={() => router.push('/dashboard/product/add/set-first-stock')}
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
    </>
  );
}
