'use client';

import { InformationText } from '@/components/information-text/information-text';
import CustomInput from '@/components/input/custom-input';
import { Label } from '@/components/label/label';
import { Switch } from '@/components/switch/switch';
import { useTrackStockProductStore } from '@/modules/products-edit/storing-data/track-stock-product/stores';
import React, { useCallback } from 'react';
import FormAlertProductExpired from './form-alert-product-expired';

interface Props {
  productId: number;
  onTrackStockChange: (enabled: boolean) => void;
}

export default function Index({ productId, onTrackStockChange }: Props) {
  const trackStockStore = useTrackStockProductStore();
  const productData = trackStockStore.products[productId] ?? {
    is_track_stock: false,
    minimum_stock: '',
    stockAlertType: 'none',
  };

  // Handle toggle change
  const handleToggleChange = useCallback(
    (checked: boolean) => {
      onTrackStockChange(checked);
      trackStockStore.setTrackStock(productId, { is_track_stock: checked });
    },
    [productId, onTrackStockChange, trackStockStore.setTrackStock]
  );

  // Handle minimum stock change
  const handleMinimumStockChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = Number(e.target.value);
      trackStockStore.setTrackStock(productId, {
        minimum_stock: Number.isNaN(value) ? null : value,
      });
    },
    [productId, trackStockStore.setTrackStock]
  );

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
            checked={productData.is_track_stock}
            onCheckedChange={handleToggleChange}
          />
          <Label htmlFor="isTrackStockProduct"> Lacak Stok Produk </Label>
        </div>

        {productData.is_track_stock && (
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
                value={productData.minimum_stock?.toString() || ''}
                appendText="Produk"
                inputNumber
                onChange={handleMinimumStockChange}
              />
            </div>

            <FormAlertProductExpired productId={productId} />
          </div>
        )}
      </div>
    </>
  );
}
