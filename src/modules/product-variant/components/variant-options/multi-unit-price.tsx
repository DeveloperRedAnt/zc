import FormPriceMultiPack from '@/modules/product/components/form-price-multi-pack';
import { usePriceMultiPackStore } from '@/modules/products/storing-data/product-multi-pack/stores';
import { useEffect } from 'react';

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
