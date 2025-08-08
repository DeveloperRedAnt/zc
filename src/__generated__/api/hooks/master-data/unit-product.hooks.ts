import { UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query';
import * as api from '../../client';
import * as DTO from '../../dto/master-data/unit-product.dto';

export type UnitProductListParams = {
  page?: number;
  per_page?: number;
};

export function useGetUnitProductList(
  params: UnitProductListParams,
  options?: UseQueryOptions<DTO.UnitProductListResponse>
) {
  return useQuery<DTO.UnitProductListResponse>({
    queryKey: ['getUnitProductList', params],
    queryFn: () => api.getUnitProductList(params),
    placeholderData: (prev) => prev,
    ...options,
  });
}

export const useCreateUnitProductMasterData = () => {
  return useMutation({
    mutationFn: (payload: DTO.UnitProductPayload) =>
      api.createUnitProductMasterData(payload),
  });
};

export const useUpdateUnitProductMasterData = () =>
  useMutation({
    mutationFn: (params: { id: number; unit_name: string }) => api.updateUnitProductMasterData(params),
  });
