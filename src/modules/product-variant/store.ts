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

export const useProductVariantStore = create()(
  persist(
    (set) => ({
      productVariants: [] as ProductVariants,
      productVariantType: '' as ProductVariantType,
      formattedData: [] as FormattedDatas,

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
      changeProductVariantTypeByID: (id: string, type: ProductVariantType) =>
        set((state) => ({
          productVariants: state.productVariants.map((variant) =>
            variant.id === id ? { ...variant, type } : variant
          ),
        })),
      addPricesVariantOption: (
        productVariantID: string,
        optionID: string,
        price: { id: string; namePcs: string; quantity: string; price: string }
      ) =>
        set((state) => {
          return {
            productVariants: state.productVariants.map((variant) => {
              if (variant.id !== productVariantID) return variant;

              return {
                ...variant,
                options: variant.options.map((option) => {
                  if (option.id !== optionID) return option;

                  return {
                    ...option,
                    prices: [...(option.prices || []), price],
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
            item.id === id ? { ...data, id: item.id } : item
          ),
        }));
      },

      // Tambahkan function-function ini ke dalam useProductVariantStore

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
    }),
    {
      name: 'product-variant-store',
    }
  )
);
