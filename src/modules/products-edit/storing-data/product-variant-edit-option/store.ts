// @/modules/products-edit/storing-data/product-variant-edit-option/store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useVariantMultiPackStore } from './multi-pack-store';

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

export type VariantData = {
  id: number;
  name: string;
  // Card values (form inputs)
  cardValue: ProductCardValue;
  // Multi pack data
  priceMultiPackList: PriceMultiPackItem[];
  isWholesale: boolean;
  multiPackErrors: { [itemId: number]: { [field: string]: string } };
};

export type SingleVariantSaveData = {
  cardValue: ProductCardValue;
  priceMultiPackList: PriceMultiPackItem[];
  isWholesale: boolean;
  multiPackErrors: { [itemId: number]: { [field: string]: string } };
};

export type ProductVariantEditState = {
  productId: string;
  variants: VariantData[];
  lastSaved: string | null;
  hasLocalData: boolean;

  // Actions
  setProductId: (id: string) => void;
  updateVariantCardValue: (variantId: number, cardValue: ProductCardValue) => void;
  updateVariantMultiPack: (
    variantId: number,
    priceMultiPackList: PriceMultiPackItem[],
    isWholesale: boolean
  ) => void;
  setVariantMultiPackErrors: (
    variantId: number,
    errors: { [itemId: number]: { [field: string]: string } }
  ) => void;
  initializeVariants: (
    variants: Array<{
      id: number;
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
    }>
  ) => void;
  saveAllVariants: () => void;
  saveSingleVariant: (variantId: number, data: SingleVariantSaveData) => Promise<void>; // New method
  clearStore: () => void;
  getVariantData: (variantId: number) => VariantData | undefined;
  hasValidLocalData: (productId: string) => boolean;
};

const STORAGE_KEY = 'Product-variant-edit-option';

export const useProductVariantEditStore = create<ProductVariantEditState>()(
  persist(
    (set, get) => ({
      productId: '',
      variants: [],
      lastSaved: null,
      hasLocalData: false,

      setProductId: (id: string) => {
        set({ productId: id });
      },

      hasValidLocalData: (productId: string) => {
        const state = get();
        return (
          state.productId === productId && state.variants.length > 0 && state.lastSaved !== null
        );
      },

      initializeVariants: (variantList) => {
        const existingVariants = get().variants;
        const currentProductId = get().productId;

        // Check if we should preserve existing data
        const shouldPreserveExisting =
          existingVariants.length > 0 &&
          get().lastSaved !== null &&
          get().productId === currentProductId;

        if (shouldPreserveExisting) {
          // Only add new variants that don't exist, preserve existing ones
          const newVariants = [...existingVariants];

          for (const variant of variantList) {
            const existingIndex = newVariants.findIndex((v) => v.id === variant.id);

            if (existingIndex === -1) {
              // Add new variant
              const variantUnits = variant.variantUnits || [];
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

              newVariants.push({
                id: variant.id,
                name: variant.name,
                cardValue: {
                  file: variant.thumbnail || '',
                  barcode: variant.barcode || '',
                  sku: variant.sku || '',
                  minStock: variant.minStock ?? 0,
                },
                priceMultiPackList,
                isWholesale: false,
                multiPackErrors: {},
              });
            }
          }

          set({ variants: newVariants, hasLocalData: true });
          return;
        }

        // Initialize fresh data from API
        const newVariants = variantList.map((variant) => {
          const variantUnits = variant.variantUnits || [];
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

          return {
            id: variant.id,
            name: variant.name,
            cardValue: {
              file: variant.thumbnail || '',
              barcode: variant.barcode || '',
              sku: variant.sku || '',
              minStock: variant.minStock ?? 0,
            },
            priceMultiPackList,
            isWholesale: false,
            multiPackErrors: {},
          } as VariantData;
        });

        set({
          variants: newVariants,
          hasLocalData: false,
        });
      },

      updateVariantCardValue: (variantId: number, cardValue: ProductCardValue) => {
        const variants = get().variants;
        const updatedVariants = variants.map((variant) =>
          variant.id === variantId ? { ...variant, cardValue } : variant
        );

        set({ variants: updatedVariants });
      },

      updateVariantMultiPack: (
        variantId: number,
        priceMultiPackList: PriceMultiPackItem[],
        isWholesale: boolean
      ) => {
        const variants = get().variants;
        const updatedVariants = variants.map((variant) =>
          variant.id === variantId ? { ...variant, priceMultiPackList, isWholesale } : variant
        );

        set({ variants: updatedVariants });
      },

      setVariantMultiPackErrors: (
        variantId: number,
        errors: { [itemId: number]: { [field: string]: string } }
      ) => {
        const variants = get().variants;
        const updatedVariants = variants.map((variant) =>
          variant.id === variantId ? { ...variant, multiPackErrors: errors } : variant
        );

        set({ variants: updatedVariants });
      },

      getVariantData: (variantId: number) => {
        const variants = get().variants;
        return variants.find((variant) => variant.id === variantId);
      },

      saveSingleVariant: async (variantId: number, data: SingleVariantSaveData) => {
        return new Promise((resolve, reject) => {
          try {
            const now = new Date().toISOString();
            const variants = get().variants;

            // Find the variant to update
            const variantIndex = variants.findIndex((variant) => variant.id === variantId);

            if (variantIndex === -1) {
              reject(new Error(`Variant with ID ${variantId} not found`));
              return;
            }

            // Update only the specific variant
            const updatedVariants = [...variants];
            updatedVariants[variantIndex] = {
              id: updatedVariants[variantIndex]?.id ?? variantId,
              name: updatedVariants[variantIndex]?.name ?? '',
              cardValue: data.cardValue,
              priceMultiPackList: data.priceMultiPackList,
              isWholesale: data.isWholesale,
              multiPackErrors: data.multiPackErrors,
            };

            // Update store
            set({
              variants: updatedVariants,
              lastSaved: now,
              hasLocalData: true,
            });
            resolve();
          } catch (error) {
            console.error('Error saving single variant:', error);
            reject(error);
          }
        });
      },

      saveAllVariants: () => {
        const now = new Date().toISOString();

        // Get multi-pack data from the variant multi-pack store
        const multiPackStore = useVariantMultiPackStore.getState();

        // Update variants with current multi-pack data
        const variants = get().variants;
        const updatedVariants = variants.map((variant) => {
          const variantMultiPackData = multiPackStore.variantData.get(variant.id);

          if (variantMultiPackData) {
            return {
              ...variant,
              priceMultiPackList: variantMultiPackData.priceMultiPackList,
              isWholesale: variantMultiPackData.isWholesale,
              multiPackErrors: variantMultiPackData.multiPackErrors,
            };
          }

          return variant;
        });

        set({
          variants: updatedVariants,
          lastSaved: now,
          hasLocalData: true,
        });
      },

      clearStore: () => {
        set({
          productId: '',
          variants: [],
          lastSaved: null,
          hasLocalData: false,
        });
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        productId: state.productId,
        variants: state.variants,
        lastSaved: state.lastSaved,
        hasLocalData: state.hasLocalData,
      }),
    }
  )
);
