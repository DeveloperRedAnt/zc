import { 
    UseQueryOptions, 
    useQuery 
} from '@tanstack/react-query';
import * as api from '../../client/management-subscription/add-on-confirmation.client';
import * as DTO from '../../dto';

export function useGetAddOnConfirmation(
  params: {
    body: DTO.GetAddOnConfirmationPayloadSchema;
  },
  options?: Omit<UseQueryOptions<DTO.ApiAddOnConfirmationResponse, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<DTO.ApiAddOnConfirmationResponse, Error>({
    queryKey: ['getAddOnConfirmation', params.body],
    queryFn: () => api.getAddOnConfirmation(params.body),
    ...options,
  });
}