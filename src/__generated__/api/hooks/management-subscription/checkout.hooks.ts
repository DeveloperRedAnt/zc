// checkout.hooks.ts
import { 
  UseMutationOptions, 
  useMutation,
  useQueryClient 
} from '@tanstack/react-query';
import * as api from '../../client/management-subscription/checkout.client';
import * as DTO from '../../dto';

export function usePostCheckout(
  options?: Omit<UseMutationOptions<DTO.ApiCheckoutResponse, Error, DTO.CheckoutPayloadSchema>, 'mutationFn'>
) {
  const queryClient = useQueryClient();
  
  return useMutation<DTO.ApiCheckoutResponse, Error, DTO.CheckoutPayloadSchema>({
    mutationFn: (params: DTO.CheckoutPayloadSchema) => api.postCheckout(params),
    onSuccess: () => {
      // Invalidate relevant queries after successful checkout
      queryClient.invalidateQueries({ queryKey: ['getDataPackage'] });
      queryClient.invalidateQueries({ queryKey: ['getAddOnConfirmation'] });
    },
    ...options,
  });
}