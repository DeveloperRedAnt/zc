import { Button } from '@/components/button/button';
import { InformationText } from '@/components/information-text/information-text';
import { Label } from '@/components/label/label';
import { RadioGroup, RadioGroupItem } from '@/components/radio-group/radio-group';
import MultiPackItem from '@/modules/products-edit/components/options/multi-pack-item';
import { useVariantMultiPackStore } from '@/modules/products-edit/storing-data/product-variant-edit-option/multi-pack-store';
import { PriceMultiPackItem } from '@/modules/products-edit/storing-data/product-variant-edit-option/multi-pack-types';
import { useSingleVariantEditStore } from '@/modules/products-edit/storing-data/product-variant-edit-option/single-variant-store';
import type { VariantUnit as StoreVariantUnit } from '@/modules/products-edit/storing-data/product-variant-edit-option/types';
import { Plus, Refresh } from '@icon-park/react';
import { useEffect } from 'react';

type MultiUnitPriceProps = {
  variantUnits: StoreVariantUnit[];
  variantId: number;
};

export function MultiUnitPrice({ variantUnits = [], variantId }: MultiUnitPriceProps) {
  const {
    initializeVariantData,
    getVariantData,
    addMultiPackItem,
    updateMultiPackItem,
    removeMultiPackItem,
    resetVariantMultiPack,
    toggleWholesale,
  } = useVariantMultiPackStore();

  const { updateMultiPack } = useSingleVariantEditStore();

  const isEdit = true;

  // Get current variant data
  const variantData = getVariantData(variantId);
  const { priceMultiPackList, isWholesale, multiPackErrors } = variantData;

  // Initialize data when component mounts or when variantUnits/variantId changes
  useEffect(() => {
    initializeVariantData(variantId, variantUnits);
  }, [variantUnits, variantId, initializeVariantData]);

  // Sync changes to single variant store
  useEffect(() => {
    updateMultiPack(priceMultiPackList, isWholesale);
  }, [priceMultiPackList, isWholesale, updateMultiPack]);

  const handleRadioChange = (value: string) => {
    const newIsWholesale = value === 'wholesale';
    toggleWholesale(variantId, newIsWholesale);
  };

  const handleReset = () => {
    resetVariantMultiPack(variantId);
  };

  const handleAddMultiPack = () => {
    addMultiPackItem(variantId);
  };

  const handleRemoveMultiPack = (id: number) => {
    if (priceMultiPackList.length > 1) {
      removeMultiPackItem(variantId, id);
    }
  };

  const handleUpdateMultiPack = (
    id: number,
    field: keyof PriceMultiPackItem,
    value: string | number
  ) => {
    updateMultiPackItem(variantId, id, field, value);
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
        value={isWholesale ? 'wholesale' : 'multi-pack'}
        className="flex space-x-2 mb-6 mt-8"
        onValueChange={handleRadioChange}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem id={`option-1-${variantId}`} value="multi-pack" />
          <Label htmlFor={`option-1-${variantId}`} className="font-semibold">
            Multi Kemasan
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem id={`option-2-${variantId}`} value="wholesale" />
          <Label htmlFor={`option-2-${variantId}`} className="font-semibold">
            Grosir
          </Label>
        </div>
      </RadioGroup>

      {priceMultiPackList.map((item, index) => (
        <MultiPackItem
          key={`${variantId}-${item.id}`}
          index={index}
          item={item}
          errors={multiPackErrors[item.id] || {}}
          onChange={handleUpdateMultiPack}
          onRemove={
            priceMultiPackList.length > 1 ? () => handleRemoveMultiPack(item.id) : undefined
          }
        />
      ))}

      <Button
        type="button"
        variant="outline"
        className="text-[#555555] mt-4"
        onClick={handleAddMultiPack}
      >
        <Plus theme="filled" size="24" fill="#555555" />
        Opsi Harga
      </Button>
    </div>
  );
}
