import { UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as api from '../../client/master-data/tax-master.client';
import * as DTO from '../../dto';

export function useGetTaxMaster(
  params: {
    body: DTO.GetTaxMasterPayloadSchema;
  },
  options?: UseQueryOptions<DTO.ApiTaxMasterResponse>
) {
  return useQuery<DTO.ApiTaxMasterResponse, Error>({
    queryKey: ['listTaxMaster', params.body],
    queryFn: () => api.listTaxMaster(params.body),
    ...options,
  });
}

export function useUpdateTaxMaster() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      storeId, 
      payload
    }: {
      storeId: string;
      payload: DTO.UpdateTaxMasterPayload;
    }) => api.updateTaxMaster(storeId, payload),
    onSuccess: () => {
      // Invalidate and refetch tax master queries
      queryClient.invalidateQueries({ 
        queryKey: ['listTaxMaster'] 
      });
    },
  });
}