import { UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query';
import * as api from '../../client';
import * as DTO from '../../dto/master-data/tags-product.dto';

export type TagsProductListParams = {
  page?: number;
  per_page?: number;
};

export function useGetTagsProductList(
  params: TagsProductListParams,
  options?: UseQueryOptions<DTO.TagsProductListResponse>
) {
  return useQuery<DTO.TagsProductListResponse>({
    queryKey: ['getTagsProductList', params],
    queryFn: () => api.getTagsProductList(params),
    placeholderData: (prev) => prev,
    ...options,
  });
}

export const useCreateTagsProductMasterData = () => {
  return useMutation({
    mutationFn: (payload: DTO.TagsProductPayload) =>
      api.createTagsProductMasterData(payload),
  });
};

export const useUpdateTagsProductMasterData = () =>
  useMutation({
    mutationFn: (params: { id: number; name: string }) => api.updateTagsProductMasterData(params),
  });
