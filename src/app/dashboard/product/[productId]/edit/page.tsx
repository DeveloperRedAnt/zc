'use client';

import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import FormPriceMultiPack from '@/modules/product/components/form-price-multi-pack';
import FormProductDetail from '@/modules/product/components/form-product-detail';
import FormProductInformation from '@/modules/product/components/form-product-information';
import FormTrackStockProduct from '@/modules/product/components/form-track-stock-product';
// import DetailProductPaduan from '@/modules/product/components/detail-product-paduan';
// import DetailProductVariant from '@/modules/product/components/detail-product-variant';
import { Check } from '@icon-park/react';
import React, { useState } from 'react';

export default function Index() {
  const [_toggleStatusTrackingEnabled, setToggleStatusTrackingEnabled] = useState(true);

  return (
    <>
      <Card className="my-[1rem] text-[#555555] px-2 text-[#555555] font-normal">
        <CardHeader className="border-b border-[#C2C7D0]">
          <CardTitle className="text-[1rem]"> Edit Produk </CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-sm">
          <form>
            <p> Silahkan isikan Informasi Produk Anda </p>
            <p className="text-[#F08181]"> Form bertanda (*) harus diisi </p>
            <FormProductInformation />

            {/* JIKA EDIT PRODUK PADUAN
            <DetailProductPaduan /> */}

            {/* JIKA EDIT PRODUK VARIAN */}
            {/* <DetailProductVariant isEdit={true} /> */}

            <FormProductDetail isEdit={true} />
            <FormPriceMultiPack isEdit={true} />
            <FormTrackStockProduct onTrackStockChange={setToggleStatusTrackingEnabled} />
            <div className="mt-10 border-t pt-4">
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" className="mt-2 ml-[1px] flex items-center">
                  Batal
                </Button>
                <Button type="button" variant="outline" className="mt-2 ml-[1px] flex items-center">
                  Simpan Produk
                  <Check />
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
