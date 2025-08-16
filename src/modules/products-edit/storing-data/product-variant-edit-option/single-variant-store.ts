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
  // Store multiple variants data instead of single
  variants: { [key: string]: SingleVariantData }; // key format: "productId-variantId"
  currentKey: string | null;

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
  clearSingleVariant: (productId?: string, variantId?: number) => void;
  hasValidData: (productId: string, variantId: number) => boolean;
  getCurrentVariant: () => SingleVariantData | null;
  setCurrentVariant: (productId: string, variantId: number) => void;
};

const STORAGE_KEY = 'Single-variant-edit-data';

// Helper function to create key
const createKey = (productId: string, variantId: number): string => `${productId}-${variantId}`;

export const useSingleVariantEditStore = create<SingleVariantEditState>()(
  persist(
    (set, get) => ({
      variants: {},
      currentKey: null,

      initializeSingleVariant: (productId, variantId, variantData) => {
        const key = createKey(productId, variantId);
        const existingVariants = get().variants;
        const existingVariant = existingVariants[key];

        // Cek apakah data yang ada masih valid untuk variant dan product yang sama
        const shouldPreserveExisting = existingVariant && existingVariant.lastSaved !== null;

        if (shouldPreserveExisting) {
          // Set as current variant and use existing data
          set({ currentKey: key });
          return;
        }

        // Initialize fresh data
        const variantUnits = variantData.variantUnits || [];
        const priceMultiPackList: PriceMultiPackItem[] =
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

        set({
          variants: {
            ...existingVariants,
            [key]: newVariant,
          },
          currentKey: key,
        });
      },

      setCurrentVariant: (productId, variantId) => {
        const key = createKey(productId, variantId);
        set({ currentKey: key });
      },

      updateCardValue: (cardValue) => {
        const { variants, currentKey } = get();
        if (!currentKey || !variants[currentKey]) return;

        const current = variants[currentKey];
        const updatedVariant = {
          ...current,
          cardValue,
        };

        set({
          variants: {
            ...variants,
            [currentKey]: updatedVariant,
          },
        });
      },

      updateMultiPack: (priceMultiPackList, isWholesale) => {
        const { variants, currentKey } = get();
        if (!currentKey || !variants[currentKey]) return;

        const current = variants[currentKey];
        const updatedVariant = {
          ...current,
          priceMultiPackList,
          isWholesale,
        };

        set({
          variants: {
            ...variants,
            [currentKey]: updatedVariant,
          },
        });
      },

      setMultiPackErrors: (errors) => {
        const { variants, currentKey } = get();
        if (!currentKey || !variants[currentKey]) return;

        const current = variants[currentKey];
        const updatedVariant = {
          ...current,
          multiPackErrors: errors,
        };

        set({
          variants: {
            ...variants,
            [currentKey]: updatedVariant,
          },
        });
      },

      saveSingleVariant: async () => {
        return new Promise((resolve, reject) => {
          try {
            const { variants, currentKey } = get();
            if (!currentKey || !variants[currentKey]) {
              reject(new Error('No variant data to save'));
              return;
            }

            const current = variants[currentKey];
            const now = new Date().toISOString();

            const updatedVariant = {
              ...current,
              lastSaved: now,
            };

            set({
              variants: {
                ...variants,
                [currentKey]: updatedVariant,
              },
            });
            resolve();
          } catch (error) {
            console.error('Error saving single variant:', error);
            reject(error);
          }
        });
      },

      clearSingleVariant: (productId, variantId) => {
        const { variants } = get();

        if (productId && variantId) {
          // Clear specific variant
          const key = createKey(productId, variantId);
          const { [key]: _, ...remainingVariants } = variants;

          set({
            variants: remainingVariants,
            currentKey: get().currentKey === key ? null : get().currentKey,
          });
        } else {
          // Clear all variants
          set({
            variants: {},
            currentKey: null,
          });
        }
      },

      hasValidData: (productId, variantId) => {
        const key = createKey(productId, variantId);
        const variants = get().variants;
        const variant = variants[key];

        return (
          variant !== undefined &&
          variant.productId === productId &&
          variant.variantId === variantId &&
          variant.lastSaved !== null
        );
      },

      getCurrentVariant: () => {
        const { variants, currentKey } = get();
        return currentKey && variants[currentKey] ? variants[currentKey] : null;
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        variants: state.variants,
        currentKey: state.currentKey,
      }),
    }
  )
);
