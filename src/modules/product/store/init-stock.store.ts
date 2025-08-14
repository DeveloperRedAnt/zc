'use client';

import type { PostInitStockRequestSchema } from '@/__generated__/api/dto/product.dto';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Local item types (mirror API schema for strong typing)
export type InitStockEqualItem = {
  product_id: number;
  product_variant_id: number;
  stock: {
    system_stock: number;
    physical_stock: number;
    difference: number;
  };
};

export type InitStockLessItem = {
  product_id: number;
  product_variant_id: number;
  stock: {
    system_stock: number;
    physical_stock: number;
    difference: number;
    reasons: { stock: number; reason: string }[];
  };
};

// State interface
interface InitStockState {
  note: string;
  store_id: number | null;

  // Keep items keyed by product_id as requested
  incoming_equal_by_product: Record<number, InitStockEqualItem>;
  incoming_less_by_product: Record<number, InitStockLessItem>;

  // Actions
  setNote: (note: string) => void;
  setStoreId: (storeId: number | null) => void;

  upsertEqual: (item: InitStockEqualItem) => void;
  removeEqual: (productId: number) => void;

  upsertLess: (item: InitStockLessItem) => void;
  removeLess: (productId: number) => void;

  // Selectors
  getEqualByProductId: (productId: number) => InitStockEqualItem | undefined;
  getLessByProductId: (productId: number) => InitStockLessItem | undefined;
  getReasonsByProductId: (productId: number) => { stock: number; reason: string }[];

  // Build API-shaped body for a single product_id
  getCheckResultByProductId: (productId: number) => PostInitStockRequestSchema;
  /**
   * @deprecated Use getCheckResultByProductId(productId) instead.
   */
  getHasilCheckByProductId: (productId: number) => PostInitStockRequestSchema;
  /**
   * @deprecated Use getCheckResultByProductId(productId) instead.
   */
  getRequestBodyByProductId: (productId: number) => PostInitStockRequestSchema;

  // Single setter to store by product_id
  setCheckResultByProductId: (
    productId: number,
    data: {
      equal?: InitStockEqualItem | null;
      less?: InitStockLessItem | null;
      note?: string;
      store_id?: number | null;
    }
  ) => void;

  clearAll: () => void;

  // Helper to build API payload
  toRequestBody: () => PostInitStockRequestSchema;
}

export const useInitStockStore = create<InitStockState>()(
  persist(
    (set, get) => ({
      note: '',
      store_id: null,
      incoming_equal_by_product: {},
      incoming_less_by_product: {},

      setNote: (note) => set({ note }),
      setStoreId: (storeId) => set({ store_id: storeId }),

      upsertEqual: (item) =>
        set((state) => ({
          incoming_equal_by_product: {
            ...state.incoming_equal_by_product,
            [item.product_id]: item,
          },
        })),

      removeEqual: (productId) =>
        set((state) => {
          const copy = { ...state.incoming_equal_by_product };
          delete copy[productId];
          return { incoming_equal_by_product: copy } as Partial<InitStockState>;
        }),

      upsertLess: (item) =>
        set((state) => ({
          incoming_less_by_product: {
            ...state.incoming_less_by_product,
            [item.product_id]: item,
          },
        })),

      removeLess: (productId) =>
        set((state) => {
          const copy = { ...state.incoming_less_by_product };
          delete copy[productId];
          return { incoming_less_by_product: copy } as Partial<InitStockState>;
        }),

      getEqualByProductId: (productId) => {
        const state = get();
        return state.incoming_equal_by_product[productId];
      },

      getLessByProductId: (productId) => {
        const state = get();
        return state.incoming_less_by_product[productId];
      },

      getReasonsByProductId: (productId) => {
        const item = get().incoming_less_by_product[productId];
        return item?.stock?.reasons ?? [];
      },

      getCheckResultByProductId: (productId) => {
        const state = get();
        const equal = state.incoming_equal_by_product[productId];
        const less = state.incoming_less_by_product[productId];
        return {
          note: state.note,
          store_id: state.store_id ?? 0,
          incoming_equal_to_system_stock: (equal
            ? [equal]
            : []) as PostInitStockRequestSchema['incoming_equal_to_system_stock'],
          incoming_less_than_system_stock: (less
            ? [less]
            : []) as PostInitStockRequestSchema['incoming_less_than_system_stock'],
        } as PostInitStockRequestSchema;
      },

      // Deprecated aliases for backward compatibility
      getHasilCheckByProductId: (productId) => get().getCheckResultByProductId(productId),
      getRequestBodyByProductId: (productId) => get().getCheckResultByProductId(productId),

      setCheckResultByProductId: (productId, data) =>
        set((state) => {
          const next: Partial<InitStockState> = {};

          if (typeof data.note !== 'undefined') next.note = data.note;
          if (typeof data.store_id !== 'undefined') next.store_id = data.store_id;

          // Clone maps to maintain immutability
          const equalMap = { ...state.incoming_equal_by_product };
          const lessMap = { ...state.incoming_less_by_product };

          if (Object.prototype.hasOwnProperty.call(data, 'equal')) {
            if (data.equal) {
              equalMap[productId] = data.equal;
            } else {
              delete equalMap[productId];
            }
            next.incoming_equal_by_product = equalMap;
          }

          if (Object.prototype.hasOwnProperty.call(data, 'less')) {
            if (data.less) {
              lessMap[productId] = data.less;
            } else {
              delete lessMap[productId];
            }
            next.incoming_less_by_product = lessMap;
          }

          return next as InitStockState;
        }),

      clearAll: () =>
        set({
          note: '',
          store_id: null,
          incoming_equal_by_product: {},
          incoming_less_by_product: {},
        }),

      toRequestBody: () => {
        const state = get();
        const equalArr = Object.values(state.incoming_equal_by_product);
        const lessArr = Object.values(state.incoming_less_by_product);
        return {
          note: state.note,
          store_id: state.store_id ?? 0,
          incoming_equal_to_system_stock:
            equalArr as PostInitStockRequestSchema['incoming_equal_to_system_stock'],
          incoming_less_than_system_stock:
            lessArr as PostInitStockRequestSchema['incoming_less_than_system_stock'],
        } as PostInitStockRequestSchema;
      },
    }),
    {
      name: 'init-stock-store',
      storage: createJSONStorage(() => localStorage),
      // Only persist what we need
      partialize: (state) => ({
        note: state.note,
        store_id: state.store_id,
        incoming_equal_by_product: state.incoming_equal_by_product,
        incoming_less_by_product: state.incoming_less_by_product,
      }),
    }
  )
);
