import { create } from 'zustand';
import type { TrackStockProduct } from './types';

interface TrackStockProductState {
  data: TrackStockProduct;
  setTrackStock: (partial: Partial<TrackStockProduct>) => void;
  resetTrackStock: () => void;
}

export const useTrackStockProductStore = create<TrackStockProductState>((set) => ({
  data: {
    is_track_stock: true,
    minimum_stock: null,
    is_enable_expired_reminder: false,
    expired_reminder_in_days: null,
    expired_reminder_in_date: null,
  },
  setTrackStock: (partial) =>
    set((state) => ({
      data: {
        ...state.data,
        ...partial,
      },
    })),
  resetTrackStock: () =>
    set({
      data: {
        is_track_stock: true,
        minimum_stock: null,
        is_enable_expired_reminder: false,
        expired_reminder_in_days: null,
        expired_reminder_in_date: null,
      },
    }),
}));
