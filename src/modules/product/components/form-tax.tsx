'use client';

import { InformationText } from '@/components/information-text/information-text';
import { Label } from '@/components/label/label';
import { Switch } from '@/components/switch/switch';
import { useProductTaxStore } from '@/modules/products/storing-data/product-tax/stores';

export default function FormTax() {
  const { isTax, toggleTax } = useProductTaxStore();
  const handleTaxToggle = (isTaxable: boolean) => {
    toggleTax(isTaxable);
  };

  return (
    <div className="pb-6 border-b-gray-200">
      <div className="pt-6 mb-4 flex justify-between items-center">
        <p>Produk Kena Pajak</p>
      </div>

      <InformationText text="Untuk menentukan apakah produk ini terkena pajak atau tidak" />

      <div className="flex items-center gap-2 mt-4">
        <Switch id="isTaxableProduct" defaultChecked={isTax} onCheckedChange={handleTaxToggle} />
        <Label htmlFor="isTaxableProduct" className="font-[500]">
          Produk Kena Pajak
        </Label>
      </div>
    </div>
  );
}
