import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query';
import * as api from '../client/first_stock.client';
import * as DTO from '../dto/set-variant-stock.dto';


export function usePostStoreVariant(
  options?: UseMutationOptions<
    DTO.StoreVariantResponse,
    Error,
    DTO.StoreVariantRequest
  >
) {
  return useMutation({
    mutationFn: async (body) => {
      const response = await api.postStoreVariant(body);
      return response;
    },
    onError: (error) => {
      console.error('❌ Post Store Variant Error:', error);
      return Promise.reject(error);
    },
    onSuccess: (data) => {
        return data
    },
    ...options, 
  });
}


export function useGetProductDetail(
  productId: number,
  options?: Omit<UseQueryOptions<DTO.ProductDetail, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['productDetail', productId],
    queryFn: async () => {
      const response = await api.getProductDetail({ id: productId });
      return response
    },
    enabled: !!productId, 
    staleTime: 5 * 60 * 1000, 
    ...options,
  });
}

export function useGetProductVariantDetail(
  variantId: number,
  options?: Omit<UseQueryOptions<DTO.ProductVariantDetailResponse, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['productVariantDetail', variantId],
    queryFn: async () => {
      const response = await api.getProductVariantDetail({ id: variantId });
      return response
    },
    enabled: !!variantId, 
    staleTime: 5 * 60 * 1000, 
    ...options,
  });
}