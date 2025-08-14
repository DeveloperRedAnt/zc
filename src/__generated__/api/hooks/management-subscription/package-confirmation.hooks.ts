import { 
    UseQueryOptions, 
    // useMutation, 
    useQuery, 
    // useQueryClient 
} from '@tanstack/react-query';
import * as api from '../../client/management-subscription/package-confirmation.client';
import * as DTO from '../../dto';

// export function useGetManagementSubscription(
//   params: {
//     body: DTO.GetSubscriptionPayloadSchema;
//   },
//   options?: UseQueryOptions<DTO.ApiSubscriptionResponse>
// ) {
//   return useQuery<DTO.ApiSubscriptionResponse, Error>({
//     queryKey: ['getDataPackage', params.body],
//     queryFn: () => api.getDataPackage(params.body),
//     ...options,
//   });
// }

// export function useGetManagementSubscription(
//   params: {
//     body: DTO.GetSubscriptionPayloadSchema;
//   },
//   options?: UseQueryOptions<DTO.ApiSubscriptionResponse, Error, DTO.ApiSubscriptionResponse, [string, DTO.GetSubscriptionPayloadSchema]>
// ) {
//   return useQuery<DTO.ApiSubscriptionResponse, Error, DTO.ApiSubscriptionResponse, [string, DTO.GetSubscriptionPayloadSchema]>({
//     queryKey: ['getDataPackage', params.body],
//     queryFn: () => api.getDataPackage(params.body),
//     ...options,
//   });
// }


export function useGetManagementSubscription(
  params: {
    body: DTO.GetSubscriptionPayloadSchema;
  },
  options?: Omit<UseQueryOptions<DTO.ApiSubscriptionResponse, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<DTO.ApiSubscriptionResponse, Error>({
    queryKey: ['getDataPackage', params.body],
    queryFn: () => api.getDataPackage(params.body),
    ...options,
  });
}