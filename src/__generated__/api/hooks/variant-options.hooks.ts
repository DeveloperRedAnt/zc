import { useMutation, useQuery } from '@tanstack/react-query';
import * as api from '../client/variant-options.client';
import * as DTO from '../dto/variant-options.dto';

export function useCheckEditVariant(
  params: {
     id: number 
  },
  options?
) {
  return useQuery<DTO.CheckEditVariantResponse>({
    queryKey: ['useCheckEditVariant', params.id],
    queryFn: () => api.CheckEditVariant({id: params.id}),
    placeholderData: (prev) => prev,
    ...options,
  });
}

export function useCreateVariantOption(options?: any) {
  return useMutation<
    DTO.CreateVariantOptionResponse,
    Error,                           
    { productId: number; payload: DTO.CreateVariantOptionRequest }
  >({
    mutationFn: ({ productId, payload }) =>
      api.CreateVariantOption(productId, payload),
    ...options,
  });
}