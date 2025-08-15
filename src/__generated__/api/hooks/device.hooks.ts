// Device domain React Query hooks

import { UseInfiniteQueryOptions, UseMutationOptions, UseQueryOptions, useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import * as api from '../client';
import * as DTO from '../dto';

/**
 * Get list of devices
 */
export function useGetDeviceList(
    params: DTO.DeviceListRequest,
    options?: UseQueryOptions<DTO.DeviceListResponse, Error>
) {
  return useQuery({
    queryKey: ['deviceList', params.page, params.per_page],
    queryFn: () => api.getDeviceList(params),
    ...options,
  });
}

/**
 * Get list of devices with infinite scroll
 */
export function useGetDeviceListInfinite(
  params: Omit<DTO.DeviceListRequest, 'page'>,
  options?: UseInfiniteQueryOptions<DTO.DeviceListResponse, Error, DTO.DeviceListResponse, readonly unknown[], number>
) {
  return useInfiniteQuery({
    queryKey: ['deviceListInfinite', params.per_page],
    queryFn: ({ pageParam = 1 }) => api.getDeviceList({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination && lastPage.pagination.current_page < lastPage.pagination.last_page) {
        return lastPage.pagination.current_page + 1;
      }
      return undefined;
    },
    ...options,
  });
}

/**
 * Get device information by ID
 */
export function useGetDeviceInfo(
  params: { id: number },
  options?: UseQueryOptions<DTO.DeviceResponse, Error>
) {
  return useQuery({
    queryKey: ['deviceInfo', params.id],
    queryFn: () => api.getDeviceInfo(params),
    ...options,
  });
}

/**
 * Update device information
 */
export function useUpdateDevice(
  options?: UseMutationOptions<
    DTO.DeviceResponse,
    Error,
    {
      id: number;
      body: Partial<{
        name: string;
        model: string;
        serial_number: string;
        code: string;
      }>;
    }
  >
) {
  return useMutation({
    mutationFn: (params) => api.updateDevice(params),
    ...options,
  });
}


/**
 * Get list of devices
 */
export function useUnlinkDevice(
  options?: UseMutationOptions<DTO.DeviceResponse, Error, { id: number }>
) {
  return useMutation({
    mutationFn: (params) => api.unlinkDevice({ id: params.id }),
    ...options,
  });
}