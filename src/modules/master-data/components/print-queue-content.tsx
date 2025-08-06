'use client';

import { InformationText } from '@/components/information-text/information-text';
import { Label } from '@/components/label/label';
import { Switch } from '@/components/switch/switch';
import { useState } from 'react';

export default function Index() {
  const [_taxPercent, _setTaxPercent] = useState('');
  const [_isEditOpen, _setIsEditOpen] = useState(false);
  const [_isConfirmOpen, _setIsConfirmOpen] = useState(false);

  return (
    <>
      <div className="box-border flex flex-col gap-6 items-start w-full text-[#555555]">
        <div className="flex-row flex justify-between items-start w-full">
          <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0">
            <div className="flex flex-col font-['Poppins:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#555555] text-[16px] text-left text-nowrap">
              <p className="block leading-[24px] whitespace-pre font-semibold">
                {' '}
                Cetak No Antrian{' '}
              </p>
            </div>
          </div>
        </div>
        <div className="box-border content-stretch flex flex-col gap-2 p-2 relative shrink-0 w-full">
          <InformationText text="Pengaturan untuk menampilkan no. antrian di nota" />
          <div className="flex items-center gap-2 pt-2">
            <Switch id="show-at-invoice" />
            <Label htmlFor="show-at-invoice">Tampilkan di nota</Label>
          </div>
        </div>
      </div>
    </>
  );
}
