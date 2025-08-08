import { UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as api from '../../client/master-data/service-charge.client';
import * as DTO from '../../dto';

export function useGetServiceCharge(
  params: {
    body: DTO.GetServiceChargePayloadSchema;
  },
  options?: UseQueryOptions<DTO.ApiServiceChargeResponse>
) {
  return useQuery<DTO.ApiServiceChargeResponse, Error>({
    queryKey: ['listServiceCharge', params.body],
    queryFn: () => api.listServiceCharge(params.body),
    ...options,
  });
}

export function useUpdateServiceCharge() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      storeId, 
      payload
    }: {
      storeId: string;
      payload: DTO.UpdateServiceChargePayload;
    }) => api.updateServiceCharge(storeId, payload),
    onSuccess: () => {
      // Invalidate and refetch service charge queries
      queryClient.invalidateQueries({ 
        queryKey: ['listServiceCharge'] 
      });
    },
  });
}