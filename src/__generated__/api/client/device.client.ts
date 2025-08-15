import { getDataFromApi } from '../../../utils/url';
import * as DTO from '../dto';
import { ValidationError, apiClientWithHeaders } from './base.client';
/**
 * Get list of devices
 */
export const getDeviceList = async (params: DTO.DeviceListRequest): Promise<DTO.DeviceListResponse> => getDataFromApi<typeof params, DTO.DeviceListResponse>({
  type: 'get',
  url: '/api/devices',
  injectHeaders: ['x-device-id', 'x-organization-id'],
  params,
  withPagination: true,
  transformer: (data: Record<string, unknown>) => data as unknown as DTO.DeviceListResponse
});

/**
 * Get device information by ID
 */
export const getDeviceInfo = async (params: { id: number }) => {
  try {
    const url = `/api/device/${params.id}`;
    const response = await apiClientWithHeaders.get(url);
    return response.data as DTO.DeviceResponse;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw error;
  }
};

/**
 * Update device information
 */
export const updateDevice = async (params: {
  id: number;
  body: Partial<{
    name: string;
    model: string;
    serial_number: string;
    code: string;
  }>;
}) => {
  try {
    const url = `/api/device/${params.id}`;
    const response = await apiClientWithHeaders.put(url, params.body);
    return response.data as DTO.DeviceResponse;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw error;
  }
};

/**
 * Update device information
 */
export const unlinkDevice = async (params: {
  id: number;
}) => {
  try {
    const url = `/api/devices/unlink/${params.id}`;
    const response = await apiClientWithHeaders.put(url);
    return response.data as DTO.DeviceResponse;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw error;
  }
};