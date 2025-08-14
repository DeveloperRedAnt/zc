import { create } from 'zustand';
import type { TrackStockProduct } from './types';

// Initial state for a single product
const getInitialState = (): TrackStockProduct => ({
  is_track_stock: true,
  minimum_stock: null,
  is_enable_expired_reminder: false,
  expired_reminder_in_days: null,
  expired_reminder_in_date: null,
});

interface TrackStockProductStoreState {
  products: Record<number, TrackStockProduct>;
}

interface TrackStockProductStoreActions {
  setTrackStock: (productId: number, partial: Partial<TrackStockProduct>) => void;
  resetTrackStock: (productId: number) => void;
  getProductData: (productId: number) => TrackStockProduct;
}

type TrackStockProductStore = TrackStockProductStoreState & TrackStockProductStoreActions;

export const useTrackStockProductStore = create<TrackStockProductStore>((set, get) => ({
  // State
  products: {},

  // Helper to get product data with default values
  getProductData: (productId: number) => {
    const state = get();
    return state.products[productId] || getInitialState();
  },

  // Actions
  setTrackStock: (productId: number, partial: Partial<TrackStockProduct>) =>
    set((state) => ({
      products: {
        ...state.products,
        [productId]: {
          ...get().getProductData(productId),
          ...partial,
        },
      },
    })),

  resetTrackStock: (productId: number) =>
    set((state) => ({
      products: {
        ...state.products,
        [productId]: getInitialState(),
      },
    })),
}));
