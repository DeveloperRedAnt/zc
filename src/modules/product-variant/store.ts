import { listVariantAttributes } from '@/__generated__/api/client/product.client';
import type { VariantAttributeItem } from '@/__generated__/api/dto/product.dto';
import type { VariantAttributeOptionType } from '@/modules/master-data/components/product-variant/variant-select';
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
    (set, get) => ({
      productVariants: [] as ProductVariants,
      productVariantType: '' as ProductVariantType,
      formattedData: [] as FormattedDatas,
      finalData: [] as FormattedDatas,

      // Variant Attributes Caching State
      variantAttributes: [] as VariantAttributeOptionType[],
      variantAttributesLoading: false,
      variantAttributesPagination: {
        currentPage: 0,
        lastPage: 0,
        hasMore: true,
      },

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
      changeProductVariantTypeByID: (id: string, type: string, selectedID: string) =>
        set((state) => ({
          productVariants: state.productVariants.map((variant) => {
            if (variant.id === id) {
              return {
                ...variant,
                type,
                selected_id: selectedID,
              };
            }
            return variant;
          }),
        })),
      setProductVariantAttributeByID: (
        id: string,
        variantAttribute: VariantAttributeOptionType | null
      ) =>
        set((state) => ({
          productVariants: state.productVariants.map((variant) =>
            variant.id === id
              ? {
                  ...variant,
                  variantAttribute,
                  type: variantAttribute?.label || variant.type,
                }
              : variant
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

      // Variant Attributes Caching Methods
      loadVariantAttributes: async (page = 1, search = '') => {
        const state = get();

        // If searching, reset pagination
        if (search && state.variantAttributesPagination.currentPage > 0) {
          set({
            variantAttributes: [],
            variantAttributesPagination: {
              currentPage: 0,
              lastPage: 0,
              hasMore: true,
            },
          });
        }

        // Don't fetch if already loading
        if (state.variantAttributesLoading) {
          return state.variantAttributes;
        }

        // Don't fetch more pages if no more data available (but allow initial fetch)
        if (!search && page > 1 && !state.variantAttributesPagination.hasMore) {
          return state.variantAttributes;
        }

        try {
          set({ variantAttributesLoading: true });

          const params = {
            page,
            per_page: 10,
            ...(search && { search }),
          };

          const response = await listVariantAttributes(params);

          if (!response || !response.data || !Array.isArray(response.data)) {
            console.error('Invalid response structure:', response);
            set({ variantAttributesLoading: false });
            return state.variantAttributes;
          }

          const options: VariantAttributeOptionType[] = response.data.map(
            (attribute: VariantAttributeItem) => ({
              label: attribute.variant_attribute_name,
              value: attribute.id,
              data: attribute,
            })
          );

          const pagination = {
            currentPage: response.pagination?.current_page || page,
            lastPage: response.pagination?.last_page || page,
            hasMore: response.pagination ? page < response.pagination.last_page : false,
          };

          // If it's a new search or first page, replace; otherwise append
          const newAttributes =
            search || page === 1 ? options : [...state.variantAttributes, ...options];

          set({
            variantAttributes: newAttributes,
            variantAttributesPagination: pagination,
            variantAttributesLoading: false,
          });

          return newAttributes;
        } catch (error) {
          console.error('Error loading variant attributes:', error);
          set({ variantAttributesLoading: false });
          return state.variantAttributes;
        }
      },

      setVariantAttributesLoading: (loading: boolean) => set({ variantAttributesLoading: loading }),

      addVariantAttributes: (
        attributes: VariantAttributeOptionType[],
        pagination: { currentPage: number; lastPage: number; hasMore: boolean }
      ) =>
        set((state) => ({
          variantAttributes: [...state.variantAttributes, ...attributes],
          variantAttributesPagination: pagination,
        })),

      clearVariantAttributes: () =>
        set({
          variantAttributes: [],
          variantAttributesLoading: false,
          variantAttributesPagination: {
            currentPage: 0,
            lastPage: 0,
            hasMore: true,
          },
        }),
    }),
    {
      name: 'product-variant-store',
    }
  )
);
