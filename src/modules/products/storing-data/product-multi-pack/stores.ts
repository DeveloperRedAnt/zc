import { create } from 'zustand';
import { PriceMultiPackItem } from './types';

interface PriceMultiPackState {
  priceMultiPackList: PriceMultiPackItem[];
  isWholesale: boolean;
  setMultiPackList: (list: PriceMultiPackItem[]) => void;
  addMultiPackItem: () => void;
  updateMultiPackItem: (
    id: number,
    field: keyof PriceMultiPackItem,
    value: string | number
  ) => void;
  removeMultiPackItem: (id: number) => void;
  resetMultiPack: () => void;
  toggleWholesale: (isWholesale) => void;
}

export const usePriceMultiPackStore = create<PriceMultiPackState>((set) => ({
  priceMultiPackList: [{ id: Date.now(), itemName: '', quantity: 1, price: 0 }],
  isWholesale: false,
  setMultiPackList: (list) => set({ priceMultiPackList: list }),

  toggleWholesale: () => set((state) => ({ isWholesale: !state.isWholesale })),

  addMultiPackItem: () =>
    set((state) => ({
      priceMultiPackList: [
        ...state.priceMultiPackList,
        { id: Date.now(), itemName: '', quantity: 1, price: 0 },
      ],
    })),

  updateMultiPackItem: (id, field, value) =>
    set((state) => ({
      priceMultiPackList: state.priceMultiPackList.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    })),

  removeMultiPackItem: (id) =>
    set((state) => ({
      priceMultiPackList: state.priceMultiPackList.filter((item) => item.id !== id),
    })),

  resetMultiPack: () =>
    set({
      priceMultiPackList: [{ id: Date.now(), itemName: '', quantity: 1, price: 0 }],
    }),
}));
