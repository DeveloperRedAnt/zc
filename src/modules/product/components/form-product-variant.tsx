'use client';

import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/dialog/dialog';
import { InformationText } from '@/components/information-text/information-text';
import { Label } from '@/components/label/label';
import { Switch } from '@/components/switch/switch';
import { toast } from '@/components/toast/toast';
import { Delete, Edit, Right, SettingConfig } from '@icon-park/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Ganti ini sesuai store kamu
import { useProductVariantStore } from '@/modules/product-variant/store';

export default function Index() {
  const router = useRouter();
  const finalData = useProductVariantStore((state) => state.finalData);
  const clearFinalData = useProductVariantStore((state) => state.clearFinalData);
  const [toggleVariantTableAccordion, setToggleVariantTableAccordion] = useState(false);

  return (
    <Card className="text-[#555555] px-2 my-[1rem]">
      <CardHeader className="border-b-gray-200">
        <CardTitle className="text-[1rem]"> Varian Produk </CardTitle>
      </CardHeader>

      {finalData.length === 0 ? (
        <CardContent className="p-4 text-sm">
          <InformationText
            text="Menambah varian dari produk Anda. Jika Anda menambahkan varian, maka Barcode, Kode SKU, 
                dan Harga Multi Satuan akan ditentukan dari varian Anda"
          />
          <Button
            type="button"
            variant="outline"
            className="text-[#555555] mt-4"
            onClick={() => router.push('/dashboard/products/add/variant')}
          >
            <SettingConfig theme="filled" size="24" fill="#555555" />
            Atur Varian
          </Button>
        </CardContent>
      ) : (
        <>
          <CardHeader className="border-b-gray-200 flex-row flex justify-between items-center">
            <CardTitle className="text-[1rem]"> Varian Produk </CardTitle>
            <div className="flex items-center gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-[#F08181] flex items-center"
                  >
                    <Delete />
                    Hapus Semua Varian
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                  <DialogHeader>
                    <DialogTitle> Anda akan menghapus Varian Produk </DialogTitle>
                    <DialogDescription className="pt-4">
                      Apakah Anda yakin akan menghapus Varian yang telah tersimpan tersebut?
                      <p className="text-[#F08181] mt-4">
                        {' '}
                        Aksi tidak dapat dikembalikan dan Form Produk akan kembali ke semula{' '}
                      </p>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="ghost">Tidak</Button>
                    </DialogClose>
                    <Button
                      variant="ghost"
                      className="text-[#F08181]"
                      onClick={() => {
                        clearFinalData();
                        toast.success('Terhapus!', {
                          description: 'Produk Varian telah berhasil dihapus',
                          className: 'bg-[#16a34a]',
                        });
                        router.refresh();
                      }}
                    >
                      Ya, Saya Yakin
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button
                type="button"
                variant="outline"
                className="text-[#555555]"
                onClick={() => router.push('/dashboard/products/add/product-variant')}
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
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            className="text-[#F08181] flex items-center"
                          >
                            <Delete />
                            Hapus
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-sm">
                          <DialogHeader>
                            <DialogTitle> Anda akan menghapus Opsi Varian </DialogTitle>
                            <DialogDescription className="pt-4">
                              Apakah Anda yakin akan menghapus Opsi Varian yang telah tersimpan
                              tersebut?
                              <p className="text-[#F08181] mt-4"> Aksi tidak dapat dikembalikan </p>
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="ghost">Tidak</Button>
                            </DialogClose>
                            <Button
                              variant="ghost"
                              className="text-[#F08181]"
                              onClick={() =>
                                toast.success('Terhapus!', {
                                  description: 'Opsi Varian Anda telah berhasil dihapus',
                                  className: 'bg-[#16a34a]',
                                })
                              }
                            >
                              Ya, Saya Yakin
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
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
                              <Switch id={`isActiveVariant-${index}`} defaultChecked />
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
        </>
      )}
    </Card>
  );
}
