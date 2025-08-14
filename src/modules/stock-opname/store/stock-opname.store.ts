import * as DTO from '@/__generated__/api/dto/product.dto';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface StockDetail {
  product_id: number;
  product_variant_id: number;
  physical_stock: number;
  name: string;
  stock: {
    system_stock: number;
    physical_stock: number;
    difference: number;
  };
}

export interface StockOpnameData {
  stockData: DTO.CheckStockBaikItems;
  store_id?: number;
  note?: string;
}

export type StockOpnameBucket = StockOpnameData;

interface StockOpnameState {
  // Map of temporary id -> categorized stock opname result with metadata
  data: Record<string, StockOpnameBucket>;

  // Save/replace a bucket for an id
  setById: (
    id: string,
    payload: DTO.CheckStockBaikItems,
    metadata?: { store_id?: number; note?: string }
  ) => void;

  // Update metadata for existing id
  updateMetadata: (id: string, metadata: { store_id?: number; note?: string }) => void;

  // Get a bucket by id (also exposed as selector via hook usage)
  getById: (id: string) => StockOpnameBucket | undefined;

  // Remove specific id
  removeById: (id: string) => void;

  // Clear all
  clear: () => void;
}

export const useStockOpnameStore = create<StockOpnameState>()(
  persist(
    (set, get) => ({
      data: {},
      setById: (id, payload, metadata) =>
        set((state) => ({
          data: {
            ...state.data,
            [id]: {
              stockData: payload,
              store_id: metadata?.store_id,
              note: metadata?.note,
            },
          },
        })),
      updateMetadata: (id, metadata) =>
        set((state) => {
          const existing = state.data[id];
          if (!existing) return state;

          return {
            data: {
              ...state.data,
              [id]: {
                ...existing,
                store_id: metadata.store_id ?? existing.store_id,
                note: metadata.note ?? existing.note,
              },
            },
          };
        }),
      getById: (id) => get().data[id],
      removeById: (id) =>
        set((state) => {
          const { [id]: _removed, ...rest } = state.data;
          return { data: rest };
        }),
      clear: () => set({ data: {} }),
    }),
    {
      name: 'stock-opname-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist data map
      partialize: (state) => ({ data: state.data }),
    }
  )
);

// Helper selector to easily get by id inside components
export const useStockOpnameById = (id: string | null | undefined) =>
  useStockOpnameStore((state) => (id ? state.data[id] : undefined));
