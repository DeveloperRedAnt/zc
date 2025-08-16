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
import isEqual from 'lodash/isEqual';
import { useCallback, useEffect, useMemo, useRef } from 'react';

export function useDeepCompareMemo<T>(factory: () => T, deps: unknown[]): T {
  const ref = useRef<unknown[]>([]);
  const signalRef = useRef(0);

  if (!isEqual(deps, ref.current)) {
    ref.current = deps;
    signalRef.current++;
  }

  const signal = signalRef.current; // ambil nilai stabil

  // biome-ignore lint/correctness/useExhaustiveDependencies: false positive, we need signal as dependency
  return useMemo(factory, [signal]);
}

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
    isVariantInitialized,
  } = useVariantMultiPackStore();

  const { updateMultiPack } = useSingleVariantEditStore();

  const isEdit = true;

  // const memoizedVariantUnits = useMemo(() => variantUnits, [JSON.stringify(variantUnits)]);
  const memoizedVariantUnits = useDeepCompareMemo(() => variantUnits, [variantUnits]);
  // Memoize variant units to prevent unnecessary re-initializations

  // Get current variant data
  const variantData = getVariantData(variantId);
  const { priceMultiPackList, isWholesale, multiPackErrors } = variantData;

  // Initialize data when component mounts only if not already initialized
  useEffect(() => {
    if (!isVariantInitialized(variantId) && memoizedVariantUnits.length > 0) {
      initializeVariantData(variantId, memoizedVariantUnits);
    }
  }, [variantId, memoizedVariantUnits, initializeVariantData, isVariantInitialized]);

  // Sync changes to single variant store with useCallback to prevent infinite renders
  const syncToSingleVariantStore = useCallback(() => {
    updateMultiPack(priceMultiPackList, isWholesale);
  }, [priceMultiPackList, isWholesale, updateMultiPack]);

  useEffect(() => {
    // Only sync if variant is initialized to prevent syncing empty data
    if (isVariantInitialized(variantId)) {
      syncToSingleVariantStore();
    }
  }, [syncToSingleVariantStore, isVariantInitialized, variantId]);

  const handleRadioChange = useCallback(
    (value: string) => {
      const newIsWholesale = value === 'wholesale';
      toggleWholesale(variantId, newIsWholesale);
    },
    [variantId, toggleWholesale]
  );

  const handleReset = useCallback(() => {
    resetVariantMultiPack(variantId);
  }, [variantId, resetVariantMultiPack]);

  const handleAddMultiPack = useCallback(() => {
    addMultiPackItem(variantId);
  }, [variantId, addMultiPackItem]);

  const handleRemoveMultiPack = useCallback(
    (id: number) => {
      if (priceMultiPackList.length > 1) {
        removeMultiPackItem(variantId, id);
      }
    },
    [variantId, priceMultiPackList.length, removeMultiPackItem]
  );

  const handleUpdateMultiPack = useCallback(
    (id: number, field: keyof PriceMultiPackItem, value: string | number) => {
      updateMultiPackItem(variantId, id, field, value);
    },
    [variantId, updateMultiPackItem]
  );

  // Don't render until variant is initialized
  if (!isVariantInitialized(variantId)) {
    return (
      <div className="pb-6 border-b-gray-200 border-t">
        <div className="pt-6 mb-4 flex justify-center items-center">
          <div className="text-sm text-gray-500">Memuat data multi satuan...</div>
        </div>
      </div>
    );
  }

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
          errors={multiPackErrors[item.id!] || {}}
          onChange={handleUpdateMultiPack}
          onRemove={
            priceMultiPackList.length > 1 ? () => handleRemoveMultiPack(item.id!) : undefined
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
