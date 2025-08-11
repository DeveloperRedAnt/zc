

import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query';
import * as api from '../client';
import * as DTO from '../dto';

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
  options?
) {
  return useQuery<DTO.ApiProduct>({
    queryKey: ['getProductDetail', params.id],
    queryFn: () => api.ProductDetail({id: params.id}),
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


export function useStockDetail(
  params: DTO.GetRequestStockSchema, 
    options?: UseQueryOptions<DTO.ReturnDetailTempProductResponseSchema>
) {
  return useQuery({
    queryKey: ['InitializeStockDetails', params],
    queryFn: () => 
      api.InitializeStockDetails(params),
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

