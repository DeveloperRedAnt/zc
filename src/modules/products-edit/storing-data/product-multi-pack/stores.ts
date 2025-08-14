import { create } from 'zustand';
import { PriceMultiPackItem } from './types';

interface PriceMultiPackData {
  priceMultiPackList: PriceMultiPackItem[];
  isWholesale: boolean;
}

// Initial state for a single product
const getInitialState = (): PriceMultiPackData => ({
  priceMultiPackList: [{ id: Date.now(), itemName: '', quantity: 1, price: 0 }],
  isWholesale: false,
});

interface PriceMultiPackStoreState {
  products: Record<number, PriceMultiPackData>;
}

interface PriceMultiPackStoreActions {
  setMultiPackList: (productId: number, list: PriceMultiPackItem[]) => void;
  addMultiPackItem: (productId: number) => void;
  updateMultiPackItem: (
    productId: number,
    id: number,
    field: keyof PriceMultiPackItem,
    value: string | number
  ) => void;
  removeMultiPackItem: (productId: number, id: number) => void;
  resetMultiPack: (productId: number) => void;
  toggleWholesale: (productId: number) => void;
  setWholesale: (productId: number, wholesale: boolean) => void;
  getProductData: (productId: number) => PriceMultiPackData;
}

type PriceMultiPackStore = PriceMultiPackStoreState & PriceMultiPackStoreActions;

export const usePriceMultiPackStore = create<PriceMultiPackStore>((set, get) => ({
  // State
  products: {},

  // Helper to get product data with default values
  getProductData: (productId: number) => {
    const state = get();
    return state.products[productId] || getInitialState();
  },

  // Actions
  setMultiPackList: (productId: number, list: PriceMultiPackItem[]) =>
    set((state) => ({
      products: {
        ...state.products,
        [productId]: {
          ...get().getProductData(productId),
          priceMultiPackList: list,
        },
      },
    })),

  toggleWholesale: (productId: number) =>
    set((state) => ({
      products: {
        ...state.products,
        [productId]: {
          ...get().getProductData(productId),
          isWholesale: !get().getProductData(productId).isWholesale,
        },
      },
    })),

  setWholesale: (productId: number, wholesale: boolean) =>
    set((state) => ({
      products: {
        ...state.products,
        [productId]: {
          ...get().getProductData(productId),
          isWholesale: wholesale,
        },
      },
    })),

  addMultiPackItem: (productId: number) =>
    set((state) => {
      const currentData = get().getProductData(productId);
      return {
        products: {
          ...state.products,
          [productId]: {
            ...currentData,
            priceMultiPackList: [
              ...currentData.priceMultiPackList,
              { id: Date.now(), itemName: '', quantity: 1, price: 0 },
            ],
          },
        },
      };
    }),

  updateMultiPackItem: (
    productId: number,
    id: number,
    field: keyof PriceMultiPackItem,
    value: string | number
  ) =>
    set((state) => {
      const currentData = get().getProductData(productId);
      return {
        products: {
          ...state.products,
          [productId]: {
            ...currentData,
            priceMultiPackList: currentData.priceMultiPackList.map((item) =>
              item.id === id ? { ...item, [field]: value } : item
            ),
          },
        },
      };
    }),

  removeMultiPackItem: (productId: number, id: number) =>
    set((state) => {
      const currentData = get().getProductData(productId);
      return {
        products: {
          ...state.products,
          [productId]: {
            ...currentData,
            priceMultiPackList: currentData.priceMultiPackList.filter((item) => item.id !== id),
          },
        },
      };
    }),

  resetMultiPack: (productId: number) =>
    set((state) => ({
      products: {
        ...state.products,
        [productId]: getInitialState(),
      },
    })),
}));
