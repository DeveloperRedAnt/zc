import { UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query';
import * as api from '../../client';
import * as DTO from '../../dto/master-data/position.dto';

export type PositionListParams = {
  page?: number;
  per_page?: number;
};

export function useGetPositionList(
  params: PositionListParams,
  options?: UseQueryOptions<DTO.PositionListResponse>
) {
  return useQuery<DTO.PositionListResponse>({
    queryKey: ['getPositionList', params],
    queryFn: () => api.getPositionList(params),
    placeholderData: (prev) => prev,
    ...options,
  });
}

export const useCreatePositionMasterData = () => {
  return useMutation({
    mutationFn: (payload: DTO.PositionPayload) =>
      api.createPositionMasterData(payload),
  });
};

export const useUpdatePositionMasterData = () =>
  useMutation({
    mutationFn: (params: { id: number; name: string }) => api.updatePositionMasterData(params),
  });
