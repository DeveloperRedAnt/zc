// Device domain React Query hooks

import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query';
import * as api from '../client';
import * as DTO from '../dto';

/**
 * Get list of devices
 */
export function useGetDeviceList(
  options?: UseQueryOptions<DTO.DeviceListResponse, Error>
) {
  return useQuery({
    queryKey: ['deviceList'],
    queryFn: () => api.getDeviceList(),
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