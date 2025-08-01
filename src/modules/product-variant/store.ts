import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  FormattedData,
  FormattedDatas,
  PricesVariantOption,
  ProductVariant,
  ProductVariantOption,
  ProductVariantType,
  ProductVariants,
} from './types';

import type { ProductVariantStore } from './types';

export const useProductVariantStore = create<ProductVariantStore>()(
  persist(
    (set) => ({
      productVariants: [] as ProductVariants,
      productVariantType: '' as ProductVariantType,
      formattedData: [] as FormattedDatas,
      finalData: [] as FormattedDatas,

      addProductVariant: (productVariant: ProductVariant) =>
        set((state) => ({ productVariants: [...state.productVariants, productVariant] })),
      removeProductVariant: (id: string) =>
        set((state) => ({
          productVariants: state.productVariants.filter((variant) => variant.id !== id),
        })),
      updateProductVariant: (id: string, data: Partial<ProductVariant>) =>
        set((state) => ({
          productVariants: state.productVariants.map((variant) =>
            variant.id === id ? { ...variant, ...data } : variant
          ),
        })),
      addProductVariantOption: (productVariantID, option) =>
        set((state) => {
          const productVariant = state.productVariants.find(
            (variant) => variant.id === productVariantID
          );
          if (!productVariant) return state;
          return {
            productVariants: state.productVariants.map((variant) =>
              variant.id === productVariantID
                ? { ...variant, options: [...(variant.options || []), option] }
                : variant
            ),
          };
        }),
      updateProductVariantOptionByProductIDandOptionID: (
        productVariantID: string,
        optionID: string,
        data: ProductVariantOption
      ) =>
        set((state) => {
          const productVariant = state.productVariants.find(
            (variant) => variant.id === productVariantID
          );
          if (!productVariant) return state;

          return {
            productVariants: state.productVariants.map((variant) =>
              variant.id === productVariantID
                ? {
                    ...variant,
                    options: variant.options?.map((option) =>
                      option.id === optionID ? { ...option, ...data } : option
                    ),
                  }
                : variant
            ),
          };
        }),
      deleteOptionByProductIDandOptionID: (productVariantID: string, optionID: string) =>
        set((state) => {
          const index = state.productVariants.findIndex(
            (variant) => variant.id === productVariantID
          );

          if (index === -1) return state;

          const currentVariant = state.productVariants[index];
          if (!currentVariant) return state;
          const updatedVariant: ProductVariant = {
            ...currentVariant,
            id: currentVariant.id,
            type: currentVariant.type,
            options: (currentVariant.options ?? []).filter((option) => option.id !== optionID),
          };

          const updatedVariants = [...state.productVariants];
          updatedVariants[index] = updatedVariant;

          return { productVariants: updatedVariants };
        }),
      changeProductVariantTypeByID: (id: string, type: ProductVariantType) =>
        set((state) => ({
          productVariants: state.productVariants.map((variant) =>
            variant.id === id ? { ...variant, type } : variant
          ),
        })),
      addPricesVariantOption: (
        productVariantID: string,
        optionID: string,
        price: { id: string; namePcs: string; quantity: string; price: number | string }
      ) =>
        set((state) => {
          const normalizedPrice: PricesVariantOption = {
            ...price,
            price: typeof price.price === 'string' ? parseFloat(price.price) : price.price,
            quantity:
              typeof price.quantity === 'string' ? parseFloat(price.quantity) : price.quantity,
          };
          return {
            productVariants: state.productVariants.map((variant) => {
              if (variant.id !== productVariantID) return variant;

              return {
                ...variant,
                options: (variant.options ?? []).map((option) => {
                  if (option.id !== optionID) return option;

                  return {
                    ...option,
                    prices: [...(option.prices || []), normalizedPrice],
                  };
                }),
              };
            }),
          };
        }),

      setFormattedData: (data: FormattedDatas) =>
        set(() => ({
          formattedData: data,
        })),

      updateFormattedData: (id: string, data: Partial<FormattedData>) => {
        return set((state) => ({
          formattedData: state.formattedData.map((item) =>
            item.id === id
              ? {
                  ...item,
                  ...data,
                  id: item.id,
                  name: data.name ?? item.name,
                  thumbnail: data.thumbnail ?? item.thumbnail,
                  barcode: data.barcode ?? item.barcode,
                  sku: data.sku ?? item.sku,
                  minStock: data.minStock ?? item.minStock,
                  prices: data.prices ?? item.prices,
                  typeprice: data.typeprice ?? item.typeprice,
                }
              : item
          ),
        }));
      },

      // Function untuk batch update prices dan typeprice (dipanggil dari handleSave)
      updateFormattedDataPrices: (id: string, prices: PricesVariantOption[], typeprice: string) =>
        set((state) => {
          return {
            formattedData: state.formattedData.map((item) =>
              item.id === id ? { ...item, prices: [...prices], typeprice: typeprice } : item
            ),
          };
        }),

      // Function untuk bulk update prices ke multiple formatted data (untuk bulk edit dialog)
      bulkUpdateFormattedDataPrices: (
        selectedIds: string[],
        prices: PricesVariantOption[],
        typeprice: string
      ) =>
        set((state) => {
          return {
            formattedData: state.formattedData.map((item) =>
              selectedIds.includes(item.id)
                ? { ...item, prices: [...prices], typeprice: typeprice }
                : item
            ),
          };
        }),

      // Function untuk batch update semua formatted data dengan prices dan typeprice
      batchUpdateAllFormattedDataPrices: (
        priceData: Record<string, PricesVariantOption[]>,
        typeprice: string
      ) =>
        set((state) => {
          return {
            formattedData: state.formattedData.map((item) => ({
              ...item,
              prices: [...(priceData[item.id] ?? item.prices ?? [])],
              typeprice: typeprice,
            })),
          };
        }),

      // Helper function untuk get existing price data (untuk loadExistingPriceData)
      getExistingPriceData: () => (state) => {
        const existingPriceOptions: Record<string, PricesVariantOption[]> = {};
        let hasExistingData = false;

        for (const data of state.formattedData) {
          if (data.prices && data.prices.length > 0) {
            hasExistingData = true;
            existingPriceOptions[data.id] = data.prices;
          }
        }

        return { existingPriceOptions, hasExistingData };
      },

      clearAllData: () =>
        set(() => ({
          productVariants: [],
          productVariantType: '',
          formattedData: [],
        })),

      // Function untuk clear hanya formattedData
      clearFormattedData: () =>
        set(() => ({
          formattedData: [],
        })),

      setFinalData: (data: FormattedDatas) =>
        set(() => ({
          finalData: data,
        })),

      clearFinalData: () =>
        set(() => ({
          finalData: [],
        })),
    }),
    {
      name: 'product-variant-store',
    }
  )
);
