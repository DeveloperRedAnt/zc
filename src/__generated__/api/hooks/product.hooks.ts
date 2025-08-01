

import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query';
import * as api from '../client';
import * as DTO from '../dto';
import { getQueryKey } from './base.hooks';

export function useListProducts(
  params: {
    'x-device-id': string;
    'x-store-id': string;
    'x-organization-id': string;
    body?: DTO.ProductSchema;
  },
  options?: UseQueryOptions<DTO.ApiResponse>
) {
  return useQuery({
    queryKey: getQueryKey('listProducts', params),
    queryFn: () => api.listProducts(params),
    ...options,
  });
}

export function useGetProductDetail(
  params: {
    'x-device-id': string;
    'x-store-id': string;
    'x-organization-id': string;
    body: { id: number };
  },
  options?
) {
  return useQuery<DTO.ApiProduct>({
    queryKey: ['getProductDetail', params.body.id],
    queryFn: () => api.ProductDetail(params),
    placeholderData: (prev) => prev,
    ...options,
  });
}

export function useGetProductStockHistories(
  params: {
    'x-device-id': string;
    'x-store-id': string;
    'x-organization-id': string;
    body: { id: number };
  },
  options?: UseQueryOptions<DTO.ProductStockHistoriesResponse[]>
) {
  const { body } = params;
  return useQuery({
    queryKey: ['getProductStockHistories', body],
    queryFn: () => api.ListProductStockHistories(params),
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
    queryKey: getQueryKey('InitializeStockDetails', params),
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

