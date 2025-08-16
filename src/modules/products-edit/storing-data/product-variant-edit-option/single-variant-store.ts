// @/modules/products-edit/storing-data/product-variant-edit-option/single-variant-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PriceMultiPackItem = {
  id?: number;
  unitName: string;
  conversionValue: number;
  price: number;
};

export type ProductCardValue = {
  file: string;
  barcode: string;
  sku: string;
  minStock: number;
};

export type SingleVariantData = {
  variantId: number;
  productId: string;
  name: string;
  // Card values (form inputs)
  cardValue: ProductCardValue;
  // Multi pack data
  priceMultiPackList: PriceMultiPackItem[];
  isWholesale: boolean;
  multiPackErrors: { [itemId: number]: { [field: string]: string } };
  lastSaved: string | null;
};

export type SingleVariantEditState = {
  currentVariant: SingleVariantData | null;

  // Actions
  initializeSingleVariant: (
    productId: string,
    variantId: number,
    variantData: {
      name: string;
      thumbnail: string;
      barcode: string;
      sku: string;
      minStock: number;
      variantUnits?: Array<{
        id?: number;
        unitName: string;
        conversionValue: number;
        price: number;
      }>;
    }
  ) => void;
  updateCardValue: (cardValue: ProductCardValue) => void;
  updateMultiPack: (priceMultiPackList: PriceMultiPackItem[], isWholesale: boolean) => void;
  setMultiPackErrors: (errors: { [itemId: number]: { [field: string]: string } }) => void;
  saveSingleVariant: () => Promise<void>;
  clearSingleVariant: () => void;
  hasValidData: (productId: string, variantId: number) => boolean;
  getCurrentVariant: () => SingleVariantData | null;
};

const STORAGE_KEY = 'Single-variant-edit-data';

export const useSingleVariantEditStore = create<SingleVariantEditState>()(
  persist(
    (set, get) => ({
      currentVariant: null,

      initializeSingleVariant: (productId, variantId, variantData) => {
        const existingVariant = get().currentVariant;

        // Cek apakah data yang ada masih valid untuk variant dan product yang sama
        const shouldPreserveExisting =
          existingVariant &&
          existingVariant.variantId === variantId &&
          existingVariant.productId === productId &&
          existingVariant.lastSaved !== null;

        if (shouldPreserveExisting) {
          // Gunakan data yang sudah ada
          return;
        }

        // Initialize fresh data
        const variantUnits = variantData.variantUnits || [];
        const priceMultiPackList =
          variantUnits.length > 0
            ? variantUnits.map((unit) => ({
                id: unit.id || Date.now() + Math.random(),
                unitName: unit.unitName,
                conversionValue: unit.conversionValue,
                price: unit.price,
              }))
            : [
                {
                  id: Date.now(),
                  unitName: '',
                  conversionValue: 1,
                  price: 0,
                },
              ];

        const newVariant: SingleVariantData = {
          variantId,
          productId,
          name: variantData.name,
          cardValue: {
            file: variantData.thumbnail || '',
            barcode: variantData.barcode || '',
            sku: variantData.sku || '',
            minStock: variantData.minStock ?? 0,
          },
          priceMultiPackList,
          isWholesale: false,
          multiPackErrors: {},
          lastSaved: null,
        };

        set({ currentVariant: newVariant });
      },

      updateCardValue: (cardValue) => {
        const current = get().currentVariant;
        if (!current) return;

        set({
          currentVariant: {
            ...current,
            cardValue,
          },
        });
      },

      updateMultiPack: (priceMultiPackList, isWholesale) => {
        const current = get().currentVariant;
        if (!current) return;

        set({
          currentVariant: {
            ...current,
            priceMultiPackList,
            isWholesale,
          },
        });
      },

      setMultiPackErrors: (errors) => {
        const current = get().currentVariant;
        if (!current) return;

        set({
          currentVariant: {
            ...current,
            multiPackErrors: errors,
          },
        });
      },

      saveSingleVariant: async () => {
        return new Promise((resolve, reject) => {
          try {
            const current = get().currentVariant;
            if (!current) {
              reject(new Error('No variant data to save'));
              return;
            }

            const now = new Date().toISOString();

            set({
              currentVariant: {
                ...current,
                lastSaved: now,
              },
            });
            resolve();
          } catch (error) {
            console.error('Error saving single variant:', error);
            reject(error);
          }
        });
      },

      clearSingleVariant: () => {
        set({ currentVariant: null });
      },

      hasValidData: (productId, variantId) => {
        const current = get().currentVariant;
        return (
          current !== null &&
          current.productId === productId &&
          current.variantId === variantId &&
          current.lastSaved !== null
        );
      },

      getCurrentVariant: () => {
        return get().currentVariant;
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        currentVariant: state.currentVariant,
      }),
    }
  )
);
