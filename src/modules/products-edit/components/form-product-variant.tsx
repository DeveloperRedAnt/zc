'use client';

import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import { InformationText } from '@/components/information-text/information-text';
import { Label } from '@/components/label/label';
import { Switch } from '@/components/switch/switch';
import { Edit, Right } from '@icon-park/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Ganti ini sesuai store kamu
import { useProductVariantStore } from '@/modules/product-variant/store';

export default function Index() {
  const router = useRouter();
  const finalData = useProductVariantStore((state) => state.finalData);
  const setFinalData = useProductVariantStore((state) => state.setFinalData);
  const [toggleVariantTableAccordion, setToggleVariantTableAccordion] = useState(false);

  const handleToggleActiveVariant = (checked: boolean, index: number) => {
    const updatedData = [...finalData];
    const item = updatedData[index];
    if (item) {
      item.isActive = checked;
      setFinalData(updatedData);
    }
  };

  return (
    <>
      {finalData.length > 0 && (
        <Card className="text-[#555555] px-2 my-[1rem]">
          <CardHeader className="border-b-gray-200 flex-row flex justify-between items-center">
            <CardTitle className="text-[1rem]"> Varian Produk </CardTitle>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                className="text-[#555555]"
                // onClick={() => router.push('/dashboard/products/add/product-variant')}
              >
                Tambah Opsi Varian
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-4 text-sm">
            <InformationText text="Menambah varian dari produk Anda. Jika Anda menambahkan varian, maka Barcode, Kode SKU, dan Harga Multi Satuan akan ditentukan dari varian Anda" />
            <div className="mt-4 space-y-4">
              {finalData.map((item, index) => (
                <Card key={item.id} className="text-[#555555] px-2 my-[1rem]">
                  <CardHeader className="border-b-gray-200 flex-row flex justify-between items-center">
                    <CardTitle className="text-[1rem]"> {item.name} </CardTitle>
                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="text-[#555555]"
                        onClick={() => router.push('/dashboard/products/add/product-variant')}
                      >
                        <Edit />
                        Edit Opsi Varian
                      </Button>
                    </div>
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
                        src={item.thumbnail}
                        alt="Product"
                        className="rounded object-cover w-[6.7rem] h-[6.7rem]"
                      />
                      <div className="flex-1 space-y-10">
                        <div className="flex w-full gap-4">
                          <div className="text-[14px] w-1/2">
                            <p className="font-semibold"> Barcode: </p>
                            <p className="font-[400] mt-1"> {item.barcode} </p>
                          </div>
                          <div className="text-[14px] w-1/2">
                            <p className="font-semibold"> Kode SKU: </p>
                            <p className="font-[400] mt-1"> {item.sku} </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-2">
                              <Switch
                                id={`isActiveVariant-${index}`}
                                checked={item.isActive}
                                onCheckedChange={(checked) =>
                                  handleToggleActiveVariant(checked, index)
                                }
                              />
                              <Label htmlFor={`isActiveVariant-${index}`}> Varian Aktif </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {toggleVariantTableAccordion && (
                      <div className="mt-4 pl-[5rem] pt-4 space-y-2">
                        <p className="mb-1"> Harga Multi Satuan </p>
                        <div className="flex-1 space-y-10">
                          <div className="flex flex-wrap w-full">
                            {Array.isArray(item.prices) && item.prices.length > 0 ? (
                              item.prices.map((price) => (
                                <div key={price.id} className="text-[14px] w-1/2 mt-4">
                                  <p className="font-semibold">
                                    {price.namePcs} - {price.quantity} {price.namePcs.toLowerCase()}
                                    :
                                  </p>
                                  <p className="font-[400] mt-1">
                                    Rp {price.price.toLocaleString('id-ID')}
                                  </p>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-400">Tidak ada data harga</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
