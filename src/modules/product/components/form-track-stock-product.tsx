'use client';

import { InformationText } from '@/components/information-text/information-text';
import CustomInput from '@/components/input/custom-input';
import { Label } from '@/components/label/label';
import { Switch } from '@/components/switch/switch';
import { useTrackStockProductStore } from '@/modules/products/storing-data/track-stock-product/stores';
import React, { useState, useEffect } from 'react';
import FormAlertProductExpired from './form-alert-product-expired';

interface Props {
  onTrackStockChange: (enabled: boolean) => void;
}

export default function Index({ onTrackStockChange }: Props) {
  const [toggleStatusTracking, setToggleStatusTracking] = useState(true);
  const { setTrackStock } = useTrackStockProductStore();

  useEffect(() => {
    onTrackStockChange(toggleStatusTracking);
    setTrackStock({ is_track_stock: toggleStatusTracking });
  }, [toggleStatusTracking, onTrackStockChange, setTrackStock]);

  return (
    <>
      <div className="pb-6">
        <div className="pt-6 mb-6">
          <p> Lacak Stok Produk </p>
        </div>
        <InformationText
          text={
            'Jika dinonaktifkan, maka Anda tidak bisa mengisikan Stok Awal dan Penambahan Stok. <strong>Produk Paduan</strong> dan <strong>Produk Varian</strong> akan <strong>otomatis mengaktifkan</strong> fitur ini'
          }
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
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setTrackStock({ minimum_stock: Number.isNaN(value) ? null : value });
                }}
              />
            </div>

            <FormAlertProductExpired />
          </div>
        )}
      </div>
    </>
  );
}
