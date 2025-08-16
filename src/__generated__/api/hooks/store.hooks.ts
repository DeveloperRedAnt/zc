// Store domain React Query hooks

import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query';
import * as api from '../client';
import * as DTO from '../dto';
import { getQueryKey } from './base.hooks';

export function useCreateStore(
  options?: UseMutationOptions<
    DTO.StoreSchema,
    Error,
    {
      'x-organization-id': string;
      'x-device-id': string;
      body: DTO.CreateStoreRequestSchema;
    }
  >
) {
  return useMutation({
    mutationFn: (params) => api.onCreateStore(params),
    ...options,
  });
}



export function useUpdateStore(
  options?: UseMutationOptions<
    DTO.StoreSchema,
    Error,
    {
      'x-organization-id': string;
      'x-device-id': string;
      store_id: string;
      body: DTO.StoreSchema;
    }
  >
) {
  return useMutation({
    mutationFn: (params) => api.onUpdateStore(params),
    ...options,
  });
}

export function useGetStoreDetail( params: {
    'x-organization-id': string;
    'x-device-id': string;
    body: {
      id: string;
    };
  },
  options?: UseQueryOptions<DTO.StoreSchema>
) {
  return useQuery({
    queryKey: ['getStoreDetail', params.body.id],
    queryFn: () => api.detailStore(params),
    ...options,
  });
}



export function useStoreStockFirstVariant(
  options?: UseMutationOptions<
    DTO.ProductStockPayload,
    Error,
    {
      "x-device-id": string;
      "x-store-id": string;
      "x-organization-id": string;
      body: DTO.ProductStockPayload;
    }
  >
) {
  return useMutation({
    mutationFn: async (params) => {
      const response = await api.onStoreStockFirstVariant(params);
      return response;
    },
    ...options,
  });
}


export function useGetStore(
  params: {
    'x-device-id': string;
    'x-store-id': string;
    'x-organization-id': string;
    body?: {
      page?: number;
      per_page?: number;
      search?: string;
      sort_by?: string;
      sort_direction?: 'asc' | 'desc';
    };
  },
  options?: UseQueryOptions<DTO.StoreListResponse>
) {
  return useQuery({
    queryKey: getQueryKey('listStore', params),
    queryFn: () => {
      return api.listStore(params.body || {})
    },
    ...options,
  });
}


export function useUpdateStoreV2(
  options?: UseMutationOptions<
    DTO.StoreSchema,
    Error,
    {
      store_id: string;
      body: DTO.StoreSchema;
    }
  >
) {
  return useMutation({
    mutationFn: (params) => api.updateStore(params),
    ...options,
  });
}
