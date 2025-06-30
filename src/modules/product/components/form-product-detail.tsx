'use client';

import { Button } from '@/components/button/button';
import Dropdown from '@/components/dropdown/dropdown';
import type { OptionType } from '@/components/dropdown/dropdown';
import { Input } from '@/components/input/input';
import { Refresh } from '@icon-park/react';
import React, { useState } from 'react';

const optionsUnit: OptionType[] = [
  { label: 'ml', value: 1 },
  { label: 'kg', value: 2 },
  { label: 'g', value: 3 },
  { label: 'L', value: 4 },
];

export default function ProductDetail({ isEdit = false }: { isEdit?: boolean }) {
  const [selectedUnit, setSelectedUnit] = useState<OptionType | null>(null);
  return (
    <>
      <div className="pb-6">
        <div className="pt-6 flex-row flex justify-between items-center">
          <p> Detail Produk </p>
          {isEdit && (
            <div className="flex">
              <Button type="button" variant="outline">
                <Refresh />
                Reset
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-start gap-4">
            <div className="w-full mt-4">
              <label className="block mb-2">
                Isi / Content <span className="text-[#F08181]">*</span>
              </label>
              <Input type="text" className="border-[#C2C7D0]" placeholder="cth: 250" />
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <div className="w-full mt-4">
              <Dropdown
                label="Unit"
                options={optionsUnit}
                value={selectedUnit}
                onChange={setSelectedUnit}
                placeholder="Pilih Unit"
                className="h-[40px] pb-1 w-full"
                required
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <div className="w-full mt-4">
              <label className="block mb-2">
                Kemasan <span className="text-[#F08181]">*</span>
              </label>
              <Input type="text" className="border-[#C2C7D0]" placeholder="cth: Botol" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-start gap-4">
            <div className="w-full mt-2">
              <label className="block mb-2"> Barcode </label>
              <Input type="text" className="border-[#C2C7D0]" placeholder="cth: 1199922838920" />
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <div className="w-full mt-2">
              <label className="block mb-2"> SKU </label>
              <Input type="text" className="border-[#C2C7D0]" placeholder="cth: 782217821" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
