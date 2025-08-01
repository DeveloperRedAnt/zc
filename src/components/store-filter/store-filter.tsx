'use client';

import Dropdown from '@/components/dropdown/dropdown';
import type { OptionType } from '@/components/dropdown/dropdown';
import { useStoreFilter } from '@/hooks/use-store-filter/use-store-filter';

const optionsStores: OptionType[] = [
  { label: '#1123 - Indosemar Juanda', value: 'Toko A' },
  { label: '#1223 - Toko Grosir Patangpuluhan', value: 'Toko B' },
  { label: '#1333 - Indosemar Godean', value: 'Toko C' },
  { label: '#1433 - Indosemar Sugeng Jeroni', value: 'Toko D' },
  { label: '#1533 - Alfamidas Gamping', value: 'Toko E' },
];

export default function StoreFilter() {
  const { selectedStore, setSelectedStore } = useStoreFilter();

  return (
    <>
      <div className="flex">
        <span className="font-semibold my-auto mr-2 text-[14px]"> Tampilan Data untuk: </span>
        <Dropdown
          label=""
          options={optionsStores}
          value={selectedStore ?? null}
          onChange={(option) => setSelectedStore(option)}
          placeholder="Semua Toko"
          className="mt-2"
        />
      </div>
    </>
  );
}
