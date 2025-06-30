import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import { InformationText } from '@/components/information-text/information-text';
import { Label } from '@/components/label/label';
import { Switch } from '@/components/switch/switch';
import { Edit, Plus, Right } from '@icon-park/react';
import DOMPurify from 'dompurify';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Index({ isEdit = false }: { isEdit?: boolean }) {
  const router = useRouter();
  const [toggleVariantTableAccordion, setToggleVariantTableAccordion] = useState(false);

  return (
    <>
      <Card className="text-[#555555] px-2 my-[1rem]">
        <CardHeader className="border-b border-[#C2C7D0] flex-row flex justify-between items-center">
          <CardTitle className="text-[1rem]"> Varian Produk </CardTitle>
          {isEdit && (
            <div className="flex">
              <Button
                type="button"
                variant="outline"
                className="text-[#555555]"
                onClick={() => router.push('/dashboard/product/add/product-variant')}
              >
                <Plus />
                Tambah Opsi Varian
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-4 text-sm">
          <InformationText
            text={DOMPurify.sanitize(
              'Menambah varian dari produk Anda. Jika Anda menambahkan varian, maka <strong>Barcode, Kode SKU,</strong> dan <strong>Harga Multi Satuan</strong> akan ditentukan dari varian Anda'
            )}
          />
          <div className="mt-4">
            <Card className="text-[#555555] px-2 my-[1rem]">
              <CardHeader className="border-b border-[#C2C7D0] flex-row flex justify-between items-center">
                <CardTitle className="text-[1rem]"> Merah - Small </CardTitle>
                {isEdit ? (
                  <div className="flex">
                    <Button
                      type="button"
                      variant="outline"
                      className="text-[#555555]"
                      onClick={() => router.push('/dashboard/product/add/product-variant')}
                    >
                      <Edit />
                      Edit Opsi Varian
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-[0.2rem] text-[0.75rem] bg-[#ECFDF5] text-[#75BF85] rounded w-[4.4rem]">
                    Aktif
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-4 text-sm">
                <div className="flex items-start gap-8">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setToggleVariantTableAccordion(!toggleVariantTableAccordion)}
                    className="my-auto hover:bg-[none]"
                  >
                    <div
                      className={`transform transition-transform duration-500 ${
                        toggleVariantTableAccordion ? 'rotate-90' : ''
                      }`}
                    >
                      <Right />
                    </div>
                  </Button>
                  <img
                    src={'/assets/zycas/example-product.png'}
                    alt="Product"
                    className={`rounded object-cover ${
                      isEdit ? 'w-[6.7rem] h-[6.7rem]' : 'w-[3.2rem] h-[3.2rem]'
                    }`}
                  />
                  <div className="flex-1 space-y-10 my-auto">
                    <div className="flex w-full gap-4">
                      <div className="text-[14px] w-1/2">
                        <p className="font-semibold"> Barcode: </p>
                        <p className="font-[400] mt-1"> 78882271827781 </p>
                      </div>
                      <div className="text-[14px] w-1/2">
                        <p className="font-semibold"> Kode SKU: </p>
                        <p className="font-[400] mt-1"> 557781235 </p>
                      </div>
                    </div>
                    {isEdit && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex flex-col gap-6">
                          <div className="flex items-center gap-2">
                            <Switch id="isActiveVariant" defaultChecked />
                            <Label htmlFor="isActiveVariant"> Varian Aktif </Label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {toggleVariantTableAccordion && (
                  <>
                    <div className="mt-4 pl-[5rem] py-4 space-y-2 border-b border-[#C2C7D0]">
                      <p className="mb-1"> Harga Multi Satuan </p>
                      <div className="flex-1 space-y-10">
                        <div className="flex flex-wrap w-full">
                          <div className="text-[14px] w-1/2 mt-6">
                            <p className="font-semibold"> Eceran - 1 plastik: </p>
                            <p className="font-[400] mt-1"> Rp 35.000 </p>
                          </div>
                          <div className="text-[14px] w-1/2 mt-6">
                            <p className="font-semibold"> Dus - 24 plastik: </p>
                            <p className="font-[400] mt-1"> Rp 840.000 </p>
                          </div>
                          <div className="text-[14px] w-1/2 mt-6">
                            <p className="font-semibold"> Dozen - 288 plastik: </p>
                            <p className="font-[400] mt-1"> Rp 10.200.000 </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 pl-[5rem] py-4 space-y-2 border-b border-[#C2C7D0]">
                      <p className="mb-1"> Stok Produk </p>
                      <div className="flex-1 space-y-10">
                        <div className="flex flex-wrap w-full">
                          <div className="text-[14px] w-1/2 mt-6">
                            <p className="font-semibold"> Peringatan Stok Minimum: </p>
                            <p className="font-[400] mt-1"> 0 Produk </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pl-[5rem] pb-4 space-y-2 border-b border-[#C2C7D0]">
                      <div className="flex-1 space-y-10">
                        <div className="flex flex-wrap w-full">
                          <div className="text-[14px] w-1/2 mt-6">
                            <p className="font-semibold"> Stok untuk Toko: </p>
                            <p className="font-[400] mt-1"> #001190 - Toko Hujarat </p>
                          </div>
                          <div className="text-[14px] w-1/2 mt-6">
                            <p className="font-semibold"> Stok produk saat ini: </p>
                            <p className="font-[400] mt-1"> 100 plastik </p>
                          </div>
                          <div className="text-[14px] w-1/2 mt-6">
                            <p className="font-semibold"> Tanggal Kedaluwarsa: </p>
                            <p className="font-[400] mt-1"> 12/12/2024 </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
