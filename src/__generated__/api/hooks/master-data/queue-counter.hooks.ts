import { UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query';
import * as api from '../../client';
import * as DTO from '../../dto/master-data/queue-counter.dto';

export type QueueCounterListParams = {
  page?: number;
  per_page?: number;
};

export function useGetQueueCounterList(
  params: QueueCounterListParams,
  options?: UseQueryOptions<DTO.QueueCounterListResponse>
) {
  return useQuery<DTO.QueueCounterListResponse>({
    queryKey: ['getQueueCounterList', params],
    queryFn: () => api.getQueueCounterList(params),
    placeholderData: (prev) => prev,
    ...options,
  });
}

export const useCreateQueueCounterMasterData = () => {
  return useMutation({
    mutationFn: (payload: DTO.QueueCounterPayload) =>
      api.createQueueCounterMasterData(payload),
  });
};

export const useUpdateQueueCounterMasterData = () =>
  useMutation({
    mutationFn: (params: { id: number } & DTO.QueueCounterPayload) => api.updateQueueCounterMasterData(params),
  });
