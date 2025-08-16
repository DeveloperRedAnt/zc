'use client';
import { create } from 'zustand';

export interface MultiPackItemType {
  id: string;
  unit_name: string;
  conversion_value: string;
  price: string;
}

export interface MultiPackErrors {
  [index: number]: { [field: string]: string };
}

interface PriceMultiPackState {
  priceMultiPackList: MultiPackItemType[];
  isWholesale: boolean;
  multiPackErrors: MultiPackErrors;

  addMultiPackItem: () => void;
  updateMultiPackItem: (index: number, field: keyof MultiPackItemType, value: string) => void;
  removeMultiPackItem: (index: number) => void;
  toggleWholesale: (isWholesale: boolean) => void;
  resetMultiPack: () => void;
}

export const usePriceMultiPackStore = create<PriceMultiPackState>((set, _get) => ({
  priceMultiPackList: [{ id: '1', unit_name: '', conversion_value: '1', price: '' }],
  isWholesale: false,
  multiPackErrors: {},

  addMultiPackItem: () =>
    set((state) => ({
      priceMultiPackList: [
        ...state.priceMultiPackList,
        { id: `${Date.now()}`, unit_name: '', conversion_value: '1', price: '' },
      ],
    })),

  updateMultiPackItem: (index, field, value) =>
    set((state) => ({
      priceMultiPackList: state.priceMultiPackList.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
      multiPackErrors: {
        ...state.multiPackErrors,
        [index]: {
          ...(state.multiPackErrors[index] || {}),
          [field]: '',
        },
      },
    })),

  removeMultiPackItem: (index) =>
    set((state) => ({
      priceMultiPackList: state.priceMultiPackList.filter((_, i) => i !== index),
    })),

  toggleWholesale: (isWholesale) => set({ isWholesale }),

  resetMultiPack: () =>
    set({
      priceMultiPackList: [{ id: '1', unit_name: '', conversion_value: '1', price: '' }],
      isWholesale: false,
      multiPackErrors: {},
    }),
}));
