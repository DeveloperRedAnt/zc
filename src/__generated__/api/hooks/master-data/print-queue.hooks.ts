import { UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as api from '../../client/master-data/print-queue.client';
import * as DTO from '../../dto';

export function useGetQueueTickets(
  params: {
    body: DTO.GetQueueTicketsPayloadSchema;
  },
  options?: UseQueryOptions<DTO.ApiQueueTicketsResponse>
) {
  return useQuery<DTO.ApiQueueTicketsResponse, Error>({
    queryKey: ['listQueueTickets', params.body],
    queryFn: () => api.listQueueTickets(params.body),
    ...options,
  });
}

export function useUpdateQueueTicket() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      storeId, 
      payload
    }: {
      storeId: string;
      payload: DTO.UpdateQueueTicketPayload;
    }) => api.updateQueueTicket(storeId, payload),
    onSuccess: () => {
      // Invalidate and refetch queue ticket queries
      queryClient.invalidateQueries({ 
        queryKey: ['listQueueTickets'] 
      });
    },
  });
}