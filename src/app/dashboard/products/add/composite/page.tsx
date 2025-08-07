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
import { Stepper as NumberStepper } from '@/components/number-stepper/number-stepper';
import ProductVariantPicker from '@/components/product-variant-picker/product-variant-picker';
import { useProductCompositeStore } from '@/modules/products/storing-data/product-composite/stores';
import { Check, Delete, Plus } from '@icon-park/react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function FormProductComposite() {
  const router = useRouter();
  const { data, setProductionPerBatch, addComponent, updateComponent, removeComponent } =
    useProductCompositeStore();

  return (
    <Card className="my-[1rem] text-[#555555] px-2">
      <CardHeader className="border-b-gray-200">
        <CardTitle className="text-[1rem]"> Produk Paduan </CardTitle>
      </CardHeader>
      <CardContent className="p-4 text-sm">
        <form>
          <p> Silahkan tambahkan Produk yang dibutuhkan untuk membuat paduan </p>
          <p className="text-[#F08181]"> Form bertanda (*) harus diisi </p>

          <div className="mt-6">
            <div className="my-6">
              <label className="block mb-2">
                Jumlah Produksi per Batch <span className="text-[#F08181]">*</span>
              </label>
              <NumberStepper
                min={0}
                value={data.production_per_batch}
                onChange={setProductionPerBatch}
              />
            </div>

            <InformationText text="Tambahkan produk sebagai komponen dan kuantitas yang dibutuhkan untuk membuat produk paduan" />

            {data.components.map((item, _index) => (
              <div key={item.id}>
                <div className="flex mt-4 items-start gap-4">
                  <div className="flex flex-col items-start gap-4 w-[18.6rem]">
                    <div className="w-full mt-2">
                      <ProductVariantPicker
                        value={
                          item.product_id && item.product_name
                            ? {
                                value: item.product_id,
                                label: item.product_name,
                                data: {
                                  id: item.product_id,
                                  name: item.product_name,
                                  type: 'Unknown',
                                  is_favorite: false,
                                  thumbnail: null,
                                  package: null,
                                  content: null,
                                  current_stock: '0',
                                  maximum_retail_price: 'Rp 0',
                                  is_active: true,
                                  variants: [],
                                },
                              }
                            : null
                        }
                        onChange={(val) => {
                          updateComponent(item.id, 'product_id', Number(val?.value ?? null));
                          updateComponent(item.id, 'product_name', val?.label ?? null);
                        }}
                        placeholder="Pilih Produk"
                        className="mt-2"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-2 pt-2">
                    <NumberStepper
                      min={0}
                      value={item.quantity}
                      onChange={(val) => updateComponent(item.id, 'quantity', val)}
                      label="Jumlah"
                      required
                    />
                  </div>
                </div>

                {data.components.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-[#F08181] ml-[1px] flex items-center"
                    onClick={() => removeComponent(item.id)}
                  >
                    <Delete size="20" fill="#F08181" />
                    Hapus
                  </Button>
                )}
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              className="text-[#555555] mt-4"
              onClick={addComponent}
            >
              <Plus theme="filled" size="24" fill="#555555" />
              Tambah Produk
            </Button>

            <div className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                variant="outline"
                className="mt-2 ml-[1px] flex items-center"
                onClick={() => router.push('/dashboard/products/add')}
              >
                Kembali ke Tambah Produk
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-2 ml-[1px] flex items-center"
                  >
                    Simpan Produk
                    <Check />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                  <DialogHeader>
                    <DialogTitle> Anda akan menyimpan Produk Paduan </DialogTitle>
                    <DialogDescription className="pt-4">
                      Apakah Anda yakin akan menyimpan paduan tersebut?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="ghost">Tidak</Button>
                    </DialogClose>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        router.push('/dashboard/products/add');
                      }}
                    >
                      Ya, Saya Yakin
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
