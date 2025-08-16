import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query';
import * as api from '../client';
import * as DTO from '../dto';

// LocalStorage variant data structure
interface LocalStorageVariantData {
  state: {
    currentKey: string;
    variants: {
      [key: string]: {
        variantId: number;
        productId: string;
        name: string;
        cardValue: {
          file: string;
          barcode: string;
          sku: string;
          minStock: number;
        };
        isWholesale: boolean;
        lastSaved: string;
        multiPackErrors: { [itemId: number]: { [field: string]: string } };
        priceMultiPackList: Array<{
          id: number;
          unitName: string;
          conversionValue: number;
          price: number;
        }>;
      };
    };
  };
  version: number;
}

// Enhanced GetProductDetail type with merged localStorage data
export interface EnhancedGetProductDetail extends DTO.GetProductDetail {
  variants?: EnhancedGetProductDetailVariant[];
}

export interface EnhancedGetProductDetailVariant extends DTO.GetProductDetailVariant {
  variant_units: Array<{
    conversion_value: string;
    id: string;
    price: string;
    unit_name: string;
  }>;
}

// Helper function to get localStorage data
function getLocalStorageData(): LocalStorageVariantData | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem('Single-variant-edit-data');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error parsing local storage data:', error);
  }
  return null;
}

// Helper function to find matching localStorage variant data
function findMatchingLocalVariant(
  variantId: number, 
  productId: number,
  localData: LocalStorageVariantData | null
) {
  if (!localData?.state?.variants) return null;

  // Search through all variant keys in localStorage
  for (const key in localData.state.variants) {
    const variant = localData.state.variants[key];
    if (variant?.variantId === variantId && variant.productId === productId.toString()) {
      return variant;
    }
  }
  return null;
}

// Enhanced function to merge localStorage data with variants
function mergeVariantsWithLocalStorage(
  variants: DTO.GetProductDetailVariant[],
  productId: number
): EnhancedGetProductDetailVariant[] {
  const localData = getLocalStorageData();
  
  if (!localData) {
    return variants.map(variant => ({
      ...variant,
      variant_units: variant.variant_units || []
    }));
  }

  return variants.map((variant) => {
    const variantId = Number(variant.id);
    const matchingLocalVariant = findMatchingLocalVariant(variantId, productId, localData);

    if (matchingLocalVariant) {
      // Merge localStorage data with original variant
      return {
        ...variant,
        barcode: matchingLocalVariant.cardValue.barcode,
        sku_code: matchingLocalVariant.cardValue.sku,
        is_wholesale: matchingLocalVariant.isWholesale,
        minimum_stock: matchingLocalVariant.cardValue.minStock,
        variant_units: matchingLocalVariant.priceMultiPackList.map((price) => ({
          id: price.id.toString(),
          unit_name: price.unitName,
          conversion_value: price.conversionValue.toString(),
          price: price.price.toString(),
        })),
      };
    }

    return {
      ...variant,
      variant_units: variant.variant_units || []
    };
  });
}

export function useListProducts(
  params: {
    body: DTO.ProductSchema;
  },
  options?: UseQueryOptions<DTO.ApiResponse>
) {
  return useQuery({
    queryKey: ['listProducts', params.body],
    queryFn: () => api.listProducts(params.body),
    ...options,
  });
}

export function useListProductStockOpnames(
  params: DTO.ProductStockOpnameRequest,
  options?: UseQueryOptions<DTO.ProductStockOpnameResponse>
) {
  return useQuery({
    queryKey: ['listProductStockOpnames', params],
    queryFn: () => api.getListProductStockOpnames(params),
    ...options,
  });
}

export function useGetProductDetail(
  params: {
     id: number 
  },
  options?: UseQueryOptions<EnhancedGetProductDetail>
) {
  return useQuery<EnhancedGetProductDetail>({
    queryKey: ['getProductDetail', params.id],
    queryFn: async () => {
      const data = await api.ProductDetail({id: params.id});
      
      // Merge with localStorage data if variants exist
      if (data.variants && data.variants.length > 0) {
        const mergedVariants = mergeVariantsWithLocalStorage(data.variants, params.id);
        return {
          ...data,
          variants: mergedVariants
        };
      }
      
      return data;
    },
    placeholderData: (prev) => prev,
    ...options,
  });
}

export function useGetProductStockHistories(
  params: {
    id: number;
  },
  options?: UseQueryOptions<DTO.ProductStockHistoriesResponse[]>
) {
  return useQuery({
    queryKey: ['getProductStockHistories', params.id],
    queryFn: () => api.ListProductStockHistories({id: params.id}),
    placeholderData: (prev) => prev,
    ...options,
  });
}

export function useSetFirstStock(
  options?: UseMutationOptions<
    DTO.SetFirstStockPayload,
    Error,
    {
      body: DTO.InitializeStockRequestSchema;
      "x-device-id": string;
      "x-store-id": string;
      "x-organization-id": string;
    }
  >
) {
  return useMutation({
    mutationFn: async (params) =>
      api.InitializeStock(params),
    ...options,
  });
}

export function useProductTags(
  params: {
    'x-device-id': string;
    'x-store-id': string;
    'x-organization-id': string;
  },
  options?: UseQueryOptions<string[]>
) {
  return useQuery({
    queryKey: ['product-tags', params],
    queryFn: () => api.listProductTags(params),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  });
}

/**
 * Create product mutation hook
 */
export function useCreateProduct(
  options?: UseMutationOptions<
    DTO.CreateProductResponseData,
    Error,
    {
      body: DTO.CreateProductRequestSchema;
    }
  >
) {
  return useMutation({
    mutationFn: async (params) => api.createProduct(params),
    ...options,
  });
}

export function useCheckStockBaik(
  options?: UseMutationOptions<
    DTO.CheckStockBaikItems,
    Error,
    {
      body: DTO.GetCheckStockBaikRequestSchema
    }
  >
) {

  return useMutation({
    mutationFn: async (params) => api.checkStockBaik({body: params.body}),
    ...options,
  });
}

export function useAdjustmentStockTakings(
  options?: UseMutationOptions<
    DTO.PostInitStockResponseSchema,
    Error,
    {
      body: DTO.PostInitStockRequestSchema;
    }
  >
) {
  return useMutation({
    mutationFn: async (params) => api.adjustStockOpname(params.body),
    ...options,
  });
}

/**
 * Update product mutation hook with localStorage integration
 */
export function useUpdateProduct(options?: UseMutationOptions<DTO.CreateProductResponseData,
    Error,
    {
      body: DTO.UpdateProductRequestSchema;
    }
  >
) {
  return useMutation({
    mutationFn: async (params) => api.updateProduct({ body: params.body}),
    ...options,
  });
}

// Export helper functions
export { getLocalStorageData, findMatchingLocalVariant, mergeVariantsWithLocalStorage };