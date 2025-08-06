'use client';

import { InformationText } from '@/components/information-text/information-text';
import InputFile from '@/components/input/input-file';
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
                Metode Pembayaran{' '}
              </p>
            </div>
          </div>
        </div>
        <div className="box-border content-stretch flex flex-col gap-3 p-2 relative shrink-0 w-full">
          <InformationText text="Pengaturan metode pembayaran yang akan muncul saat checkout" />
          <div className="flex items-center gap-2 pt-2">
            <Switch id="show-at-invoice" />
            <Label htmlFor="show-at-invoice">Tunai</Label>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <Switch id="show-at-invoice" />
            <Label htmlFor="show-at-invoice">Debit / Kredit</Label>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <Switch id="show-at-invoice" />
            <Label htmlFor="show-at-invoice">Voucher</Label>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <Switch id="show-at-invoice" />
            <Label htmlFor="show-at-invoice">Hutang</Label>
          </div>
          <hr className="border-[#E5E7EB] mt-4" />
          <div className="flex items-center gap-2 pt-2">
            <Switch id="show-at-invoice" />
            <Label htmlFor="show-at-invoice">QRIS</Label>
          </div>
          <div className="flex items-start gap-2 pt-2">
            <InputFile
              defaultImageUrl="/assets/zycas/qris-placeholder.png"
              label="Unggah Gambar QRIS"
              previewPosition="top"
              accept="image/png, image/jpeg, image/jpg"
              fileInfoExtension=".jpg, .jpeg, .png"
              maxSize={2 * 1024 * 1024}
            />
          </div>
        </div>
      </div>
    </>
  );
}
