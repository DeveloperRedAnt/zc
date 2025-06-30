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
import Dropdown from '@/components/dropdown/dropdown';
import type { OptionType } from '@/components/dropdown/dropdown';
import { InformationText } from '@/components/information-text/information-text';
import { Stepper as NumberStepper } from '@/components/number-stepper/number-stepper';
import { Check, Delete, Plus } from '@icon-park/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const optionsProducts: OptionType[] = [
  { label: 'Kaos Combed 34 cm (Merah - Small)', value: 1 },
  { label: 'Kopi Gato - 250ml', value: 2 },
];

export default function Index() {
  const [productList, setProductList] = useState([
    { id: crypto.randomUUID(), product: null as OptionType | null, quantity: 0 },
  ]);
  const router = useRouter();

  const handleAdd = () => {
    setProductList([...productList, { id: crypto.randomUUID(), product: null, quantity: 0 }]);
  };

  const handleRemove = (index: number) => {
    setProductList((prev) => prev.filter((_, i) => i !== index));
  };

  const updateProduct = (index: number, product: OptionType | null) => {
    setProductList((prev) => {
      const updatedList = [...prev];
      if (updatedList[index]) {
        updatedList[index].product = product;
      }
      return updatedList;
    });
  };

  const updateQuantity = (index: number, quantity: number) => {
    setProductList((prev) => {
      const updatedList = [...prev];
      if (updatedList[index]) {
        updatedList[index].quantity = quantity;
      }
      return updatedList;
    });
  };
  return (
    <>
      <Card className="my-[1rem] text-[#555555] px-2">
        <CardHeader className="border-b border-[#C2C7D0]">
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
                <NumberStepper min={0} />
              </div>
              <InformationText text="Tambahkan produk sebagai komponen dan kuantitas yang dibutuhkan untuk membuat produk paduan" />
              {productList.map((item, index) => (
                <div key={item.id}>
                  <div className="flex mt-4 items-start gap-4">
                    <div className="flex flex-col items-start gap-4 w-[18.6rem]">
                      <div className="w-full mt-2">
                        <Dropdown
                          label="Pilih Produk"
                          options={optionsProducts}
                          value={item.product}
                          onChange={(val) => updateProduct(index, val)}
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
                        onChange={(val) => updateQuantity(index, val)}
                        label="Jumlah"
                        required
                      />
                    </div>
                  </div>
                  {productList.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-[#F08181] ml-[1px] flex items-center"
                      onClick={() => handleRemove(index)}
                    >
                      <Delete size="20" fill="#F08181" className="" />
                      Hapus
                    </Button>
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                className="text-[#555555] mt-4"
                onClick={handleAdd}
              >
                <Plus theme="filled" size="24" fill="#555555" />
                Tambah Produk
              </Button>

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2 ml-[1px] flex items-center"
                  onClick={() => router.push('/dashboard/product/add')}
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
                          router.push('/dashboard/product/add');
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
    </>
  );
}
