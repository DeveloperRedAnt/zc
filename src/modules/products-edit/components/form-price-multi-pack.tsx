'use client';

import { Button } from '@/components/button/button';
import { InformationText } from '@/components/information-text/information-text';
import { Label } from '@/components/label/label';
import { RadioGroup, RadioGroupItem } from '@/components/radio-group/radio-group';
import { usePriceMultiPackStore } from '@/modules/products-edit/storing-data/product-multi-pack/stores';
import { PriceMultiPackItem } from '@/modules/products-edit/storing-data/product-multi-pack/types';
import { Plus, Refresh } from '@icon-park/react';
import MultiPackItem from './multi-pack-item';

export default function FormPriceMultiPack({
  isEdit = false,
  productId = 1,
}: { isEdit?: boolean; productId?: number }) {
  const store = usePriceMultiPackStore();
  const productData = store.products[productId] ?? {
    multiPackItems: [],
    isWholesale: false,
    priceMultiPackList: [],
  };

  const addMultiPackItem = () => store.addMultiPackItem(productId);
  const updateMultiPackItem = (
    id: number,
    field: keyof PriceMultiPackItem,
    value: string | number
  ) => store.updateMultiPackItem(productId, id, field, value);
  const removeMultiPackItem = (id: number) => store.removeMultiPackItem(productId, id);
  const resetMultiPack = () => store.resetMultiPack(productId);
  const toggleWholesale = (_isWholesale: boolean) => store.toggleWholesale(productId);

  const handleRadioChange = (value: string) => {
    toggleWholesale(value === 'wholesale');
  };

  return (
    <div className="pb-6 border-b-gray-200 border-t">
      <div className="pt-6 mb-4 flex justify-between items-center">
        <p>Harga Multi Satuan</p>
        {isEdit && (
          <Button type="button" variant="outline" onClick={resetMultiPack}>
            <Refresh />
            Reset
          </Button>
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

      <RadioGroup
        value={productData.isWholesale ? 'wholesale' : 'multi-pack'}
        className="flex space-x-2 mb-6 mt-8"
        onValueChange={handleRadioChange}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem id="option-1" value="multi-pack" />
          <Label htmlFor="option-1" className="font-semibold">
            Multi Kemasan
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem id="option-2" value="wholesale" />
          <Label htmlFor="option-2" className="font-semibold">
            Grosir
          </Label>
        </div>
      </RadioGroup>

      {productData.priceMultiPackList.map((item, index) => (
        <MultiPackItem
          key={item.id}
          index={index}
          item={item}
          onChange={updateMultiPackItem}
          onRemove={
            productData.priceMultiPackList.length > 1
              ? () => removeMultiPackItem(item.id)
              : undefined
          }
        />
      ))}

      <Button
        type="button"
        variant="outline"
        className="text-[#555555] mt-4"
        onClick={addMultiPackItem}
      >
        <Plus theme="filled" size="24" fill="#555555" />
        Opsi Harga
      </Button>
    </div>
  );
}
