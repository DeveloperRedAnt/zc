'use client';

import { InformationText } from '@/components/information-text/information-text';
import { Label } from '@/components/label/label';
import { Switch } from '@/components/switch/switch';

export default function Index() {
  return (
    <>
      <div className="border-b border-zycas-border-grey">
        <div className="pt-6 font-semibold">
          <p> Stok Produk </p>
        </div>
        <InformationText
          text="Jika dinonaktifkan, maka Anda tidak bisa mengisikan Stok Awal dan Penambahan Stok. 
            Produk Paduan dan Produk Varian akan otomatis mengaktifkan fitur ini"
        />
        <div className="flex items-center gap-2">
          <Switch id="isTrackStockProduct" defaultChecked />
          <Label htmlFor="isTrackStockProduct" className="font-[500]">
            {' '}
            Lacak Stok Produk{' '}
          </Label>
        </div>

        <div className="pt-6 font-semibold">
          <p> Peringatan Stok Minimum </p>
        </div>
        <InformationText text="Penentuan peringatan minimum sebelum stok produk habis" />
      </div>
    </>
  );
}
