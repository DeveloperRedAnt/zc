import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CompositeComponent, ProductComposite } from './types';

interface ProductCompositeState {
  data: ProductComposite;
  setProductionPerBatch: (value: number) => void;
  addComponent: () => void;
  updateComponent: <K extends keyof CompositeComponent>(
    id: string,
    field: K,
    value: CompositeComponent[K]
  ) => void;
  removeComponent: (id: string) => void;
  resetComposite: () => void;
}

export const useProductCompositeStore = create<ProductCompositeState>()(
  persist(
    (set) => ({
      data: {
        production_per_batch: 0,
        components: [],
      },

      setProductionPerBatch: (value) =>
        set((state) => ({
          data: {
            ...state.data,
            production_per_batch: value,
          },
        })),

      addComponent: () =>
        set((state) => ({
          data: {
            ...state.data,
            components: [
              ...state.data.components,
              {
                id: crypto.randomUUID(),
                product_id: null,
                product_name: null,
                quantity: 0,
              },
            ],
          },
        })),

      updateComponent: (id, field, value) =>
        set((state) => ({
          data: {
            ...state.data,
            components: state.data.components.map((comp) =>
              comp.id === id ? { ...comp, [field]: value } : comp
            ),
          },
        })),

      removeComponent: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            components: state.data.components.filter((comp) => comp.id !== id),
          },
        })),

      resetComposite: () =>
        set({
          data: {
            production_per_batch: 0,
            components: [],
          },
        }),
    }),
    {
      name: 'product-composite-store', // nama key di localStorage
    }
  )
);
