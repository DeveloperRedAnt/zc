// multi-unit-price.tsx
import FormPriceMultiPack from '@/modules/product/components/form-price-multi-pack';
import { usePriceMultiPackStore } from '@/modules/products/storing-data/product-multi-pack/stores';
import { useEffect, useMemo, useRef } from 'react';

// Define the type based on your console log structure
type VariantUnit = {
  id?: number;
  unitName: string;
  conversionValue: number;
  price: number;
};

type MultiUnitPriceProps = {
  variantUnits?: VariantUnit[];
  variantId: number; // Add variant ID to make each instance unique
};

export function MultiUnitPrice({ variantUnits = [], variantId }: MultiUnitPriceProps) {
  const { setMultiPackList, resetMultiPack } = usePriceMultiPackStore();
  const initializedRef = useRef(false);

  // console.log(variantUnits, 'variantUnits')

  // Convert variantUnits to multiPackData format - memoize to prevent infinite loops
  const multiPackData = useMemo(() => {
    if (variantUnits && variantUnits.length > 0) {
      return variantUnits.map((unit, index) => ({
        id: unit.id || variantId * 1000 + index + 1, // Generate unique IDs per variant
        itemName: unit.unitName,
        quantity: unit.conversionValue,
        price: unit.price,
      }));
    }

    // Fallback to default data if no variantUnits provided
    return variantUnits.map((unit, index) => ({
      id: unit.id || variantId * 1000 + index + 1,
      itemName: `${unit.unitName}`, // copy string
      quantity: Number(unit.conversionValue),
      price: Number(unit.price),
    }));
  }, [variantUnits, variantId]);

  // Only initialize once per variant
  useEffect(() => {
    if (!initializedRef.current) {
      setMultiPackList(multiPackData);
      initializedRef.current = true;
    }
  }, [multiPackData, setMultiPackList]);

  const onReset = () => {
    resetMultiPack();
    setMultiPackList(multiPackData);
  };

  return <FormPriceMultiPack isEdit={true} onReset={onReset} />;
}
