'use client';

import { InformationText } from '@/components/information-text/information-text';
import CustomInput from '@/components/input/custom-input';
import { Label } from '@/components/label/label';
import { Switch } from '@/components/switch/switch';
import DOMPurify from 'dompurify';
import React, { useState, useEffect } from 'react';
import FormAlertProductExpired from './form-alert-product-expired';

interface Props {
  onTrackStockChange: (enabled: boolean) => void;
}

export default function Index({ onTrackStockChange }: Props) {
  const [toggleStatusTracking, setToggleStatusTracking] = useState(true);

  useEffect(() => {
    onTrackStockChange(toggleStatusTracking);
  }, [toggleStatusTracking, onTrackStockChange]);

  return (
    <>
      <div className="pb-6">
        <div className="pt-6 mb-6">
          <p> Lacak Stok Produk </p>
        </div>
        <InformationText
          text={DOMPurify.sanitize(
            'Jika dinonaktifkan, maka Anda tidak bisa mengisikan Stok Awal dan Penambahan Stok. <strong>Produk Paduan</strong> dan <strong>Produk Varian</strong> akan <strong>otomatis mengaktifkan</strong> fitur ini'
          )}
        />
        <div className="flex items-center gap-2 mt-2">
          <Switch
            id="isTrackStockProduct"
            checked={toggleStatusTracking}
            onCheckedChange={setToggleStatusTracking}
          />
          <Label htmlFor="isTrackStockProduct"> Lacak Stok Produk </Label>
        </div>

        {toggleStatusTracking && (
          <div className="pl-6">
            <div className="pt-6 mb-2">
              <p> Peringatan Stok Minimum </p>
            </div>
            <InformationText text="Penentuan peringatan minimum sebelum stok produk habis" />
            <div className="w-full mt-2">
              <CustomInput
                currency
                className="border-[#C2C7D0]"
                placeholder="0"
                appendText="Produk"
                inputNumber
              />
            </div>

            <FormAlertProductExpired />
          </div>
        )}
      </div>
    </>
  );
}
