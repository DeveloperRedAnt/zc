import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import * as api from '../../client/reports/sales-details.client';
import * as DTO from '../../dto';

export function useGetDetailTransaction(
  params: {
    body: DTO.GetDetailTransactionPayloadSchema;
  },
  options?: UseQueryOptions<DTO.ApiDetailTransactionResponse>
) {
  return useQuery<DTO.ApiDetailTransactionResponse, Error>({
    queryKey: ['listDetailTransaction', params.body],
    queryFn: () => api.listDetailTransaction(params.body),
    ...options,
  });
}


export function useGetCashiers(
  params?: {
    body?: DTO.GetCashiersPayloadSchema;
  },
  options?: UseQueryOptions<DTO.ApiCashiersResponse>
) {
  return useQuery<DTO.ApiCashiersResponse, Error>({
    queryKey: ['listCashiers', params?.body],
    queryFn: () => api.listCashiers(params?.body),
    ...options,
  });
}

export function useGetProducts(
  params?: {
    body?: DTO.GetProductsPayloadSchema;
  },
  options?: UseQueryOptions<DTO.ApiProductsResponse>
) {
  return useQuery<DTO.ApiProductsResponse, Error>({
    queryKey: ['listProductsDetails', params?.body],
    queryFn: () => api.listProductsDetails(params?.body),
    ...options,
  });
}