'use client';
import { Button } from '@/components/button/button';
import { InformationText } from '@/components/information-text/information-text';
import { Label } from '@/components/label/label';
import { RadioGroup, RadioGroupItem } from '@/components/radio-group/radio-group';
import { usePriceMultiPackStore } from '@/modules/products-edit/storing-data/product-multi-pack-option/store';
import { Plus, Refresh } from '@icon-park/react';
import { useEffect } from 'react';
import MultiPackItem from './multi-pack-item';

const initialMultiPackData = [
  { id: 1, itemName: 'Single', quantity: 1, price: 10000 },
  { id: 2, itemName: 'Dozen', quantity: 12, price: 110000 },
  { id: 3, itemName: 'Box', quantity: 24, price: 220000 },
];

export function MultiUnitPrice() {
  const { setMultiPackList, resetMultiPack } = usePriceMultiPackStore();

  useEffect(() => {
    setMultiPackList(initialMultiPackData);
  }, [setMultiPackList]);

  const onReset = () => {
    resetMultiPack();
    setMultiPackList(initialMultiPackData);
  };

  return <FormPriceMultiPack isEdit={true} onReset={onReset} />;
}

export default function FormPriceMultiPack({
  isEdit = false,
  onReset,
}: { isEdit?: boolean; onReset?: () => void }) {
  const {
    priceMultiPackList,
    addMultiPackItem,
    updateMultiPackItem,
    removeMultiPackItem,
    resetMultiPack,
    toggleWholesale,
    multiPackErrors,
  } = usePriceMultiPackStore();

  const handleRadioChange = (value: string) => {
    toggleWholesale(value === 'wholesale');
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    } else {
      resetMultiPack();
    }
  };

  return (
    <div className="pb-6 border-b-gray-200 border-t">
      <div className="pt-6 mb-4 flex justify-between items-center">
        <p>Harga Multi Satuan</p>
        {isEdit && (
          <Button type="button" variant="outline" onClick={handleReset}>
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
        defaultValue="multi-pack"
        className="flex space-x-2 mb-6 mt-8"
        onValueChange={handleRadioChange}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem id="option-1" value="multi-pack" />
          <Label htmlFor="option-1 font-semibold">Multi Kemasan</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem id="option-2" value="wholesale" />
          <Label htmlFor="option-2 font-semibold">Grosir</Label>
        </div>
      </RadioGroup>

      {priceMultiPackList.map((item, index) => (
        <MultiPackItem
          key={item.id}
          index={index}
          item={item}
          errors={multiPackErrors[item.id] || {}}
          onChange={updateMultiPackItem}
          onRemove={priceMultiPackList.length > 1 ? () => removeMultiPackItem(item.id) : undefined}
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
