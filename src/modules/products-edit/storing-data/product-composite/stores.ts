import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CompositeComponent, ProductComposite } from './types';

// Initial state for a single product
const getInitialState = (): ProductComposite => ({
  production_per_batch: 0,
  components: [],
  current_stock: 0,
});

interface ProductCompositeStoreState {
  products: Record<number, ProductComposite>;
}

interface ProductCompositeStoreActions {
  setProductionPerBatch: (productId: number, value: number) => void;
  addComponent: (productId: number) => void;
  updateComponent: <K extends keyof CompositeComponent>(
    productId: number,
    id: string,
    field: K,
    value: CompositeComponent[K]
  ) => void;
  removeComponent: (productId: number, id: string) => void;
  resetComposite: (productId: number) => void;
  getProductData: (productId: number) => ProductComposite;
  setComposite: (productId: number, composite: ProductComposite) => void;
}

type ProductCompositeStore = ProductCompositeStoreState & ProductCompositeStoreActions;

export const useProductCompositeStore = create<ProductCompositeStore>()(
  persist(
    (set, get) => ({
      // State
      products: {},

      // Helper to get product data with default values
      getProductData: (productId: number) => {
        const state = get();
        return state.products[productId] || getInitialState();
      },

      // Actions
      setProductionPerBatch: (productId: number, value: number) =>
        set((state) => ({
          products: {
            ...state.products,
            [productId]: {
              ...get().getProductData(productId),
              production_per_batch: value,
            },
          },
        })),

      addComponent: (productId: number) =>
        set((state) => {
          const currentData = get().getProductData(productId);
          return {
            products: {
              ...state.products,
              [productId]: {
                ...currentData,
                components: [
                  ...currentData.components,
                  {
                    id: crypto.randomUUID(),
                    product_id: null,
                    name: null,
                    quantity: 0,
                  },
                ],
              },
            },
          };
        }),

      updateComponent: <K extends keyof CompositeComponent>(
        productId: number,
        id: string,
        field: K,
        value: CompositeComponent[K]
      ) =>
        set((state) => {
          const currentData = get().getProductData(productId);
          return {
            products: {
              ...state.products,
              [productId]: {
                ...currentData,
                components: currentData.components.map((comp) =>
                  comp.id === id ? { ...comp, [field]: value } : comp
                ),
              },
            },
          };
        }),
      setComposite: (productId, composite) =>
        set((state) => ({
          products: {
            ...state.products,
            [productId]: composite,
          },
        })),

      removeComponent: (productId: number, id: string) =>
        set((state) => {
          const currentData = get().getProductData(productId);
          return {
            products: {
              ...state.products,
              [productId]: {
                ...currentData,
                components: currentData.components.filter((comp) => comp.id !== id),
              },
            },
          };
        }),

      resetComposite: (productId: number) =>
        set((state) => ({
          products: {
            ...state.products,
            [productId]: getInitialState(),
          },
        })),
    }),
    {
      name: 'product-composite-store', // nama key di localStorage
    }
  )
);
