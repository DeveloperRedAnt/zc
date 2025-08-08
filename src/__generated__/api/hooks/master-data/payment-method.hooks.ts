import { UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as api from '../../client/master-data/payment-method.client';
import * as DTO from '../../dto';

export function useGetPaymentMethod(
  params: {
    body: DTO.GetPaymentPayloadSchema;
  },
  options?: UseQueryOptions<DTO.ApiResponsePaymentMethod>
) {
  return useQuery<DTO.ApiResponsePaymentMethod, Error>({
    queryKey: ['listPaymentMethod', params.body],
    queryFn: () => api.listPaymentMethod(params.body),
    ...options,
  });
}

export function useUpdatePaymentMethod() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      storeId, 
      payments, 
      image 
    }: {
      storeId: string;
      payments: Array<{id: number, active: boolean}>;
      image?: File;
    }) => api.updatePaymentMethod(storeId, payments, image),
    onSuccess: () => {
      // Invalidate and refetch payment method queries
      queryClient.invalidateQueries({ 
        queryKey: ['listPaymentMethod'] 
      });
    },
  });
}