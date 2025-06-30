'use client';

import { Button } from '@/components/button/button';
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
import CustomInput from '@/components/input/custom-input';
import { Input } from '@/components/input/input';
import { Label } from '@/components/label/label';
import { Stepper as NumberStepper } from '@/components/number-stepper/number-stepper';
import { RadioGroup, RadioGroupItem } from '@/components/radio-group/radio-group';
import { toast } from '@/components/toast/toast';
import { Delete, Plus } from '@icon-park/react';
import { Refresh } from '@icon-park/react';
import { useState } from 'react';

type PriceMultiPackItem = {
  id: number;
  itemName: string;
  quantity: number;
  price: number;
};

export default function Index({ isEdit = false }: { isEdit?: boolean }) {
  const [priceMultiPackList, setPriceMultiPackList] = useState<PriceMultiPackItem[]>([
    { id: Date.now(), itemName: '', quantity: 1, price: 0 },
  ]);

  const handleAdd = () => {
    setPriceMultiPackList((prev) => [
      ...prev,
      { id: Date.now(), itemName: '', quantity: 1, price: 0 },
    ]);
  };

  const handleRemove = (id: number) => {
    setPriceMultiPackList((prev) => prev.filter((item) => item.id !== id));
    toast.success('Terhapus!', {
      description: 'Produk Anda telah berhasil dihapus',
      className: 'bg-[#16a34a]',
    });
  };

  const updateField = (id: number, field: keyof PriceMultiPackItem, value: string | number) => {
    setPriceMultiPackList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  return (
    <>
      <div className="pb-6 border-b border-[#C2C7D0] border-t">
        <div className="pt-6 mb-4 flex-row flex justify-between items-center">
          <p> Harga Multi Satuan </p>
          {isEdit && (
            <div className="flex">
              <Button type="button" variant="outline">
                <Refresh />
                Reset
              </Button>
            </div>
          )}
        </div>
        <InformationText text="Penentuan harga sesuai dengan pengelompokan atau paket yang Anda tentukan:" />
        <ul className="list-disc pl-10 space-y-2 text-sm">
          <li>
            <span className="font-medium">Multi Kemasan</span>
            <br />
            <span>Harga jual dianggap terpisah untuk tiap satuan yang dibeli</span>
          </li>
          <li>
            <span className="font-medium">Grosir</span>
            <br />
            <span>Harga berubah sesuai jumlah pembelian minimal</span>
          </li>
        </ul>

        <RadioGroup defaultValue="option-1" className="flex space-x-2 mb-6 mt-8">
          <div className="flex items-center space-x-2">
            <RadioGroupItem id="option-1" value="option-1" />
            <Label htmlFor="option-1 font-semibold"> Multi Kemasan </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem id="option-2" value="option-2" />
            <Label htmlFor="option-2 font-semibold"> Grosir </Label>
          </div>
        </RadioGroup>

        {priceMultiPackList.map((item) => (
          <div key={item.id}>
            <div className="flex">
              <div className="flex flex-col items-start gap-4 w-[18.6rem] mr-8">
                <div className="w-full mt-2">
                  <label className="block mb-3">
                    Nama Satuan <span className="text-[#F08181]">*</span>
                  </label>
                  <Input
                    type="text"
                    className="border-[#C2C7D0]"
                    placeholder="cth: Single"
                    value={item.itemName}
                    onChange={(e) => updateField(item.id, 'itemName', e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 pt-2">
                <NumberStepper
                  min={1}
                  value={item.quantity}
                  onChange={(val: number) => updateField(item.id, 'quantity', val)}
                  label="Kuantiti"
                  required
                />
              </div>
              <div className="flex flex-col items-start gap-4 w-[18.6rem] ml-8">
                <div className="w-full mt-2">
                  <CustomInput
                    currency
                    className="border-[#C2C7D0]"
                    placeholder="0"
                    value={item.price}
                    prependText="Rp"
                    inputNumber
                    isWidthFull
                    label="Nominal Harga"
                    required
                  />
                </div>
              </div>
            </div>
            {priceMultiPackList.length > 1 && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-[#F08181] mt-2 ml-[1px] flex items-center"
                  >
                    <Delete size="20" fill="#F08181" className="" />
                    Hapus
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Anda akan menghapus Opsi Harga</DialogTitle>
                    <DialogDescription className="pt-4">
                      Apakah Anda yakin akan menghapus opsi harga tersebut?
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
                        handleRemove(item.id);
                      }}
                    >
                      Ya, Saya Yakin
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        ))}
        <Button type="button" variant="outline" className="text-[#555555] mt-4" onClick={handleAdd}>
          <Plus theme="filled" size="24" fill="#555555" />
          Opsi Harga
        </Button>
      </div>
    </>
  );
}
