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
  storeId: number,
  options?: Omit<UseQueryOptions<DTO.ProductDetailResponse, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['productDetail', productId, storeId],
    queryFn: async () => {
      const response = await api.getProductDetail({ id: productId, store_id: storeId });
      return response;
    },
    enabled: !!productId && !!storeId, 
    staleTime: 5 * 60 * 1000, 
    ...options,
  });
}