import { UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query';
import * as api from '../../client';
import * as DTO from '../../dto/master-data/variant-product.dto';

export type VariantProductListParams = {
  page?: number;
  per_page?: number;
  search?: string;
};

export function useGetVariantProductList(
  params: VariantProductListParams,
  options?: UseQueryOptions<DTO.VariantProductListResponse>
) {
  return useQuery<DTO.VariantProductListResponse>({
    queryKey: ['getVariantProductList', params],
    queryFn: () => api.getVariantProductList(params),
    placeholderData: (prev) => prev,
    ...options,
  });
}

export const useCreateVariantProductMasterData = () => {
  return useMutation({
    mutationFn: (payload: DTO.VariantProductPayload) =>
      api.createVariantProductMasterData(payload),
  });
};

export const useUpdateVariantProductMasterData = () =>
  useMutation({
    mutationFn: (params: { id: number; variant_attribute_name: string }) => api.updateVariantProductMasterData(params),
  });
